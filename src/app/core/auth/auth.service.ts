import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '@cityocean/common-library';
import { DA_SERVICE_TOKEN, DelonAuthConfig, ITokenService } from '@delon/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly userStorageKey = 'CO_USER_INFO';
  readonly expiredStorageKey = 'token_expired_time';
  readonly loginUrl = 'sso/connect/token';
  refreshTokenTimer;
  headers: HttpHeaders;

  constructor(public httpService: HttpService,
              public http: HttpClient,
              @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
              @Inject(DelonAuthConfig) private logUrl: string,
  ) {
    this.startRefreshTokenTimer();
  }

  // 登录
  login(userName: string, passWord: string, tenantId?: number, rememberMe = false) {
    return new Promise((deferred, reject) => {
      let url = this.loginUrl;
      let obj = {
        username: userName,
        password: passWord,
        scope: 'PlatformApi offline_access ids4-api',
        client_id: 'cityOcean',
        client_secret: '282F4E3E-AD56-4FE1-BAF3-FE99BBC11AD2',
        grant_type: 'password',
      };

      this.headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Abp.TenantId': `${tenantId}`,
      });
      this.changeTenant(tenantId);
      this.httpService.postForm(url, obj, {},this.headers).subscribe(
        (res: any) => {
          deferred(res);
          // 存储token
          this.saveToken(res, rememberMe);

          // 存储用户信息
          this.saveUser({ username: userName, password: passWord }, rememberMe);

          // 发出用户已登录事件通知
          abp.event.trigger('abp.userLogon');
        },
        error => {
          reject(error);
          console.log(error);
        },
      );
    });
  }

  startRefreshTokenTimer() {
    const expiredTime = +localStorage.getItem(this.expiredStorageKey);
    if (!expiredTime) { return; }
    const delay = expiredTime - Date.now() - 20e3;
    if (delay <= 0) { return; }

    this.refreshTokenTimer =
      setTimeout(() => this.refreshToken(), delay);
  }

  // 刷新令牌
  refreshToken(rememberMe = false) {
    let refresh_token = localStorage.getItem('refresh_token');
    let url = this.loginUrl;
    let obj = {
      refresh_token,
      grant_type: 'refresh_token',
      client_id: 'cityOcean',
      client_secret: '282F4E3E-AD56-4FE1-BAF3-FE99BBC11AD2',
    };
    this.httpService.postForm(url, obj).subscribe((res: any) => {
      this.saveToken(res, rememberMe);
    });
  }

  // 获取用户方法
  // 获取用户信息
  getUserList(
    Filter: string,
    Permission: string,
    Role: number,
    OnlyLockedUsers: boolean,
    Sorting: string,
    MaxResultCount: number,
    SkipCount: number,
  ) {
    return new Promise(deferred => {
      let url = '/sso/User/GetUsers';
      // let params = new URLSearchParams();
      let params = {
        Role,
        Filter,
        Permission,
        OnlyLockedUsers,
        Sorting,
        MaxResultCount,
        SkipCount,
      };

      this.httpService.get(url, params).subscribe((res: any) => {
        deferred(res);
      });
    });
  }

  /**
   * 变更租户
   *
   */
  private changeTenant(tenantId?: number) {
    this.headers.append('Abp.TenantId', `${tenantId}`);
    this.httpService.setTenantId(`${tenantId}`);

    // 存储租户Id 到 cookie
    abp.multiTenancy.setTenantIdCookie(tenantId);
  }

  /**
   * 令牌存储
   *
   * @private
   * @param res
   * @param [rememberMe=false]
   */
  private saveToken(res: any, rememberMe = false) {
    if (!res.access_token) {
      return;
    }
    this.tokenService.set({ token: res.access_token });
    localStorage.setItem('token', res.access_token);
    localStorage.setItem('refresh_token', res.refresh_token);
    if (typeof res.expires_in === 'number') {
      localStorage.setItem('token_expired_time', `${Date.now() + res.expires_in * 1e3}`);
    }

    // 发出新令牌已存储事件通知
    abp.event.trigger('abp.newTokenSaved', res, rememberMe);
    const tenantId = abp.multiTenancy.getTenantIdCookie();
    this.httpService.appendValue('Abp.TenantId', `${tenantId}`);

  }

  private saveUser(data: { username: string, password: string }, isSave = false) {
    if (!isSave) {
      return localStorage.setItem(this.userStorageKey, 'null');
    }

    let dataStr = JSON.stringify(data);
    dataStr = window.btoa ? window.btoa(dataStr) : dataStr;
    localStorage.setItem(this.userStorageKey, dataStr);
  }

  getSavedUser(): { username: string, password: string } | null {
    let dataStr = localStorage.getItem(this.userStorageKey);
    dataStr = dataStr && window.atob ? window.atob(dataStr) : dataStr;
    return JSON.parse(dataStr);
  }
}
