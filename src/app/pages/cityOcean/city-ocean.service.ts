import { Injectable } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { Observable } from 'rxjs';
import { StartupService } from '@core';
import { createTextMessage, sendmessage } from '@cityocean/im-library';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class CityOceanService {
  globelCustomerId = ''; //  全局客服id
  globelCustomerName = '';
  customerId: ''; // 当前登录人的id
  hasHistoryChat: any = [];
  constructor(private httpService: HttpService, private startupService: StartupService, private nav: NavController) {
    this.getCustomerId().then((res) => {
      if (localStorage.getItem('isLoginWithTourist') == 'true') {
        this.GetIdByEmail();
      } else {
        this.GetCoUserByCustomer({ customerId: res }).subscribe((res) => {
          if (res.id) {
            this.globelCustomerId = res.id;
            this.globelCustomerName = res.name;
          } else {
            this.GetIdByEmail();
          }
        });
      }
    });
  }
  GetIdByEmail() {
    return this.httpService.get('/SSO/User/GetByEmail', { email: 'itservice@cityocean.com' }).subscribe((res: any) => {
      if (res.id) {
        this.globelCustomerId = res.id;
        this.globelCustomerName = res.name;
        return res.id;
      }
    });
  }
  // 根据当前登录客户获取客户所属业务员
  GetCoUserByCustomer(obj = {}): Observable<any> {
    let params = obj;
    return this.httpService.get('/CRM/CustomerExternal/GetCoUserByCustomer', params);
  }
  getCustomerId() {
    if (this.customerId) {
      return Promise.resolve(this.customerId);
    } else {
      return this.startupService.getUserConfig().then((res) => {
        this.customerId = res.session.user.id;
        return Promise.resolve(this.customerId);
      });
    }
  }
  async chatWithCustomerService(c2cList?) {
    if( this.hasHistoryChat.length){
      this.gotoChat();
      return 
    }
    let textMessage;
    textMessage = createTextMessage(this.customerId, 'signle', 'hello');
    await sendmessage(textMessage).then((imRes) => {
      const imData = imRes.data.message;
      this.nav.navigateForward(['/cityOcean/home/chat'], {
        queryParams: {
          conversationID: imData.conversationID,
          C2C: true,
          id: this.customerId,
          groupName: this.globelCustomerName,
          conversationType: 'c2c',
        },
      });
    });
  }
  filterHistoryCustomerId(c2cList){
    this.hasHistoryChat = c2cList.filter((e) => {
      return e.userProfile.userID == this.globelCustomerId;
    });
  }
  gotoChat(){
    this.nav.navigateForward(['/cityOcean/home/chat'], {
      queryParams: {
        conversationID: this.hasHistoryChat[0].conversationID,
        C2C: true,
        id: this.hasHistoryChat[0].userProfile.userID,
        groupName: this.hasHistoryChat[0].userProfile.nick,
        conversationType: 'c2c',
      },
    });
  }
}
