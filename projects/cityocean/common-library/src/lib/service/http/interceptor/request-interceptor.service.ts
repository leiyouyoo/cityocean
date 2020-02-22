import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (req.url.indexOf('api') >= 0) {

      // 统一加上服务端前缀
      //let url = req.url;
      //if (!url.startsWith('https://') && !url.startsWith('http://')) {
      //  url = environment.SERVER_URL + url;
      //}

      let timestamp: number = Date.parse((new Date().toString()));
      const secureReq = req.clone({
        url: (req.url + '&timestamp=' + timestamp)
      });
      return next.handle(secureReq);
    }
    else {
      return next.handle(req);
    }
  }

}
