import { IAjaxResponse, IErrorInfo } from '../pages/core/http/response-interceptor.service';

export class AbpResponse implements IAjaxResponse {
  success: boolean;

  result?: any;

  targetUrl?: string;

  error?: IErrorInfo;

  unAuthorizedRequest: boolean;

  __abp: boolean;
}
