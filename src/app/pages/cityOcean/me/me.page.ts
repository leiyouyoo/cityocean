import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { LocalStorage } from '@shared/localstorage';
import { Router } from '@angular/router';
import { Helper } from '@shared/helper';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
  isAndroid = false;
  userLogin = true;
  constructor(private nav: NavController, public device: Device, private router: Router, private helper: Helper) {}

  ngOnInit() {
    this.initData();
  }

  /**
   * @title 初始化数据
   * @desc 判断用户是否登录以及签到
   */
  initData() {
    if (this.device.platform === 'Android') {
      this.isAndroid = true;
    }
  }

  /**
   * @title 链接跳转
   * @desc 登录链接跳转
   */
  login() {
    this.router.navigate(['/']);
  }

  /**
   * @title 链接跳转
   * @desc 注册链接跳转
   */
  register() {
    this.router.navigate(['/register']);
  }

  /**
   * @title 链接跳转
   * @desc 关于页面跳转
   */
  onAboutPage() {
    this.nav.navigateForward(['/cityOcean/me/about']);
  }

  onLanguagePage() {
    this.nav.navigateForward(['/cityOcean/me/language']);
  }

  /**
   * @title 用户主题
   */
  onThemePage() {
    this.nav.navigateForward(['/cityOcean/me/theme']);
  }

  /**
   * @title 登出
   * @desc 退出Android APP
   */
  onLogout() {
    this.helper.alert(
      '提示',
      '确定退出吗？',
      () => {
        navigator['app'].exitApp();
      },
      () => {},
    );
  }

  /**
   * @title 登出
   * @desc 清除用户信息
   */
  onUserLogout() {
    LocalStorage.localStorage.remove('Name');
    LocalStorage.localStorage.remove('Phone');
    LocalStorage.localStorage.remove('Token');
    LocalStorage.localStorage.remove('UserId');
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  /**
   * @title 用户点击注册
   */
  onSign() {
    this.router.navigateByUrl('/signin');
  }



  toLogin() {
    // this.nav.navigateForward('/login')
    window.location.href = '/login';
  }
}
