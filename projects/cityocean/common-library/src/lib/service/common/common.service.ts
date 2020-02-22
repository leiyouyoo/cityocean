import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  list: Array<any> = new Array<any>();
  constructor() {
  }

  //截取路径后面的参数值
  getParams(url: any): any {
    return new Promise((deferred, reject) => {
      if (url) {
        let str = url.substr(url.indexOf(';') + 1);//截取；后面的数据
        let info = str.split(';');//根据;分割
        for (let i = 0; i < info.length; i++) {//循环这个数组
          let obj = info[i];
          let data = obj.split('=');
          this.list.push({ key: data[0], value: data[1] })
        }
        deferred(this.list);
      }
    })
  }
}



