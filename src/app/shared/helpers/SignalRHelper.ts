import { UtilsService } from '@abp/utils/utils.service';
import { AppConsts } from 'src/app/common/AppConsts';
import { environment } from '@env/environment';

export class SignalRHelper {
  /**
   * 初始化 SignalR
   *
   * @static
   * @param {() => void} callback
   * @memberof SignalRHelper
   */
  static initSignalR(callback: () => void): void {
    let encryptedAuthToken;
    try {
      encryptedAuthToken = JSON.parse(localStorage.getItem('_token')).token
    } catch (e) {
      console.error('Cannot get token for SignalR')
    }
    abp.signalr = {
      autoConnect: false, // _zone.runOutsideAngular in ChatSignalrService
      // autoReconnect: true,
      connect: undefined,
      hubs: undefined,
      qs: AppConsts.authorization.encrptedAuthTokenName + '=' + encodeURIComponent(encryptedAuthToken),
      // remoteServiceBaseUrl: AppConsts.remoteServiceBaseUrl, //TODO:
      remoteServiceBaseUrl: environment.SignalR_Url,
      startConnection: undefined,
      url: '/signalr',
    };

    let script = document.createElement('script');
    script.onload = () => {
      callback();
    };

    script.src = AppConsts.appBaseUrl + '/assets/abp/abp.signalr-client.js';
    document.head.appendChild(script);
  }
}
