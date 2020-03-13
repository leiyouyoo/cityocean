import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import 'hammerjs';
import { SearchlocaltionComponent } from './search-localtion/search-localtion.component';
import { HomeService } from './home.service';
import {
  getConversationList,
  setMessageRead,
  genTestUserSig,
  login,
  deleteConversation,
  onSDKReady,
  onKickedOut,
  onConversationUpdate,
} from '@cityocean/im-library';
import { CityOceanService } from '../city-ocean.service';
import { TranslateService } from '@ngx-translate/core';
import { QuickEnterComponent } from '../workbench/quick-enter/quick-enter.component';
import { GlobelSearchComponent } from './globel-search/globel-search.component';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonContent } from '@ionic/angular';
import * as moment from 'moment';
import { Helper } from '@shared/helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showDeleteButton = false;
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  searchType = 'seachRates'; //  当前查询类别
  toolsList: any;
  conversationsList: any = [];
  orignPort: any = {}; // 启运港
  deliveryPort: any = {}; // 目的港
  totalCount: any;
  scrollList = []; // 系统消息列表
  deleteWecomeFlag = JSON.parse(localStorage.getItem('deleteWecomeFlag')); //删除welcome标记
  checkIsLoginWithTourist = this.cityOceanService.getIsLoginWithTourist();
  constructor(
    private nav: NavController,
    private modalController: ModalController,
    private homeService: HomeService,
    private translate: TranslateService,
    private cityOceanService: CityOceanService,
    private statusBar: StatusBar,
    private helper: Helper,
    private router: Router,
    private el: ElementRef,
    private renderer2: Renderer2,
  ) {}

  ngOnInit() {
    this.infiniteScroll.disabled = true;
    if (!this.checkIsLoginWithTourist) {
      this.imLogin();
    }
  }
  ionScroll(event) {
    const inputForSearch = this.el.nativeElement.querySelector('#inputForSearch');
    const searchIicon = this.el.nativeElement.querySelector('.search-right-icon');
    const contentGroup = this.el.nativeElement.querySelector('.content-group');
    const searchetail = this.el.nativeElement.querySelector('.search-detail');
    const toolsGroupElement = this.el.nativeElement.querySelector('.tools-group');
    if (
      searchetail.clientHeight &&
      searchetail.clientHeight + toolsGroupElement.clientHeight <= event.detail.scrollTop
    ) {
      // toolsGroupElement.style.display = 'none';
      // searchetail.style.display = 'none';
      // this.renderer2.addClass(contentGroup, 'overFlow-hide-header');
      inputForSearch.style.display = 'none';
      searchIicon.style.display = 'inline-block';
      // this.ionContent.scrollToPoint(null, 1);
    }
    // if (event.detail.scrollTop === 0 && searchetail.style.display == 'none') {
    if (event.detail.scrollTop === 0) {
      // toolsGroupElement.style.display = 'flex';
      searchetail.style.display = 'block';
      inputForSearch.style.display = 'flex';
      searchIicon.style.display = 'none';
      // this.ionContent.scrollToPoint(null, searchetail.clientHeight + toolsGroupElement.clientHeight - 1);
      this.renderer2.removeClass(contentGroup, 'overFlow-hide-header');
    }
  }
  ionViewWillEnter() {
    if (this.checkIsLoginWithTourist) {
      this.searchType = 'searchSailingSchedules';
      this.toolsList = [
        // 游客模式业务类型
        {
          name: this.translate.instant('Schedules'),
          type: 'sailingSchedules',
          marker: false,
          id: 0,
        },
        {
          name: this.translate.instant('Shipments'),
          type: 'shipments',
          marker: false,
          id: 0,
        },
      ];
    } else {
      this.homeService.getQuickEntrance().subscribe((res) => {
        this.toolsList = res.items;
        this.toolsList.push({
          name: 'More',
          type: 'More',
        });
        this.setToolListOrder();
      });
    }
    this.getConversationsList();
  }

  getConversationsList() {
    const initConversationList = (list) => {
      list = list.filter((e) => {
        return e.type.indexOf('TIM') == -1 && e.type.indexOf('SYSTEM') == -1;
      });
      this.scrollList = list.filter((e) => {
        return e.type.indexOf('SYSTEM') != -1;
      });

      list.forEach((ele) => {
        if (ele.type == 'C2C') {
          ele.type = ele.type;
          ele.name = ele.userProfile.userID;
        } else if (ele.type != '@TIM#SYSTEM') {
          ele.type = ele.groupProfile.groupID.replace(/\d/g, '').toLowerCase();
          ele.name = ele.groupProfile.name;
        }
      });
      if (!this.deleteWecomeFlag) {
        list.unshift({
          name: this.translate.instant('Welcome'),
          lastMessage: {
            messageForShow: this.translate.instant('Welcome to cityocean'),
            lastTime: this.cityOceanService.getEnterAppTime() || moment(new Date()).format('HH:mm'),
          },
          type: 'welcome',
        });
      }
      this.conversationsList = [...list];
    };
    const that = this;
    onKickedOut(function kickedOut() {
      that.helper.toast('账号在其他地方登录，请确认并重新登录。');
      that.cityOceanService.loginOut();
    });
    onConversationUpdate(function updateConversationList(event) {
      console.log(event);
      initConversationList(event.data);
    });
    onSDKReady(async () => {
      let imRes = await getConversationList();
      if (!imRes) {
        return;
      }

      // this.totalCount = imRes.totalCount;
      // if (this.totalCount == imRes.items.length) {
      //   this.infiniteScroll.disabled = true;
      // }
      initConversationList(imRes.data.conversationList);
      console.log(this.conversationsList);
    });
    if (this.checkIsLoginWithTourist) {
      this.conversationsList = [
        {
          name: this.translate.instant('Welcome'),
          lastMessage: {
            messageForShow: this.translate.instant('Welcome to cityocean'),
            lastTime: this.cityOceanService.getEnterAppTime() || moment(new Date()).format('HH:mm'),
          },
          type: 'welcome',
        },
      ];
    }
  }

  /**
   * 初始化并登陆 IM
   */
  async imLogin() {
    this.cityOceanService.getCustomerId().then((res) => {
      let Id = '' + res;
      let sigReturn = genTestUserSig(Id);
      let userSig = sigReturn.userSig;
      login(Id, userSig);
    });
  }
  // 客服
  chatWithCustomer() {
    this.cityOceanService.chatWithCustomerService();
  }

  async onInputChange() {
    const modal = await this.modalController.create({
      component: GlobelSearchComponent,
      componentProps: {},
    });
    modal.onWillDismiss().then((res) => {
      console.log(res);
    });
    return await modal.present();
  }

  // 下拉加载(暂无用)
  loadData(event) {
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        this.conversationsList.push({
          type: 'shipment',
          state: 'Eemurrage',
          name: 'OESZGS1909230009',
          description: '这是一段描述文字',
          time: '19:01',
        });
      }

      event.target.complete(); //告诉ion-infinite-scroll数据已经更新完成

      //禁用ion-infinite-scroll
      if (this.conversationsList.length >= this.totalCount) {
        event.target.disabled = true;
      }
    }, 1000);
  }

  gotoChat(item) {
    if (item.type === 'welcome') {
      return;
    }
    if (item.type) {
      setMessageRead(item.conversationID);
      this.nav.navigateForward(['/cityOcean/home/chat'], {
        queryParams: {
          conversationID: item.conversationID,
          C2C: item.type == 'C2C' ? true : false,
          id: item.type == 'C2C' ? item.userProfile.userID : item.groupProfile.groupID,
          groupName: item.type === 'C2C' ? (item.userProfile.nick ? item.userProfile.nick : item.name) : item.name,
          conversationType: item.type,
        },
      });
    }
  }
  go4search() {
    if (!this.orignPort.id || !this.deliveryPort.id) {
      return;
    }
    this.cityOceanService.setRatesOrSailSearchHistory(this.searchType, this.orignPort, this.deliveryPort);
    if (this.searchType === 'seachRates') {
      this.nav.navigateForward(['/cityOcean/home/rates'], {
        queryParams: {
          orignPortId: this.orignPort.id,
          orignPortName: this.orignPort.name,
          deliveryPortId: this.deliveryPort.id,
          deliveryPortName: this.deliveryPort.name,
          routeBackType: 'home',
        },
      });
    } else if (this.searchType === 'searchSailingSchedules') {
      this.nav.navigateForward(['/cityOcean/home/sailingSchedules'], {
        queryParams: {
          orignPortId: this.orignPort.id,
          deliveryPortId: this.deliveryPort.id,
          routeBackType: 'home',
        },
      });
    }
  }
  toolTypeClick(item) {
    switch (item.type) {
      case 'rates':
        this.searchType = 'seachRates';
        break;
      case 'sailingSchedules':
        this.searchType = 'searchSailingSchedules';
        break;
      case 'billing':
        this.router.navigate(['/cityOcean/home/' + item.type], {
          queryParams: {
            routeBackType: 'home',
          },
        });
        break;
      case 'booking':
        this.router.navigate(['/cityOcean/home/' + item.type], {
          queryParams: {
            routeBackType: 'home',
          },
        });
        break;
      case 'shipments':
        this.router.navigate(['/cityOcean/home/' + item.type], {
          queryParams: {
            routeBackType: 'home',
          },
        });
        break;
      case 'More':
        // this.nav.navigateForward(['/cityOcean/workbench']);
        this.moreClick();
        break;
    }
  }
  typeChoosed(type){
    this.searchType = type
  }
  async moreClick() {
    const modal = await this.modalController.create({
      cssClass: 'home-quick-enter',
      component: QuickEnterComponent,
      componentProps: {
        isHome: true,
        quickEnterList: this.toolsList.filter((e) => {
          return e.type != 'More';
        }),
      },
    });
    modal.onWillDismiss().then((res) => {
      if (res.data) {
        this.toolsList = res.data;
        this.toolsList.push({
          name: 'More',
          type: 'More',
        });
        this.setToolListOrder();
      }
    });
    return await modal.present();
  }
  segmentChanged(event) {
    this.searchType = event.detail.value;
  }
  setToolListOrder() {
    let _order = 3;
    this.toolsList.forEach((e) => {
      _order++;
      if (e.type === 'rates') {
        e.order = 1;
      } else if (e.type === 'sailingSchedules') {
        e.order = 2;
      } else if (e.type === 'shipments') {
        e.order = 3;
      } else if (e.type === 'More') {
        e.order = 100;
      } else {
        e.order = _order;
      }
    });
  }
  deleteItem(i: any, data, node) {
    this.showDeleteButton = false;
    node.close();
    if (data.type === 'welcome') {
      this.deleteWecomeFlag = true;
      localStorage.setItem('deleteWecomeFlag', 'true');
      this.conversationsList.splice(i, 1);
      return;
    }
    // getMessageList(data.conversationID).then((imRes) => {
    //   console.log(imRes);
    // });
    deleteConversation(data.conversationID).then(
      (imRes) => {
        console.log(imRes);
        this.conversationsList.splice(i, 1);
      },
      (Error) => {
        console.log(Error);
      },
    );
  }
  showDeleteButtonFn(node) {
    this.showDeleteButton = true;
    node.close();
    node.open();
  }
  canceDelete(node) {
    this.showDeleteButton = false;
    node.close();
  }
  async searchLocaltion(type) {
    const modal = await this.modalController.create({
      component: SearchlocaltionComponent,
      componentProps: { type: this.searchType },
    });
    modal.onWillDismiss().then((res) => {
      console.log(res);
      if (res.data.isHistory === 'cancel') {
        return;
      }
      if (!res.data.isHistory) {
        if (type == 'start') {
          this.orignPort = res.data.data;
        } else {
          this.deliveryPort = res.data.data;
        }
      } else {
        this.orignPort = res.data.data.orignPortHistory;
        this.deliveryPort = res.data.data.deliveryPortHistory;
      }
    });
    return await modal.present();
  }
}
