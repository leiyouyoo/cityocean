import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Helper } from '@shared/helper';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public RegisterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public helper: Helper,
    public nav: NavController,
    public activeRoute: ActivatedRoute,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.initData();
  }

  /**
   * @title 初始化数据
   * @desc 初始化登录表单内容
   */
  initData() {
    this.RegisterForm = this.formBuilder.group({
      userName: [null, Validators.compose([Validators.required])],
      nickName: [null, Validators.compose([Validators.required])],
      userPhone: [null, Validators.compose([Validators.required])],
      phoneNum: [null, Validators.compose([Validators.required])],
      userPwd: [null, Validators.compose([Validators.required])],
    });
  }

  /**
   * @title 用户点击注册
   * @desc 用户注册接口调用
   */
  onRegister(event) {
    // this.helper.showLoading('账号申请中');
    // this.appService
    //   .post('/api/user/UserRegister', {
    //     UserName: event.userName,
    //     NickName: event.nickName,
    //     UserPhone: event.userPhone,
    //     Password: event.userPwd,
    //   })
    //   .subscribe(
    //     (res: any) => {
    //       this.helper.hideLoading();
    //       if (res.Code == 200) {
    //         this.helper.toast('注册成功!立即登录吧');
    //         this.router.navigate(['/'], {
    //           queryParams: { UserName: event.userName, Password: event.userPwd },
    //         });
    //       }
    //     },
    //     (err) => {
    //       this.helper.hideLoading();
    //     },
    //   );
  }

  sendSms() {
    this.helper.toast(this.translate.instant('Mobile number format is incorrect'));
  }
}
