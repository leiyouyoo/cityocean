import { Injectable, Inject } from '@angular/core';
import { DOCUMENT, PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AppConsts } from 'src/app/common/AppConsts';
import { environment } from '@env/environment';
import { HttpService } from '@cityocean/common-library';
import * as _ from 'lodash';
import { SignalRHelper } from '@shared/helpers/SignalRHelper';
import { SubdomainTenancyNameFinder } from '@shared/helpers/SubdomainTenancyNameFinder';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    private httpClient: HttpClient,
    private http: HttpService,
    @Inject(DOCUMENT) private doc: any,
  ) {

  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise<boolean>((resolve, reject) => {
      // todo use baseUrl
      // tslint:disable-next-line: ban-comma-operator
      const loaded = () => {
        resolve(null);
        this.removeLoading();
      };
      // return this.getUserConfig().then(() => {
      //   loaded();
      // });
      return loaded();
    });
  }

  getUserConfig(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(environment.SERVER_URL + '/platform/Session/GetCurrentUserConfiguration').subscribe(res => {
        let userData = res;
        // 处理用户数据
        _.mergeWith(abp, userData, (a, b) => (b === null ? a : undefined));

        // tslint:disable-next-line: no-string-literal
        abp.clock.provider = this.getCurrentClockProvider(userData['clock']['provider']);

        abp.event.trigger('abp.dynamicScriptsInitialized');

        this.getApplicationConfig(() => {
          // 用户登录之后开始连接 SignalR
          // if (abp.session.user) {
          //   SignalRHelper.initSignalR(() => {
          //     abp.signalr.connect();
          //   });
          // }
        });
        resolve(res);
        return res;
      }, err => {
        resolve(null);
        console.error(err);
      });
    });

  }

  /**
   * 获取当前时钟提供器
   *
   * @private
   * @static
   * @param currentProviderName
   * @returns
   */
  private getCurrentClockProvider(currentProviderName: string): abp.timing.IClockProvider {
    if (currentProviderName === 'unspecifiedClockProvider') {
      return abp.timing.unspecifiedClockProvider;
    }

    if (currentProviderName === 'utcClockProvider') {
      return abp.timing.utcClockProvider;
    }

    return abp.timing.localClockProvider;
  }

  private removeLoading() {
    const el = this.doc.querySelector('#j-preloader');
    if (el) {
      el.remove();
    }
  }

  /**
   * 从当前配置环境（assets/appconfig.json）中获取应用的默认配置
   *
   * @private
   * @static
   * @param {string} appRootUrl
   * @param {() => void} callback
   * @memberof AppPreBootstrap
   */
  private getApplicationConfig(callback: () => void) {
    const subdomainTenancyNameFinder = new SubdomainTenancyNameFinder();
    const tenancyName = subdomainTenancyNameFinder.getCurrentTenancyNameOrNull(environment.appBaseUrl);

    AppConsts.remoteServiceBaseUrlFormat = environment.SERVER_URL;

    if (tenancyName == null) {
      AppConsts.appBaseUrl = environment.appBaseUrl.replace(AppConsts.tenancyNamePlaceHolderInUrl + '.', '');
      AppConsts.remoteServiceBaseUrl = environment.SERVER_URL.replace(AppConsts.tenancyNamePlaceHolderInUrl + '.', '');
    } else {
      AppConsts.appBaseUrl = environment.appBaseUrl.replace(AppConsts.tenancyNamePlaceHolderInUrl, tenancyName);
      AppConsts.remoteServiceBaseUrl = environment.SERVER_URL.replace(
        AppConsts.tenancyNamePlaceHolderInUrl,
        tenancyName,
      );
    }

    callback();
  }

}
