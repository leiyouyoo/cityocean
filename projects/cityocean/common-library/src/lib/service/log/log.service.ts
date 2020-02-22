import { Injectable, ErrorHandler } from '@angular/core';
import { environment } from '../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class LogService extends ErrorHandler {
  public serveUrl = 'http://npm.cityocean.com:7768';
  constructor() {
    super();
  }
  public setServeUrl(url: string) {
    this.serveUrl = url;
  }

  public save(massage: string) {
    //http save
    return "log work!";
  }

  //异步打印
  public async asyncLog(p1: any, p2?: any) {
    if (p2) {
      console.log(p1, p2);
    }
    else {
      console.log(p1);
    }
  }
  //捕捉异常
  public handleError(error) {
    if (!environment.production) {
      this.asyncLog(error);
    }
    //去除object / function 对象
    for (let ob in error) {
      console.log(ob, typeof (error[ob]));
      if (typeof (error[ob]) == 'object' || typeof (error[ob]) == 'function') {
        error[ob] = '';
      }
    }
    let str = JSON.stringify(error);
    this.asyncLog(str);
  }
}

