/**
 * 为方便使用 XMLHttpRequest 封装的一个助手类
 *
 * @export
 * @class XmlHttpRequestHelper
 */
export class XmlHttpRequestHelper {
  /**
   * ajax 请求
   *
   * @static
   * @param {string} type
   * @param {string} url
   * @param {*} customHeaders
   * @param {*} data
   * @param {*} success
   * @param {*} error
   * @memberof XmlHttpRequestHelper
   */
  static ajax(type: string, url: string, customHeaders: any, data: any, success: any, error?: any) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          let result = JSON.parse(xhr.responseText);
          success(result);
        } else if (xhr.status !== 0) {
          // alert(abp.localization.localize('InternalServerError', 'AbpWeb'));
          window.console.debug(xhr); // TODO: Remove
          error(xhr.responseText);
        }
      }
    };

    url += (url.indexOf('?') >= 0 ? '&' : '?') + 'd=' + new Date().getTime();
    xhr.open(type, url, true);

    for (let property in customHeaders) {
      if (customHeaders.hasOwnProperty(property)) {
        xhr.setRequestHeader(property, customHeaders[property]);
      }
    }

    xhr.setRequestHeader('Content-type', 'application/json');
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  }
}
