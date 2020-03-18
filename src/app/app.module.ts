import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { DelonModule } from './delon.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JPush } from '@jiguang-ionic/jpush/ngx';
import { CommonLibraryModule, ResponseInterceptor } from '@cityocean/common-library';
import { environment } from '@env/environment';
import { MyHammerConfig } from './myHammer.config';
import { Device } from '@ionic-native/device/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Camera } from '@ionic-native/camera/ngx'; // 相机插件
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { AmapLibraryModule } from '@cityocean/amap-library';
// #region Http Interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// #region Startup Service
import { StartupService } from '@core';
import { BaseInfoModule } from '@cityocean/basicdata-library/basicdata.module';
import { RouteGuardService } from './route-guard.service';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { BroadcastService } from '@shared/utils/broadcast.service';

export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}
const IONIC_NATIVE_PROVIDERS = [
  Camera,
  File,
  FileTransfer,
  Device,
  SplashScreen,
  StatusBar,
  AppVersion,
  CallNumber,
  DatePicker,
  FileOpener,
  AndroidPermissions,
  ImagePicker,
  Clipboard,
];
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];
// #endregion

const INTERCEPTOR_PROVIDES = [{ provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }];

/**
 * 导出加载函数
 * @param http HttpClient对象
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BaseInfoModule,
    AmapLibraryModule,
    DelonModule.forRoot(),
    IonicModule.forRoot({
      animated: false,
      rippleEffect: false,

      backButtonText: '', // 配置返回按钮
      backButtonIcon: 'chevron-back-outline', // 配置返回图标
    }),
    AppRoutingModule,
    NgxIonicImageViewerModule,
    IonicStorageModule.forRoot(),
    CommonLibraryModule.forRoot({
      // messageService: NzMessageService,
      environment,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [TranslateModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TranslateService,
    RouteGuardService,
    BroadcastService,
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }, // 重载手势方向
    JPush,
    NativePageTransitions,
    ...INTERCEPTOR_PROVIDES,
    ...APPINIT_PROVIDES,
    ...IONIC_NATIVE_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
