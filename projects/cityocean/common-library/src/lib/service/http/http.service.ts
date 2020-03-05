import { Inject, Injectable, Optional } from '@angular/core';
import { RequestMethods } from '../../class/RequestMethods';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Environment, ENVIRONMENT } from './environment';
import { MODAL_SERVICE } from './ModalService.injector';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private token = '';
  private tenantId = '';

  public jsonHeaders: HttpHeaders;
  public formHeaders: HttpHeaders;
  public fileHeaders: HttpHeaders;

  private headerFormParams: any = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  };
  private headerJsonParams: any = {
    'Content-Type': 'application/json;charset=UTF-8'
  };

  constructor(
    public http: HttpClient,
    @Inject(ENVIRONMENT) private environment: Environment
  ) {
    if (!this.jsonHeaders) {
      const oldParams = this.getHeaderParams();
      Object.keys(oldParams).forEach(key => {
        this.headerJsonParams[key] = oldParams[key];
        this.headerFormParams[key] = oldParams[key];
      });
      this.jsonHeaders = new HttpHeaders(this.headerJsonParams);
      this.formHeaders = new HttpHeaders(this.headerFormParams);
    }
  }

  setEnvironment(website: Environment) {
    this.environment = website;
  }

  setToken(token: string) {
    this.token = token;
    this.jsonHeaders.append('Authorization', `Bearer ${token}`);
    this.formHeaders.append('Authorization', `Bearer ${token}`);
  }

  setTenantId(tenantId: string) {
    this.tenantId = tenantId;
    this.jsonHeaders.append('Abp.TenantId', `${tenantId}`);
    this.formHeaders.append('Abp.TenantId', `${tenantId}`);
  }

  appendValue(key: string, value: string) {
    this.headerFormParams[key] = value;
    this.headerJsonParams[key] = value;
    this.jsonHeaders = new HttpHeaders(this.headerJsonParams);
    this.formHeaders = new HttpHeaders(this.headerFormParams);
    this.saveHeaderParams(key, value);
  }

  private saveHeaderParams(key: string, value: string) {
    const old = this.getHeaderParams();
    old[key] = value;
    localStorage.setItem('headerParams', JSON.stringify(old));
  }
  private getHeaderParams() {
    const old = localStorage.getItem('headerParams');
    if (old) {
      return JSON.parse(old);
    }
    return {};
  }

  // 发起一个get请求
  // @param url 请求地址
  // @param params 请求参数
  get(url: string, params?: any, header?: any) {
    this.logging(
      url,
      params,
      RequestMethods.GET,
      header ? header : this.jsonHeaders
    ); // 记录日志
    // const timestamp: number = Date.parse(new Date().toString());
    // if (!params) { params = {}; }
    // params.timestamp = timestamp.toString();

    const httpParams = buildHttpParams(params);
    return this.http.get(this.processUrl(url), {
      params: httpParams,
      headers: header ? header : this.jsonHeaders
    });
  }

  // 发起一个post请求
  // @param url 请求地址
  // @param body 请求body
  // @param params 请求参数
  postForm(url: string, body: any, params?: any, header?: any) {
    this.logging(
      url,
      body,
      RequestMethods.POST,
      header ? header : this.formHeaders
    ); // 记录日志
    // const timestamp: number = Date.parse(new Date().toString());
    // if (!params) { params = {}; }
    // params.timestamp = timestamp.toString();

    header = header ? header : this.formHeaders;
    if (
      header &&
      header.get('Content-Type') &&
      header
        .get('Content-Type')
        .toString()
        .indexOf('application/x-www-form-urlencoded') >= 0
    ) {
      if (typeof body === 'object') {
        let bodyStr = '';
        for (const obj in body) {
          bodyStr += `${obj}=${body[obj]}&`;
        }
        body = bodyStr.slice(0, bodyStr.length - 1);
      }
    }

    // TODO：已能构建 FormData 但是提交时候会 400，初步怀疑是 Content-Type 问题
    // const formData = objectToFormData(body);
    // formData.forEach((k, v) => {
    //   console.info(`${k}:${v}`);
    // });

    const httpParams = buildHttpParams(params);
    return this.http.post(this.processUrl(url), body, {
      params: httpParams,
      headers: header
    });
  }

  postJson(url: string, body: any, params?: any, header?: any) {
    this.logging(
      url,
      body,
      RequestMethods.POST,
      header ? header : this.jsonHeaders
    ); // 记录日志
    // const timestamp: number = Date.parse(new Date().toString());
    // if (!params) { params = {}; }
    // params.timestamp = timestamp.toString();

    const httpParams = buildHttpParams(params);
    if (body) {
      body = setJson(body);
    }
    return this.http.post(this.processUrl(url), body, {
      params: httpParams,
      headers: header ? header : this.jsonHeaders
    });
  }
  postTest(url: string, body: any, params?: any, header?: any) {
    this.logging(
      url,
      body,
      RequestMethods.POST,
      header ? header : this.jsonHeaders
    ); // 记录日志
    // const timestamp: number = Date.parse(new Date().toString());
    // if (!params) { params = {}; }
    // params.timestamp = timestamp.toString();

    const httpParams = buildHttpParams(params);
    if (body) {
      body = setJson(body);
    }
    function processUrl(url: string) {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      } else {
        if (!url.startsWith('/')) {
          url = '/' + url;
        }
        return 'http://192.168.1.6:8000' + url;
      }
    }
    return this.http.post(processUrl(url), body, {
      params: httpParams,
      headers: header ? header : this.jsonHeaders
    });
  }

  post(url: string, body: any, params?: any, header?: any) {}

  postboundary(url: string, body: any, params?: any, header?: any) {
    this.logging(
      url,
      body,
      RequestMethods.POST,
      header ? header : this.jsonHeaders
    ); // 记录日志
    // const timestamp: number = Date.parse(new Date().toString());
    // if (!params) { params = {}; }
    // params.timestamp = timestamp.toString();

    const httpParams = buildHttpParams(params);
    return this.http.post(this.processUrl(url), body, {
      params: httpParams,
      headers: header ? header : this.jsonHeaders
    });
  }

  // 发起一个delete请求
  // @param url 请求地址
  // @param params 请求参数
  delete(url: string, params?: any, header?: any) {
    this.logging(
      url,
      params,
      RequestMethods.DELETE,
      header ? header : this.jsonHeaders
    ); // 记录日志
    // const timestamp: number = Date.parse(new Date().toString());
    // if (!params) { params = {}; }
    // params.timestamp = timestamp.toString();

    const httpParams = buildHttpParams(params);
    return this.http.delete(this.processUrl(url), {
      params: httpParams,
      headers: header ? header : this.jsonHeaders
    });
  }

  // 发起一个PUT请求
  // @param url 请求地址
  // @param body 请求body
  // @param params 请求参数
  put(url: string, body: any, params?: any, header?: any) {
    this.logging(
      url,
      params,
      RequestMethods.PUT,
      header ? header : this.jsonHeaders
    ); // 记录日志
    // const timestamp: number = Date.parse(new Date().toString());
    // if (!params) { params = {}; }
    // params.timestamp = timestamp.toString();

    const httpParams = buildHttpParams(params);
    if (body) {
      body = setJson(body);
    }
    return this.http.put(this.processUrl(url), body, {
      params: httpParams,
      headers: header ? header : this.jsonHeaders
    });
  }

  // 发起一个patch请求
  // @param url 请求地址
  // @param body 请求body
  // @param params 请求参数
  patch(url: string, body: any, params?: any) {
    this.logging(url, params, RequestMethods.PUT, this.headerFormParams); // 记录日志
    // const timestamp: number = Date.parse(new Date().toString());
    // params.set('timestamp', timestamp.toString());
    // if (!params) { params = {}; }
    // params.timestamp = timestamp.toString();

    const httpParams = buildHttpParams(params);
    const formData = objectToFormData(body);
    return this.http.patch(this.processUrl(url), formData, {
      params: httpParams,
      headers: undefined
    });
  }

  public async logging(url: string, params: any, method: string, header: any) {}

  private processUrl(url: string) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    } else {
      if (!url.startsWith('/')) {
        url = '/' + url;
      }
      return this.environment.SERVER_URL + url;
    }
  }
}

/**
 * 构建 HttpParams，主要作用：
 * 添加时间戳 timestamp；
 * 转换 undefined 或者 null 为 ''
 */
export function buildHttpParams(params: any) {
  params = params ? params : {};
  const timestamp = Date.parse(new Date().toString());
  params.timestamp = timestamp.toString();

  for (const key of Object.keys(params)) {
    if (params[key] instanceof Date) {
      params[key] = (params[key] as Date).toISOString();
    }
    if (params[key] === null) {
      delete params[key];
    }
  }
  return params;
}

/**
 * JavaScript 对象转成 FormData，支持嵌套对象、数组和文件对象。
 * https://gist.github.com/ghinda/8442a57f22099bdb2e34#gistcomment-2386093
 *
 * @export
 * @param model 待转换对象
 * @param [form=null] formData
 * @param [namespace=''] namespace
 * @returns FormData 实例
 */
export function objectToFormData(
  model: any,
  form: FormData = null,
  namespace = ''
): FormData {
  const formData = form || new FormData();
  for (const propertyName in model) {
    if (!model.hasOwnProperty(propertyName) || !model[propertyName]) {
      continue;
    }

    const formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
    if (model[propertyName] instanceof Date) {
      formData.append(formKey, model[propertyName].toISOString());
    } else if (model[propertyName] instanceof Array) {
      model[propertyName].forEach((element, index) => {
        const tempFormKey = `${formKey}[${index}]`;
        objectToFormData(element, formData, tempFormKey);
      });
    } else if (
      typeof model[propertyName] === 'object' &&
      !(model[propertyName] instanceof File)
    ) {
      objectToFormData(model[propertyName], formData, formKey);
    } else {
      formData.append(formKey, model[propertyName].toString());
    }
  }
  return formData;
}

export function setJson(datas: any) {
  for (let key in datas) {
    if (datas[key] === null || datas[key] === undefined) {
      delete datas[key];
    }
  }
  return datas;
}
