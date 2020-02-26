import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@shared/localstorage';
import { Helper } from '@shared/helper';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-me-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage {
  ThemeType: any;
  constructor(
    private nav: NavController,
    public actionSheetController: ActionSheetController,
    public activeRoute: ActivatedRoute,
    public helper: Helper,
    private statusBar: StatusBar,
  ) {}

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
  onThemeSettingPage() {
    this.nav.navigateForward(['/cityOcean/me/theme']);
  }

  toLogin() {
    this.nav.navigateRoot(['/login']);
  }
}
