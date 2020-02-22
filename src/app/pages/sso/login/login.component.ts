import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "@cityocean/common-library";
import { UrlHelper } from "@shared/helpers/UrlHelper";
import { AppConsts } from "src/app/common/AppConsts";
import { environment } from "@env/environment";
import { AuthService } from "@core/auth/auth.service";
import { NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "user-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  errorTip = "";
  savedUser;
  pwshow = false;
  focusPassword = false;
  passwordElement: HTMLElement;
  constructor(
    private fb: FormBuilder,
    public loginService: AuthService,
    private router: Router,
    private nav: NavController,
    public httpService: HttpService,
    private storage: Storage
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ["", [Validators.required]],
      password: [null, [Validators.required]]
    });
    this.savedUser = JSON.parse(localStorage.getItem('autocompletePassword'));
    if(this.savedUser){
      this.validateForm.controls.password.setValue(this.savedUser.password);
      this.validateForm.controls.username.setValue(this.savedUser.username);
    }
    this.passwordElement = document.getElementById("passwordElement");
    this.passwordElement.onfocus = $event => {
      $event.stopPropagation();
      this.focusPassword = true;
    };
  }
  @HostListener("document:click", ["$event.target"])
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
    this.errorTip = "";
    let obj = this.validateForm.value;
    /*
    要改为输入pchkh01@cityocean.com，租户为8
    要改为输入pchkh02@cityocean.com，租户为9
    要改为输入pchkh03@cityocean.com，租户为10
    要改为输入pchkh04@cityocean.com，租户为11*/
    let map: { [key: string]: number } = {
      "pchkh01@cityocean.com": 8,
      "pchkh02@cityocean.com": 9,
      "pchkh03@cityocean.com": 10,
      "pchkh04@cityocean.com": 11
    };
    let tenantId = map[obj.username] ? map[obj.username] : 4;

    this.loginService
      .login(obj.username, obj.password, tenantId, true)
      .then((res: any) => {
        if (res.access_token) {
          localStorage.setItem('autocompletePassword',JSON.stringify(obj));
          let redirectUrl = undefined;
            redirectUrl = "/cityOcean";
          this.nav.navigateRoot(redirectUrl);
        } else {
          this.errorTip = "登录失败!";
        }
      }).catch((e: any) => {
        console.log(e);
        this.errorTip = e.error.error_description;
      });
  }



  /**
   * 重定向到其它页面
   *
   * @private
   * @param [redirectUrl]
   */
  private redirectTo(redirectUrl: string) {
    if (redirectUrl) {
      location.href = redirectUrl;
    } else {
      let initialUrl = UrlHelper.initialUrl;
      if (initialUrl.indexOf("/login") > 0) {
        initialUrl = AppConsts.appBaseUrl;
      }
      location.href = initialUrl;
    }
  }

  onUsernameKeyup(e) {
    if (!(e instanceof KeyboardEvent)) {
      if (
        this.savedUser.username === this.validateForm.value.username &&
        !this.validateForm.value.password
      ) {
        this.validateForm.controls.password.setValue(this.savedUser.password);
      }
    }
  }
  get username() {
    return this.validateForm.get("username");
  }
  get password() {
    return this.validateForm.get("password");
  }
}
