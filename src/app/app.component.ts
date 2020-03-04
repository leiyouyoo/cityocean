import { Component } from '@angular/core';
import { Platform, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { JPush } from '@jiguang-ionic/jpush/ngx';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { LocalStorage } from '@shared/localstorage';
import { Helper } from '@shared/helper';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // 默认语言
  private lang: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private alertController: AlertController,
    private router: Router,
    private nav: NavController,
    private helper: Helper,
    private jpush: JPush,
    public translate: TranslateService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      // this.statusBar.overlaysWebView(true);
      this.splashScreen.hide();
      let color = '#3e8eff';
      const theme = LocalStorage.localStorage.get('ThemeType');
      document.body.classList.remove('blue');
      document.body.classList.remove('dark');
      if (theme === '' || theme == null) {
        document.body.classList.toggle('blue', true);
      } else {
        document.body.classList.toggle(theme, true);

        // if (theme === 'dark') {
        //   color = '#000000';
        // }
      }
      // this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString(color);
      this.statusBar.show();
      this.jpush.setDebugMode(true);
      this.jpush.init();

      this.initTranslateConfig();
      this.backButtonEvent();
      this.navEvents();
    });
  }
  /**
   *  国际化
   *
   * @memberof AppComponent
   */
  initTranslateConfig() {
    console.log('initTranslateConfig...');
    // 添加要支持的语言
    this.translate.addLangs(['zh', 'en']);
    // 设置默认语言
    this.lang = LocalStorage.localStorage.get('Language');
    if (this.lang) {
      this.translate.setDefaultLang(this.lang);
    } else {
      this.translate.setDefaultLang('en');
    }

    // 语言切换处理
    this.translate.use(this.lang);
    window.localStorage.setItem('Language', this.lang);
    // if (this.translate.getBrowserLang() != undefined) {
    //   this.translate.use(this.translate.getBrowserLang());
    // } else {
    //   this.translate.use(this.lang)
    // }
  }

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  /**
   *  返回按钮退出app
   *
   * @memberof AppComponent
   */
  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      if (this.router.url.indexOf('home') !== -1 || this.router.url.indexOf('login') !== -1) {
        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
          navigator['app'].exitApp(); // 退出APP
        } else {
          this.helper.toast(this.translate.instant('Try Again Exit'), 3000, 'bottom');
          this.lastTimeBackPress = new Date().getTime(); // 再次按
        }
      }
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: '您要退出APP吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: '退出',
          handler: () => {
            navigator['app'].exitApp();
          },
        },
      ],
    });
    await alert.present();
  }
  private navEvents() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.showHideTabs(e);
    });
  }
  showHideTabs(e) {
    const url = e.urlAfterRedirects.split('/');
    if (!url[3]) {
      this.showTabs();
    } else {
      this.hideTabs();
    }
  }
  showTabs() {
    let tabBar = document.getElementsByClassName('myTabBar');
    for (var i = 0; i < tabBar.length; i++) {
      if (tabBar[i]['style'].display !== 'flex') {
        if (tabBar[i].className.includes('center-tab')) {
          tabBar[i]['style'].display = 'block';
        } else {
          tabBar[i]['style'].display = 'flex';
        }
      }
    }
  }
  hideTabs() {
    let tabBar = document.getElementsByClassName('myTabBar');
    for (var i = 0; i < tabBar.length; i++) {
      if (tabBar[i]['style'].display !== 'none') tabBar[i]['style'].display = 'none';
    }
  }
}
