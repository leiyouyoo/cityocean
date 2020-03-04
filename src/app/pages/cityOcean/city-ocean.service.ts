import { Injectable } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { Observable } from 'rxjs';
import { StartupService } from '@core';
import { createTextMessage, sendmessage } from '@cityocean/im-library';
import { NavController, ActionSheetController } from '@ionic/angular';
import { Helper } from '@shared/helper';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Injectable({
  providedIn: 'root',
})
export class CityOceanService {
  globelCustomerId = ''; //  全局客服id
  globelCustomerName = '';// 客服名称
  globelCustomerPhone = ''; // 客服电话
  customerId: ''; // 当前登录人的id
  hasHistoryChat: any = [];
  c2cList: any;
  constructor(
    private httpService: HttpService,
    private startupService: StartupService,
    private nav: NavController,
    public helper: Helper,
    private translate: TranslateService,
    private actionSheetController: ActionSheetController,
    private callNumber: CallNumber,
  ) {
    this.getCustomerId().then((res) => {
      if (this.getIsLoginWithTourist()) {
        this.GetIdByEmail().subscribe((res: any) => {
          if (res && res.id) {
            this.globelCustomerId = res.id;
            this.globelCustomerName = res.name;
            this.globelCustomerPhone = res.phoneNumber;
            return res.id;
          }
        });
      } else {
        this.GetCoUserByCustomer({ customerId: res }).subscribe((res) => {
          if (res.id) {
            this.globelCustomerId = res.id;
            this.globelCustomerName = res.name;
            this.globelCustomerPhone = res.phoneNumber;
          } else {
            this.GetIdByEmail();
          }
        });
      }
    });
  }
  getIsLoginWithTourist(){
    if (localStorage.getItem('isLoginWithTourist') == 'true') {
      return true;
    }else{
      return false;
    }
  }
  GetIdByEmail() {
    return this.httpService.get('/SSO/User/GetByEmail', { email: 'poppyhu@cityocean.com' })
  }
  // 根据当前登录客户获取客户所属业务员
  GetCoUserByCustomer(obj = {}): Observable<any> {
    let params = obj;
    return this.httpService.get('/CRM/CustomerExternal/GetCoUserByCustomer', params);
  }
  getCustomerId() {
    if (abp.session && abp.session.user && abp.session.user.id) {
      return Promise.resolve(this.customerId);
    } else {
      return this.startupService.getUserConfig().then((res) => {
        this.customerId = res.session.user.id;
        return Promise.resolve(this.customerId);
      });
    }
  }
  async chatWithCustomerService(type?,id?,name?) {
    // if (!this.globelCustomerId) {
    //   this.helper.toast(this.translate.instant('No customer'));
    //   return;
    // }
    if(type && id){
      this.nav.navigateForward(['/cityOcean/home/chat'], {
        queryParams: {
          conversationID: `GROUP${type}${id}`,
          C2C: false,
          id: `${type}${id}`,
          groupName: name,
          conversationType: 'Private',
        },
      });
      return
    }
    if (this.getIsLoginWithTourist()) {
      this.chatWithTourist();
      return;
    }
    if (this.hasHistoryChat.length) {
      this.gotoChat();
      return;
    }
    this.sendMessage(this.customerId,this.globelCustomerName)
  }
  async sendMessage(userId,name){
    try {
      let textMessage;
      textMessage = createTextMessage(userId, 'signle', 'hello');
      await sendmessage(textMessage).then((imRes) => {
        const imData = imRes.data.message;
        this.nav.navigateForward(['/cityOcean/home/chat'], {
          queryParams: {
            conversationID: imData.conversationID,
            C2C: true,
            id: userId,
            groupName: name,
            conversationType: 'c2c',
          },
        });
      });
    } catch (error) {
      this.helper.toast(this.translate.instant('Failed to contact customer'));
    }
  }
  async chatWithTourist() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-action-sheet my-action-sheet-customer',
      buttons: [
        {
          text: this.translate.instant('Call') + ' ' + this.globelCustomerPhone,
          icon: 'phone',
          handler: () => {
            this.callNumber
              .callNumber('0755-33958211', true)
              .then((res) => console.log('Launched dialer!', res))
              .catch((err) => console.log('Error launching dialer', err));
          },
        },
        {
          text: this.translate.instant('Login'),
          icon: 'register',
          handler: () => {
            window.location.href = '/login';
          },
        },
      ],
    });
    await actionSheet.present();

    // await actionSheet.onWillDismiss().then((res) => {

    // });
  }
  filterHistoryCustomerId(list) {
    this.c2cList = list;
    this.hasHistoryChat = this.c2cList.filter((e) => {
      return e.userProfile.userID == this.globelCustomerId;
    });
  }
  gotoChat() {
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
  // 个人信息
  gotoUserProfile(userId) {
    this.nav.navigateForward(['/cityOcean/home/chat/userProfile'], {
      queryParams: {
        userId: userId,
      },
    });
  }
}
