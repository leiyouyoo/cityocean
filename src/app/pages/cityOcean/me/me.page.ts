import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { LocalStorage } from '@shared/localstorage';
import { Router } from '@angular/router';
import { Helper } from '@shared/helper';
import { CityOceanService } from '../city-ocean.service';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NATIVE_FORWARD } from '@core/constants';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage {
  isAndroid = false;
  userLogin = true;
  userMsg: any;
  constructor(
    public nativePageTransitions: NativePageTransitions,
    private navCtrl: NavController,
    public device: Device,
    private router: Router,
    private helper: Helper,
    public cityOceanService: CityOceanService,
  ) {}

  ionViewWillEnter() {
    this.userMsg = abp.session;
    if (this.cityOceanService.getIsLoginWithTourist()) {
      this.userLogin = false;
    }
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

  onWalletPage() {
    if (this.cityOceanService.getIsLoginWithTourist()) {
      this.cityOceanService.chatWithTourist();
      return;
    }
  }

  onInvoicePage() {
    if (this.cityOceanService.getIsLoginWithTourist()) {
      this.cityOceanService.chatWithTourist();
      return;
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

  onSettingPage() {
    this.router.navigate(['/cityOcean/me/setting']);
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
    this.router.navigateByUrl('/login');
  }
}
