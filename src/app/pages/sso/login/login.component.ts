import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpService } from '@cityocean/common-library';
import { AuthService } from '@core/auth/auth.service';
import { NavController, PopoverController } from '@ionic/angular';
import { Helper } from '@shared/helper';
import { TranslateService } from '@ngx-translate/core';
import { CustomerPhoneComponent } from './customer-phone/customer-phone.component';
import { Router } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  errorTip = '';
  pwshow = false;
  focusPassword = false;
  passwordElement: HTMLElement;
  savedUser: any;
  pleaseEnter: string;
  constructor(
    public helper: Helper,
    private router: Router,
    public device: Device,
    private fb: FormBuilder,
    public loginService: AuthService,
    private nav: NavController,
    public httpService: HttpService,
    private translate: TranslateService,
    private popoverController: PopoverController,
  ) {}

  ngOnInit(): void {
    this.pleaseEnter = this.translate.instant('Please Enter');
    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.passwordElement = document.getElementById('passwordElement');
    this.passwordElement.onfocus = ($event) => {
      $event.stopPropagation();
      this.focusPassword = true;
    };

    const savedUser = JSON.parse(localStorage.getItem('autocompletePassword'));
    if (savedUser) {
      this.validateForm.patchValue({ username: savedUser.username });
    }
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    this.focusPassword = false;
  }
  controlPwshow($event) {
    $event.stopPropagation();
    this.pwshow = !this.pwshow;
  }

  onLogin() {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (!this.validateForm.valid) {
      return;
    }
    this.errorTip = '';
    let obj = this.validateForm.value;
    /*
    要改为输入pchkh01@cityocean.com，租户为8
    要改为输入pchkh02@cityocean.com，租户为9
    要改为输入pchkh03@cityocean.com，租户为10
    要改为输入pchkh04@cityocean.com，租户为11*/
    let map: { [key: string]: number } = {
      'pchkh01@cityocean.com': 8,
      'pchkh02@cityocean.com': 9,
      'pchkh03@cityocean.com': 10,
      'pchkh04@cityocean.com': 11,
    };
    let tenantId = map[obj.username] ? map[obj.username] : 4;
    this.helper.showLoading('Loading...');
    this.loginService
      .login(obj.username, obj.password, tenantId, true)
      .then((res: any) => {
        this.helper.hideLoading();
        // 极光推送绑定
        this.loginService.onSetJpush();
        if (res.access_token) {
          localStorage.setItem('isLoginWithTourist', 'false');
          obj.time = new Date();
          localStorage.setItem('autocompletePassword', JSON.stringify(obj));
          this.router.navigate(['/cityOcean/home'], {
            replaceUrl: true,
          });
        } else {
          this.errorTip = this.translate.instant('Login Error');
        }
      })
      .catch((e: any) => {
        this.helper.hideLoading();
        this.errorTip = this.translate.instant('Login Error');
        if (e.error && e.error.error_description === 'invalid_username_or_password') {
          this.helper.toast('Password or name error');
        }
      });
  }
  loginWithTourist() {
    this.loginService
      .login('anonymous', 'co@123', 4, true)
      .then((res: any) => {
        if (res.access_token) {
          localStorage.setItem('isLoginWithTourist', 'true');
          this.router.navigate(['/cityOcean/home'], {
            replaceUrl: true,
          });
        } else {
          this.errorTip = this.translate.instant('Login Error');
        }
      })
      .catch((e: any) => {
        if (e.error && e.error.error_description == 'invalid_username_or_password') {
          this.helper.toast('Password or name error');
        }
      });
  }

  async handleButtonClick(event) {
    if (this.device.platform !== 'Android') {
      this.router.navigateByUrl('/login/register');
      return;
    }

    const popover = await this.popoverController.create({
      component: CustomerPhoneComponent,
      showBackdrop: false,
      event: event,
      mode: 'ios',
      backdropDismiss: true,
      cssClass: 'billing-popover',
    });
    popover.onDidDismiss().then((event) => {
      console.log(event.data);
    });
    await popover.present();
  }
  onUsernameKeyup(e) {
    if (!(e instanceof KeyboardEvent)) {
      if (this.savedUser.username === this.validateForm.value.username && !this.validateForm.value.password) {
        this.validateForm.controls.password.setValue(this.savedUser.password);
      }
    }
  }
  get username() {
    return this.validateForm.get('username');
  }
  get password() {
    return this.validateForm.get('password');
  }
}
