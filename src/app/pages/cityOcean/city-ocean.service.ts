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
  globelCustomerName = '';
  customerId: ''; // 当前登录人的id
  hasHistoryChat: any = [];
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
    return this.httpService.get('/SSO/User/GetByEmail', { email: 'poppyhu@cityocean.com' }).subscribe((res: any) => {
      if (res && res.id) {
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
    if (abp.session && abp.session.user && abp.session.user.id) {
      return Promise.resolve(this.customerId);
    } else {
      return this.startupService.getUserConfig().then((res) => {
        this.customerId = res.session.user.id;
        return Promise.resolve(this.customerId);
      });
    }
  }
  async chatWithCustomerService() {
    // if (!this.globelCustomerId) {
    //   this.helper.toast(this.translate.instant('No customer'));
    //   return;
    // }
    if (localStorage.getItem('isLoginWithTourist') == 'true') {
      this.chatWithTourist();
      return;
    }
    if (this.hasHistoryChat.length) {
      this.gotoChat();
      return;
    }
    try {
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
    } catch (error) {
      this.helper.toast(this.translate.instant('Failed to contact customer'));
    }
  }
  async chatWithTourist() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.instant('onlyForVip'),
      cssClass: 'my-action-sheet my-action-sheet-customer',
      buttons: [
        {
          text: this.translate.instant('Customer Phone') + ' 0755 -1234567',
          icon: 'phone',
          handler: () => {
            this.callNumber
              .callNumber('10086', true)
              .then((res) => console.log('Launched dialer!', res))
              .catch((err) => console.log('Error launching dialer', err));
          },
        },
        {
          text: this.translate.instant('Register and Login'),
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
  filterHistoryCustomerId(c2cList) {
    this.hasHistoryChat = c2cList.filter((e) => {
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
}
