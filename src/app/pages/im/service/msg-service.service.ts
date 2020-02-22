import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MsgServiceService {

  public messageList = [
    //{ name: "obama3", time: "2019-8-27 17:07:25", msg: "text text text" },
    //{ name: "obama", ismine: true, time: "2019-8-27 17:07:25", msg: "text text text" },
    //{ name: "obama", ismine: true, time: "2019-8-27 17:07:25", msg: "text text text" },
  ];

  constructor() { }

  getMsgInfo() {
    return this.messageList;
  }
  sendMsg(obj): boolean {
    this.messageList.push(obj)
    console.log(obj)
    return true
  }
}
