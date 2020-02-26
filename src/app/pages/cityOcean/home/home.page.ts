import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import 'hammerjs';
import { SearchlocaltionComponent } from './search-localtion/search-localtion.component';
import { StartupService } from '@core/startup/startup.service';
import { HomeService } from './home.service';
import { onSDKReady } from '@cityocean/im-library';
import { getConversationList } from 'projects/cityocean/im-library/src/public-api';
import { login, genTestUserSig, deleteConversation } from '@cityocean/im-library';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showDeleteButton = false;
  transportationCost = false; //运价或船期查询
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;
  searchType = 'seachRates'; //  当前查询类别
  toolsList: any;

  groupMassageList = [];
  orignPort: any = {}; // 启运港
  deliveryPort: any = {}; // 目的港
  totalCount: any;
  scrollList = []; // 系统消息列表
  constructor(
    private nav: NavController,
    private modalController: ModalController,
    private startupService: StartupService,
    private homeService: HomeService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.toolsList = [
      {
        name: 'yunjia',
        title: this.translate.instant('Rates'),
      },
      {
        name: 'sailingSchedules',
        title: this.translate.instant('Schedule'),
      },
      {
        name: 'more',
        title: this.translate.instant('More'),
      },
    ];
    this.infiniteScroll.disabled = true;
    this.startupService.getUserConfig().then((res) => {
      let id = res.session.user.id;
      localStorage.setItem('current_tim_id', id);
      if (id) {
        this.imLogin(id);

        // this.homeService.getGroupMsgMobileList({ FromAccount: id }).subscribe((res: any) => {
        //   this.totalCount = res.totalCount;
        //   if (this.totalCount == res.items.length) {
        //     this.infiniteScroll.disabled = true;
        //   }
        //   if (isArray(res.items)) {
        //     res.items.forEach(ele => {
        //       ele.type = ele.groupId.replace(/\d/g, "").toLowerCase();
        //       ele.groupMsgs[0].creationTime = new Date(ele.groupMsgs[0].creationTime).getHours() + ":" + new Date(ele.groupMsgs[0].creationTime).getMinutes();
        //     });
        //     // this.groupMassageList = res.items;
        //     console.log(res.items);
        //   }
        // });
      }
    });
  }
  ionViewWillEnter() {
    this.getConversationsList();
  }
  getConversationsList() {
    onSDKReady(async () => {
      let imRes = await getConversationList();
      // this.totalCount = imRes.totalCount;
      // if (this.totalCount == imRes.items.length) {
      //   this.infiniteScroll.disabled = true;
      // }
      let list = imRes.data.conversationList;
      list = list.filter((e) => {
        //暂时不展示系统消息
        return e.type.indexOf('TIM') == -1 && e.type.indexOf('SYSTEM') == -1;
      });
      this.scrollList = imRes.data.conversationList.filter((e) => {
        //暂时不展示系统消息
        return e.type.indexOf('TIM') != -1 && e.type.indexOf('SYSTEM') != -1;
      });

      list.forEach((ele) => {
        if (ele.type == 'C2C') {
          ele.type = ele.type;
          ele.name = ele.userProfile.userID;
        } else if (ele.type != '@TIM#SYSTEM') {
          ele.type = ele.groupProfile.groupID.replace(/\d/g, '').toLowerCase();
          ele.name = ele.groupProfile.name;
        }
        const time = ele.lastMessage.lastTime;

        ele.lastMessage.lastTime = new Date(time).getHours() + ':' + new Date(time).getMinutes();
      });
      this.groupMassageList = list;
      console.log(this.groupMassageList);
    });
  }

  /**
   * 初始化并登陆 IM
   */
  async imLogin(userId: number) {
    let Id = '' + abp.session.user.id;
    let sigReturn = genTestUserSig(Id);
    let userSig = sigReturn.userSig;
    login(Id, userSig);
  }
  swipeup() {
    this.transportationCost = false;
  }
  swipedown() {
    this.transportationCost = true;
  }
  loadData(event) {
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        this.groupMassageList.push({
          num: 4,
          type: 'shipment',
          state: 'Eemurrage',
          name: 'OESZGS1909230009',
          description: '这是一段描述文字',
          time: '19:01',
        });
      }

      event.target.complete(); //告诉ion-infinite-scroll数据已经更新完成

      //禁用ion-infinite-scroll
      if (this.groupMassageList.length >= this.totalCount) {
        event.target.disabled = true;
      }
    }, 1000);
  }

  gotoChat(item) {
    if (item.type)
      this.nav.navigateForward(['/cityOcean/home/chat'], {
        queryParams: {
          conversationID: item.conversationID,
          C2C: item.type == 'C2C' ? true : false,
          id: item.type == 'C2C' ? item.userProfile.userID : item.groupProfile.groupID,
          groupName: item.name,
        },
      });
  }
  go4search() {
    if (!this.orignPort.id || !this.deliveryPort.id) {
      return;
    }
    let local = { orignPortHistory: this.orignPort, deliveryPortHistory: this.deliveryPort };
    let searchLocalStorage: Array<any> = JSON.parse(localStorage.getItem(this.searchType));
    if (!searchLocalStorage) {
      let tmp = [];
      tmp.push(local);
      localStorage.setItem(this.searchType, JSON.stringify(tmp));
    } else {
      const hasExit = searchLocalStorage.some(e=>{
        return e.orignPortHistory.id ==local.orignPortHistory.id &&
        e.deliveryPortHistory.id ==local.deliveryPortHistory.id
      })
      if(!hasExit){
        if (searchLocalStorage.length >= 10) {
          searchLocalStorage.shift();
        }
        searchLocalStorage.push(local);
        localStorage.setItem(this.searchType, JSON.stringify(searchLocalStorage));
      }
    }
    if (this.searchType === 'seachRates') {
      this.nav.navigateForward(['/cityOcean/home/rates'], {
        queryParams: {
          orignPortId: this.orignPort.id,
          deliveryPortId: this.deliveryPort.id,
        },
      });
    } else if (this.searchType === 'seachSailingSchedules') {
      this.nav.navigateForward(['/cityOcean/workbench/sailingSchedules'], {
        queryParams: {
          orignPortId: this.orignPort.id,
          deliveryPortId: this.deliveryPort.id,
        },
      });
    }
  }
  toolType(item) {
    switch (item.name) {
      case 'yunjia':
        this.transportationCost = !this.transportationCost;
        this.searchType = 'seachRates';
        break;
      case 'sailingSchedules':
        this.transportationCost = !this.transportationCost;
        this.searchType = 'seachSailingSchedules';
        break;
    }
  }
  deleteItem(i: any, data, node) {
    this.showDeleteButton = false;
    node.close();
    deleteConversation(data.conversationID).then((imRes) => {
      console.log(imRes);
      this.groupMassageList.splice(i, 1);
    });
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
      if (!res.data.isHistory)
        if (type == 'start') {
          this.orignPort = res.data.data;
        } else {
          this.deliveryPort = res.data.data;
        }
      else {
        this.orignPort = res.data.data.orignPortHistory;
        this.deliveryPort = res.data.data.deliveryPortHistory;
      }
    });
    return await modal.present();
  }
}
