import { Inject, Injectable, Optional, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
// import { MODAL_SERVICE, ModalService } from '../ModalService.injector';
import { MESSAGE_SERVICE, MessageService } from '../MessageService.injector';
import { ENVIRONMENT } from '../environment';
import { NavController,ToastController  } from '@ionic/angular';

export interface IValidationErrorInfo {
  message: string;
  members: string[];
}

export interface IErrorInfo {
  code: number;
  message: string;
  details: string;
  error:string,
  error_description:string;
  validationErrors: IValidationErrorInfo[];
}

export interface IAjaxResponse {
  success: boolean;
  result?: any;
  targetUrl?: string;
  error?: IErrorInfo;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

const loginUrl = `/login`;

@Injectable({
  providedIn: 'root'
})
export class AbpHttpConfiguration {
  constructor(@Optional() @Inject(MESSAGE_SERVICE) private messageService: MessageService, private injector: Injector,private nav:NavController,public toastController: ToastController) { }

  defaultError = {
    message: 'An error has occurred!',
    details: 'Error details were not sent by server.',
  } as IErrorInfo;

  defaultError401 = {
    message: 'You are not authenticated!',
    details: 'You should be authenticated (sign in) in order to perform this operation.',
  } as IErrorInfo;

  defaultError403 = {
    message: 'You are not authorized!',
    details: 'You are not allowed to perform this operation.',
  } as IErrorInfo;

  defaultError404 = {
    message: 'Resource not found!',
    details: 'The resource requested could not be found on the server.',
  } as IErrorInfo;

  logError(error: IErrorInfo): void {
    console.error(error);
  }
  async presentToast(msg) {
    if(msg){
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }
  }
  showError(error: IErrorInfo): any {
    // return;
    // alert(error.message);
    // const message = {
    //   nzTitle: error.message,
    //   nzContent: error.details,
    // };
     this.presentToast(error.error_description || error.error)
    // return this.messageService.error(error.details || error.message, duration);
    console.log(error.details , error.message)
  }

  handleTargetUrl(targetUrl: string): void {
    setTimeout(() => window.location.href = targetUrl);
    // setTimeout(() => this.nav.navigateRoot(targetUrl));
  }

  handleUnAuthorizedRequest(messagePromise: any, targetUrl?: string) {
    console.log('targetUrl' + targetUrl);
    localStorage.removeItem('_token');
    this.handleTargetUrl(targetUrl);
  }

  handleNonAbpErrorResponse(response: HttpResponse<any>) {
    const self = this;
    const body = response.body;
    this.presentToast(response.status)
    switch (response.status) {
      case 400:
        self.showError(body);
        break;
      case 401:
        self.handleUnAuthorizedRequest(self.showError(self.defaultError401), loginUrl);
        break;
      case 403:
        self.showError(self.defaultError403);
        break;
      case 404:
        self.showError(self.defaultError404);
        break;
      default:
        
        self.showError(body);
        break;
    }
  }

  handleAbpResponse(response: HttpResponse<any>, ajaxResponse: IAjaxResponse): HttpResponse<any> {
    let newResponse: HttpResponse<any>;
    if (ajaxResponse.success) {
      if (ajaxResponse.targetUrl) {
        this.handleTargetUrl(ajaxResponse.targetUrl);
      }

      newResponse = response.clone({
        body: ajaxResponse,
      });
    } else {
      if (!ajaxResponse.error) {
        ajaxResponse.error = this.defaultError;
      }

      const targetUrl = ajaxResponse.targetUrl;

      if (response.status === 401) {
        this.handleUnAuthorizedRequest(null, targetUrl || loginUrl);
      }
    }

    return newResponse;
  }

  getAbpAjaxResponseOrNull(response: HttpResponse<any>): IAjaxResponse | null {
    if (!response || !response.headers) {
      return null;
    }
    const contentType = response.headers.get('Content-Type');
    if (!contentType) {
      console.warn('Content-Type is not sent!');
      return null;
    }

    if (contentType.indexOf('application/json') < 0) {
      console.warn('Content-Type is not application/json: ' + contentType);
      return null;
    }

    const responseObj = JSON.parse(JSON.stringify(response.body));
    if (!responseObj.__abp) {
      return null;
    }

    return responseObj as IAjaxResponse;
  }

  handleResponse(response: HttpResponse<any>): HttpResponse<any> {
    const ajaxResponse = this.getAbpAjaxResponseOrNull(response);
    if (ajaxResponse == null) {
      return response;
    }

    return this.handleAbpResponse(response, ajaxResponse);
  }
}

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  protected configuration: AbpHttpConfiguration;

  constructor(
    configuration: AbpHttpConfiguration,
    @Inject(ENVIRONMENT) private environment,
  ) {
    this.configuration = configuration;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiBaseUrl = this.environment.SERVER_URL;
    if (request.url.startsWith(apiBaseUrl)) {

      const interceptObservable = new Subject<HttpEvent<any>>();
      const modifiedRequest = this.normalizeRequestHeaders(request);

      next.handle(modifiedRequest).subscribe(
        (event: HttpEvent<any>) => {
          this.handleSuccessResponse(event, interceptObservable);
        },
        (error: any) => {
          return this.handleErrorResponse(error, interceptObservable);
        },
      );

      return interceptObservable;
    } else {
      return next.handle(request);
    }
  }

  protected normalizeRequestHeaders(request: HttpRequest<any>): HttpRequest<any> {
    let modifiedHeaders = new HttpHeaders();
    modifiedHeaders = request.headers
      .set('Pragma', 'no-cache')
      .set('Cache-Control', 'no-cache');

    modifiedHeaders = this.addXRequestedWithHeader(modifiedHeaders);

    return request.clone({
      headers: modifiedHeaders,
    });
  }

  /**
   * 添加 X-Requested-With 到 Header 明确为 ajax 方式请求
   */
  protected addXRequestedWithHeader(headers: HttpHeaders): HttpHeaders {
    if (headers) {
      headers = headers.set('X-Requested-With', 'XMLHttpRequest');
    }

    return headers;
  }

  protected handleSuccessResponse(event: HttpEvent<any>, interceptObservable: Subject<HttpEvent<any>>): void {
    const self = this;

    if (event instanceof HttpResponse) {
      const responseBody = event.body;

      const modifiedResponse = self.configuration.handleResponse(
        event.clone({
          body: responseBody,
        }),
      );

      if (!('success' in modifiedResponse.body) || modifiedResponse.body.success) {
        let innerRes;
        if (modifiedResponse.body.__abp) {
          innerRes = modifiedResponse.clone({
            body: modifiedResponse.body.result,
          });
        } else {
          innerRes = modifiedResponse.clone({
            body: modifiedResponse.body,
          });
        }

        interceptObservable.next(innerRes);
        interceptObservable.complete();
      } else {
        this.configuration.showError(modifiedResponse.body.error);
        interceptObservable.error(modifiedResponse);
      }
    } else {
      interceptObservable.next(event);
    }
  }

  protected handleErrorResponse(error: any, interceptObservable: Subject<HttpEvent<any>>): Observable<any> {
    const errorObservable = new Subject<any>();
    const errorBody = error.error ? error.error : error;
    const errorResponse = new HttpResponse({
      headers: error.headers,
      status: error.status,
      body: errorBody,
    });

    const ajaxResponse = this.configuration.getAbpAjaxResponseOrNull(errorResponse);

    if (ajaxResponse != null) {
      this.configuration.handleAbpResponse(errorResponse, ajaxResponse);
      this.configuration.showError(ajaxResponse.error);
    } else {
      this.configuration.handleNonAbpErrorResponse(errorResponse);
    }

    errorObservable.complete();

    interceptObservable.error(error);
    interceptObservable.complete();

    return errorObservable;
  }
}
