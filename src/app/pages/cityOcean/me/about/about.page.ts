import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@shared/localstorage';
import { Params, ActivatedRoute } from '@angular/router';
import { Helper } from '@shared/helper';
import { AlertController } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Device } from '@ionic-native/device/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { File } from '@ionic-native/file/ngx';
import { ScheduleService } from '@cityocean/basicdata-library/region/service/schedule.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@env/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-me-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  version = '';
  isIos = false;
  constructor(
    // tslint:disable-next-line: deprecation
    private transfer: FileTransfer,
    private appVersion: AppVersion,
    private iab: InAppBrowser,
    public alertController: AlertController,
    private androidPermissions: AndroidPermissions,
    private fileOpener: FileOpener,
    public activeRoute: ActivatedRoute,
    private device: Device,
    public appService: ScheduleService,
    public helper: Helper,
    public file: File,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      const update = params.update;
      if (update) {
        if (this.device.platform === 'Android') {
          this.downloadApp();
        } else if (this.device.platform === 'IOS') {
          this.iab.create('https://apps.apple.com/us/app/cityocean/id1499450194?l=zh&ls=1', '_system');
        }
      }
    });

    this.appVersion.getVersionNumber().then((version: string) => {
      this.version = version;
    });

    if (this.device.platform === 'IOS') {
      this.isIos = true;
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentInit() {
    this.check();
  }

  /**
   * @title 初始化项目数据
   * @desc 获取APP版本信息
   */
  initData() {
    this.helper.showLoading('loading...');
    const token = LocalStorage.localStorage.get('Token');
    const numversion = this.version.replace(/\./g, '');
    this.appService
      .checkUpdate({
        appType: 1,
        version: this.version,
      })
      .subscribe(
        (res: any) => {
          this.helper.hideLoading();
          if (res === true) {
            this.showAlert();
          } else {
            this.helper.toast(this.translate.instant('Already the latest version'));
          }
        },
        (err) => {
          this.helper.hideLoading();
          this.helper.toast(this.translate.instant('Error'));
        },
      );
  }

  async showAlert() {
    // 3.弹窗提示用户是否更新
    const alert = await this.alertController.create({
      header: 'CityOcean',
      message: this.translate.instant('Found a new version, whether to upgrade immediately') + '?',
      buttons: [
        {
          text: this.translate.instant('Cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: this.translate.instant('Ok'),
          handler: () => {
            // 4.下载apk
            this.downloadApp();
          },
        },
      ],
    });
    await alert.present();
  }

  downloadApp() {
    // 4.下载apk
    const targetUrl = environment.appDownloadUrl + '/apps/cityocean.apk';
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(targetUrl, this.file.dataDirectory + 'cityocean.apk').then(
      (entry) => {
        this.fileOpener
          .open(entry.toURL(), 'application/vnd.android.package-archive')
          .then(() => {})
          .catch((e) => {
            alert('Error openening file' + JSON.stringify(e));
          });
      },
      (error) => {
        alert(JSON.stringify(error));
      },
    );

    // 5、获取下载进度
    // tslint:disable-next-line: prefer-const
    let oProgressNum = document.getElementById('progressnum');
    fileTransfer.onProgress((event) => {
      let num = Math.ceil((event.loaded / event.total) * 100); // 转化成1-100的进度
      if (num === 100) {
        oProgressNum.innerHTML = '下载完成';
      } else {
        oProgressNum.innerHTML = '下载进度：' + num + '%';
      }
    });
  }

  /*检查是否有写入权限*/
  check() {
    // 读写权限
    if (this.device.platform === 'Android') {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
        (result) => console.log('Has permission?' + result.hasPermission),
        (err) => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE),
      );
      // tslint:disable-next-line: max-line-length
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]);
    }
  }
}
