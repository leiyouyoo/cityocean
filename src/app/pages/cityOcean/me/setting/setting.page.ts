import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@shared/localstorage';
import { Helper } from '@shared/helper';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { CityOceanService } from '../../city-ocean.service';
import { TranslateService } from '@ngx-translate/core';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-me-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage {
  ThemeType: any;
  version: any;
  constructor(
    private nav: NavController,
    public actionSheetController: ActionSheetController,
    public activeRoute: ActivatedRoute,
    public helper: Helper,
    public translate: TranslateService,
    private statusBar: StatusBar,
    private cityOceanService: CityOceanService,
    public appVersion: AppVersion,
  ) {
    this.appVersion.getVersionNumber().then((version: string) => {
      this.version = version;
    });
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
  onThemeSettingPage() {
    this.nav.navigateForward(['/cityOcean/me/theme']);
  }

  async toLogin() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: this.translate.instant('Log Out'),
          icon: 'log-out',
          handler: () => {
            this.cityOceanService.loginOut();
          },
        },
        {
          text: this.translate.instant('Cancel'),
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
