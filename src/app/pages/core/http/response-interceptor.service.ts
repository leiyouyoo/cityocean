import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';

import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';

import { LogService } from '@abp/log/log.service';
import { UtilsService } from '@abp/utils/utils.service';
import { environment } from '@env/environment';

export interface IValidationErrorInfo {
  message: string;

  members: string[];
}

export interface IErrorInfo {
  code: number;

  message: string;

  details: string;

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

@Injectable()
export class AbpHttpConfiguration {
  constructor(private _logService: LogService) {}

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
    this._logService.error(error);
  }

  showError(error: IErrorInfo): any {
    // alert(error.message);
    let message = {
      nzTitle: error.message,
      nzContent: error.details,
    };
    // return this._messageService.error(message);
  }

  handleTargetUrl(targetUrl: string): void {
    setTimeout(() => {
      if (!targetUrl) {
        location.href = '/';
      } else {
        location.href = targetUrl;
      }
    }, 1000 * 3);
  }

  handleUnAuthorizedRequest(messagePromise: any, targetUrl?: string) {
    const self = this;

    if (messagePromise) {
      messagePromise.done(() => {
        this.handleTargetUrl(targetUrl || '/');
      });
    } else {
      self.handleTargetUrl(targetUrl || '/');
    }
  }

  handleNonAbpErrorResponse(response: HttpResponse<any>) {
    const self = this;
    switch (response.status) {
      case 401:
        self.handleUnAuthorizedRequest(self.showError(self.defaultError401), '/');
        break;
      case 403:
        self.showError(self.defaultError403);
        break;
      case 404:
        self.showError(self.defaultError404);
        break;
      default:
        self.showError(self.defaultError);
        break;
    }
  }

  handleAbpResponse(response: HttpResponse<any>, ajaxResponse: IAjaxResponse): HttpResponse<any> {
    let newResponse: HttpResponse<any>;
    if (ajaxResponse.success) {
      // TODO: newResponse.body 应该返回 ajaxResponse.result，但为了兼容旧的 library 服务，先合并起来
      _.merge(ajaxResponse, ajaxResponse.result);

      newResponse = response.clone({
        body: ajaxResponse,
      });

      if (ajaxResponse.targetUrl) {
        this.handleTargetUrl(ajaxResponse.targetUrl);
      }
    } else {
      if (!ajaxResponse.error) {
        ajaxResponse.error = this.defaultError;
      }

      this.logError(ajaxResponse.error);
      this.showError(ajaxResponse.error);

      let targetUrl = ajaxResponse.targetUrl;

      // TODO: newResponse.body 应该返回 ajaxResponse.result，但为了兼容旧的 library 服务，先合并起来
      _.merge(ajaxResponse, ajaxResponse.result);
      newResponse = response.clone({
        body: ajaxResponse,
      });

      if (response.status === 401) {
        this.handleUnAuthorizedRequest(null, targetUrl);
      }
    }

    return newResponse;
  }

  getAbpAjaxResponseOrNull(response: HttpResponse<any>): IAjaxResponse | null {
    if (!response || !response.headers) {
      return null;
    }
    let contentType = response.headers.get('Content-Type');
    if (!contentType) {
      this._logService.warn('Content-Type is not sent!');
      return null;
    }

    if (contentType.indexOf('application/json') < 0) {
      this._logService.warn('Content-Type is not application/json: ' + contentType);
      return null;
    }

    let responseObj = JSON.parse(JSON.stringify(response.body));
    if (!responseObj.__abp) {
      return null;
    }

    return responseObj as IAjaxResponse;
  }

  handleResponse(response: HttpResponse<any>): HttpResponse<any> {
    let ajaxResponse = this.getAbpAjaxResponseOrNull(response);
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
    private _utilsService: UtilsService,
    private _logService: LogService,
  ) {
    this.configuration = configuration;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiBaseUrl = environment.SERVER_URL;
    if (request.url.startsWith(apiBaseUrl)) {

      //this._logService.debug(request); //TODO remove log

      let interceptObservable = new Subject<HttpEvent<any>>();
      let modifiedRequest = this.normalizeRequestHeaders(request);

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
      .set('Cache-Control', 'no-cache')
      .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');

    modifiedHeaders = this.addXRequestedWithHeader(modifiedHeaders);

    // 添加文化请求头，后台将会依此返回本地化后的响应
    modifiedHeaders = this.addAspNetCoreCultureHeader(modifiedHeaders);
    modifiedHeaders = this.addAcceptLanguageHeader(modifiedHeaders);

    return request.clone({
      headers: modifiedHeaders,
    });
  }

  /**
   * 添加 X-Requested-With 到 Header 明确为 ajax 方式请求
   *
   * @protected
   * @param headers
   * @returns
   */
  protected addXRequestedWithHeader(headers: HttpHeaders): HttpHeaders {
    if (headers) {
      headers = headers.set('X-Requested-With', 'XMLHttpRequest');
    }

    return headers;
  }

  protected addAspNetCoreCultureHeader(headers: HttpHeaders): HttpHeaders {
    let cookieLangValue = this._utilsService.getCookieValue('Abp.Localization.CultureName');
    if (cookieLangValue && headers && !headers.has('.AspNetCore.Culture')) {
      headers = headers.set('.AspNetCore.Culture', cookieLangValue);
    }

    return headers;
  }

  protected addAcceptLanguageHeader(headers: HttpHeaders): HttpHeaders {
    let cookieLangValue = this._utilsService.getCookieValue('Abp.Localization.CultureName');
    if (cookieLangValue && headers && !headers.has('Accept-Language')) {
      headers = headers.set('Accept-Language', cookieLangValue);
    }

    return headers;
  }

  protected handleSuccessResponse(event: HttpEvent<any>, interceptObservable: Subject<HttpEvent<any>>): void {
    let self = this;

    if (event instanceof HttpResponse) {
      const responseBody = event.body;

      let modifiedResponse = self.configuration.handleResponse(
        event.clone({
          body: responseBody,
        }),
      );

      interceptObservable.next(
        modifiedResponse.clone({
          body: modifiedResponse.body,
        }),
      );

      interceptObservable.complete();
    } else {
      interceptObservable.next(event);
    }
  }

  protected handleErrorResponse(error: any, interceptObservable: Subject<HttpEvent<any>>): Observable<any> {
    let errorObservable = new Subject<any>();
    let errorBody = error.error ? error.error : error;
    const errorResponse = new HttpResponse({
      headers: error.headers,
      status: error.status,
      body: errorBody,
    });

    let ajaxResponse = this.configuration.getAbpAjaxResponseOrNull(errorResponse);

    if (ajaxResponse != null) {
      this.configuration.handleAbpResponse(errorResponse, ajaxResponse);
    } else {
      this.configuration.handleNonAbpErrorResponse(errorResponse);
    }

    errorObservable.complete();

    interceptObservable.error(error);
    interceptObservable.complete();

    return errorObservable;
  }
}
