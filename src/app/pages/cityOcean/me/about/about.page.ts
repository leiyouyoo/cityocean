import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@shared/localstorage';
import { Params, ActivatedRoute } from '@angular/router';
import { Helper } from '@shared/helper';
import { AlertController } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Device } from '@ionic-native/device/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-me-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  version = '';
  isIos = false;
  constructor(
    private file: File,
    // tslint:disable-next-line: deprecation
    private transfer: FileTransfer,
    private appVersion: AppVersion,
    public alertController: AlertController,
    private androidPermissions: AndroidPermissions,
    private fileOpener: FileOpener,
    public activeRoute: ActivatedRoute,
    private device: Device,
    public helper: Helper,
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      const update = params.update;
      if (update) {
        this.downloadApp();
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
    const token = LocalStorage.localStorage.get('Token');
    const numversion = this.version.replace(/\./g, '');
    // this.appService.get('xxx', { version: numversion, Token: token }).subscribe((res: any) => {
    //   if (res.Update === true) {
    //     this.showAlert();
    //   } else {
    //     this.helper.toast('已经是最新版本');
    //   }
    // });
  }

  async showAlert() {
    // 3.弹窗提示用户是否更新
    const alert = await this.alertController.create({
      header: 'CityOcean',
      message: '发现新版本,是否立即升级？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: '确认',
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
    const targetUrl = 'https://www.xxxx.cn/app/CITYOCEAN.apk';
    // const fileTransfer: FileTransferObject = this.transfer.create();
    // fileTransfer.download(targetUrl, this.file.dataDirectory + 'CITYOCEAN.apk').then(
    //   (entry) => {
    //     this.fileOpener
    //       .open(entry.toURL(), 'application/vnd.android.package-archive')
    //       .then(() => {})
    //       .catch((e) => {
    //         alert('Error openening file' + JSON.stringify(e));
    //       });
    //   },
    //   (error) => {
    //     alert(JSON.stringify(error));
    //   },
    // );

    // // 5、获取下载进度
    // // tslint:disable-next-line: prefer-const
    // let oProgressNum = document.getElementById('progressnum');
    // fileTransfer.onProgress((event) => {
    //   let num = Math.ceil((event.loaded / event.total) * 100); // 转化成1-100的进度
    //   if (num === 100) {
    //     oProgressNum.innerHTML = '下载完成';
    //   } else {
    //     oProgressNum.innerHTML = '下载进度：' + num + '%';
    //   }
    // });
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
