import { Injectable, Inject } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { Observable } from 'rxjs';
import { StartupService } from '@core';
import { createTextMessage, logOut, sendmessage, setMessageRead, genTestUserSig, login } from '@cityocean/im-library';
import { NavController, ActionSheetController, PopoverController } from '@ionic/angular';
import { Helper } from '@shared/helper';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import * as moment from 'moment';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Injectable({
  providedIn: 'root',
})
export class CityOceanService {
  globelCustomerId = ''; //  全局客服id
  globelCustomerName = ''; // 客服名称
  globelCustomerPhone = '0755-33958211'; // 客服电话
  customerId: ''; // 当前登录人的id
  firstEnterAppTime = JSON.parse(localStorage.getItem('firstEnterAppTime')); // 首次进入app时间
  ratesDetail: any; // rates详情页数据
  constructor(
    private httpService: HttpService,
    private startupService: StartupService,
    private nav: NavController,
    public helper: Helper,
    private translate: TranslateService,
    private actionSheetController: ActionSheetController,
    private callNumber: CallNumber,
    @Inject(DA_SERVICE_TOKEN) private tokenSrv: ITokenService,
    private popoverController: PopoverController,
  ) {}
  /**
   *判断是否为游客登录
   *
   * @returns
   * @memberof CityOceanService
   */
  getIsLoginWithTourist() {
    if (localStorage.getItem('isLoginWithTourist') == 'true') {
      return true;
    } else {
      return false;
    }
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
  /**
   * 第一个登录app的时间
   *
   * @returns
   * @memberof CityOceanService
   */
  getEnterAppTime() {
    if (!this.firstEnterAppTime) {
      this.firstEnterAppTime = Date.now()
        .toString()
        .substr(0, 10);
      localStorage.setItem('firstEnterAppTime', this.firstEnterAppTime);
    }
    return this.firstEnterAppTime;
  }

  // shipment业务对话获取相关的业务id（app端）
  GetRelatedBusiness(params: { id: number }) {
    return this.httpService.get('/CSP/Shipment/GetRelatedBusiness', params);
  }
  // 根据当前登录客户获取客户所属业务员
  GetCoUserByCustomer(obj = {}): Observable<any> {
    let params = obj;
    return this.httpService.get('/CRM/CustomerExternal/GetCoUserByCustomer', params);
  }
  // 根据shipmentNo获取列表
  GetRouteDetailsByShipmentNo(id: any) {
    return this.httpService.get('/CSP/Shipment/GetRouteDetailsByShipmentNo', { shipmentNo: id });
  }
  /**
   *获取当前登录人的id
   *
   * @returns
   * @memberof CityOceanService
   */
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
  /**
   *处理与客服聊天的方法
   *
   * @param {*} [type]
   * @param {*} [id]
   * @param {*} [name]
   * @returns
   * @memberof CityOceanService
   */
  async chatWithCustomerService(type?, id?, name?) {
    // if (!this.globelCustomerId) {
    //   this.helper.toast(this.translate.instant('No customer'));
    //   return;
    // }
    if (this.getIsLoginWithTourist()) {
      // 如果为游客登录，找全局客服
      this.chatWithTourist();
      return;
    }
    if (type && id) {
      // 从业务详情联系业务人员入口
      this.nav.navigateForward(['/cityOcean/home/chat'], {
        queryParams: {
          conversationID: `GROUP${type}${id}`,
          C2C: false,
          id: `${type}${id}`,
          groupName: name,
          conversationType: 'Private',
        },
      });
      return;
    }
    this.sendMessage(this.globelCustomerId, this.globelCustomerName); // 发送消息，建立会话
  }
  async sendMessage(userId, name) {
    try {
      let conversationID = 'C2C' + userId;
      setMessageRead(conversationID);
      this.nav.navigateForward(['/cityOcean/home/chat'], {
        queryParams: {
          conversationID: conversationID,
          C2C: true,
          id: userId,
          groupName: name || userId,
          conversationType: 'c2c',
        },
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
              .callNumber(this.globelCustomerPhone, true)
              .then((res) => console.log('Launched dialer!', res))
              .catch((err) => console.log('Error launching dialer', err));
          },
        },
        {
          text: this.translate.instant('Login'),
          icon: 'register',
          handler: () => {
            // window.location.href = '/login';
            this.loginOut();
          },
        },
      ],
    });
    await actionSheet.present();

    // await actionSheet.onWillDismiss().then((res) => {

    // });
  }

  /**
   * 格式化聊天时间
   *
   * @param {*} formatType 首页消息时间格式
   * @param {*} time 消息时间
   * @returns
   * @memberof CityOceanService
   */
  getImChatTime(time, formatType?) {
    const replaceAMPM = (e: string) => {
      return e.replace(/PM/, `${this.translate.instant('PM')}`).replace(/AM/, `${this.translate.instant('AM')}`);
    };
    const Date = moment(time);
    let currentWeek = moment()
      .weekday(moment().weekday())
      .format();
    if (Date.isValid()) {
      const toDay = moment().startOf('day');
      if (Date.isSameOrAfter(toDay)) {
        return replaceAMPM(Date.format(formatType || `[${this.translate.instant('Today')}] A hh:mm`));
      } else if (Date.isSameOrAfter(toDay.subtract(1, 'd')) && Date.isBefore(moment().format())) {
        return replaceAMPM(Date.format(`[${this.translate.instant('Yesterday')}] A hh:mm`));
      }
      if (Date.isBefore(currentWeek)) {
        return replaceAMPM(Date.format('YYYY/MM/DD A hh:mm'));
      } else {
        let week = '';
        switch (Date.format('d')) {
          case '1':
            week = this.translate.instant('Monday');
            break;
          case '2':
            week = this.translate.instant('Tuesday');
            break;
          case '3':
            week = this.translate.instant('Wednesday');
            break;
          case '4':
            week = this.translate.instant('Thursday');
            break;
          case '5':
            week = this.translate.instant('Friday');
            break;
          case '6':
            week = this.translate.instant('Saturday');
            break;
          default:
            week = this.translate.instant('Sunday');
            break;
        }
        return replaceAMPM(Date.format(`[${week}] A hh:mm`));
      }
    } else {
      return '';
    }
  }
  // 个人信息
  gotoUserProfile(userId) {
    this.nav.navigateForward(['/cityOcean/home/chat/userProfile'], {
      queryParams: {
        userId: userId,
      },
    });
  }
  loginOut() {
    this.tokenSrv.clear();
    abp.session = null;
    try {
      logOut();
    } catch (error) {}
    // window.location.href = '/login';
    this.nav.navigateRoot(['/login']);
  }
  setRatesOrSailSearchHistory(searchType, orignPort, deliveryPort) {
    if (!this.getIsLoginWithTourist()) {
      let local = { orignPortHistory: orignPort, deliveryPortHistory: deliveryPort };
      let searchLocalStorage: Array<any> = JSON.parse(localStorage.getItem(searchType));
      if (!searchLocalStorage) {
        let tmp = [];
        tmp.push(local);
        localStorage.setItem(searchType, JSON.stringify(tmp));
      } else {
        const hasExit = searchLocalStorage.some((e) => {
          return (
            e.orignPortHistory.id == local.orignPortHistory.id &&
            e.deliveryPortHistory.id == local.deliveryPortHistory.id
          );
        });
        if (!hasExit) {
          if (searchLocalStorage.length >= 10) {
            searchLocalStorage.shift();
          }
          searchLocalStorage.push(local);
          localStorage.setItem(searchType, JSON.stringify(searchLocalStorage));
        }
      }
    }
  }

  async showRelatedBusinessPopover(event, popoverList, component, bussinessType, routeBackType, cssClass?) {
    const popover = await this.popoverController.create({
      component: component,
      showBackdrop: false,
      mode: 'ios',
      event: event,
      backdropDismiss: true,
      cssClass: cssClass,
      componentProps: { popoverList: popoverList, type: bussinessType, routeBackType: routeBackType },
    });
    popover.onDidDismiss().then((event) => {});
    await popover.present();
  }
}
