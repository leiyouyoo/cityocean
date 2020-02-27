import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpService } from '@cityocean/common-library';
import { AuthService } from '@core/auth/auth.service';
import { NavController } from '@ionic/angular';
import { Helper } from '@shared/helper';
import { ScheduleService } from '@cityocean/basicdata-library/region/service/schedule.service';
import { JPush } from '@jiguang-ionic/jpush/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  errorTip = '';
  savedUser;
  pwshow = false;
  focusPassword = false;
  passwordElement: HTMLElement;
  pleaseEnter = this.translate.instant("LoginIn.pleaseEnter")
  constructor(
    private jpush: JPush,
    public helper: Helper,
    private fb: FormBuilder,
    public loginService: AuthService,
    private nav: NavController,
    public scheduleService: ScheduleService,
    public httpService: HttpService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required,Validators.email]],
      password: [null, [Validators.required]],
    });
    this.savedUser = JSON.parse(localStorage.getItem('autocompletePassword'));
    if (this.savedUser) {
      this.validateForm.controls.password.setValue(this.savedUser.password);
      this.validateForm.controls.username.setValue(this.savedUser.username);
    }
    this.passwordElement = document.getElementById('passwordElement');
    this.passwordElement.onfocus = ($event) => {
      $event.stopPropagation();
      this.focusPassword = true;
    };
  }
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    this.focusPassword = false;
  }
  controlPwshow($event) {
    $event.stopPropagation();
    this.pwshow = !this.pwshow;
  }

  login() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (!this.validateForm.valid) return;
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

    this.loginService
      .login(obj.username, obj.password, tenantId, true)
      .then((res: any) => {
        // 极光推送绑定

        this.onSetJpush();
        if (res.access_token) {
          localStorage.setItem('isLoginWithTourist',"false");
          localStorage.setItem('autocompletePassword', JSON.stringify(obj));
          this.nav.navigateRoot('/cityOcean');
        } else {
          this.errorTip = '登录失败!';
        }
      })
      .catch((e: any) => {
        this.helper.toast(e.message);
        //this.errorTip = e.error.error_description;
      });
  }
  loginWithTourist() {
    localStorage.setItem('isLoginWithTourist',"true");
    this.nav.navigateRoot('/cityOcean');
  }
 

  onSetJpush() {
    this.jpush.getRegistrationID().then((res) => {
      this.scheduleService
        .jpush({
          registrationId: res,
        })
        .subscribe((data) => {});
    });
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
