import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import 'hammerjs';
import { SearchlocaltionComponent } from './search-localtion/search-localtion.component';
import { HomeService } from './home.service';
import { getConversationList, genTestUserSig, login, deleteConversation, onSDKReady } from '@cityocean/im-library';
import { CityOceanService } from '../city-ocean.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
  searchInput = ''; // 全局搜索
  conversationsList = [];
  orignPort: any = {}; // 启运港
  deliveryPort: any = {}; // 目的港
  totalCount: any;
  scrollList = []; // 系统消息列表
  private searchTerms = new Subject<string>();
  constructor(
    private nav: NavController,
    private modalController: ModalController,
    private homeService: HomeService,
    private translate: TranslateService,
    private cityOceanService: CityOceanService,
  ) {}

  ngOnInit() {
    this.infiniteScroll.disabled = true;
    this.cityOceanService.getCustomerId().then((res) => {
      this.cityOceanService.customerId = res;
      if (res) {
        this.imLogin(res);
      }
    });
    this.searchTerms.pipe(
        // 请求防抖 100毫秒
        debounceTime(200),
      ).subscribe((type)=>{
        this.nav.navigateForward(['/cityOcean/home/globelSearch'], { queryParams: { text: this.searchInput } });
      })
  }
  ionViewWillEnter() {
    if (localStorage.getItem('isLoginWithTourist') == 'true') {
      this.toolsList = [
        // 游客模式业务类型
        {
          name: this.translate.instant('sailing'),
          type: 'sailingSchedules',
          marker: false,
          id: 0,
        },
        {
          name: this.translate.instant('rates'),
          type: 'shipment',
          marker: false,
          id: 0,
        },
      ];
    } else {
      this.homeService.getQuickEntrance().subscribe((res) => {
        this.toolsList = res.items;
        this.toolsList.push({
          name: 'more',
          type: 'more',
        });
      });
    }
    this.getConversationsList();
  }

  getConversationsList() {
    onSDKReady(async () => {
      let imRes = await getConversationList();
      if (!imRes) {
        return;
      }
      // this.totalCount = imRes.totalCount;
      // if (this.totalCount == imRes.items.length) {
      //   this.infiniteScroll.disabled = true;
      // }
      let list = imRes.data.conversationList;
      list = list.filter((e) => {
        return e.type.indexOf('TIM') == -1 && e.type.indexOf('SYSTEM') == -1;
      });
      this.scrollList = imRes.data.conversationList.filter((e) => {
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
        const time = ele.lastMessage.lastTime;

        ele.lastMessage.lastTime = new Date(time).getHours() + ':' + new Date(time).getMinutes();
      });
      this.conversationsList = [...list];
      let c2cList = this.conversationsList.filter((e) => {
        return e.type === 'C2C';
      });
      this.cityOceanService.filterHistoryCustomerId(c2cList);
      console.log(this.conversationsList);
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
  // 客服
  chatWithCustomer() {
    this.cityOceanService.chatWithCustomerService();
  }
  swipeup() {
    this.transportationCost = false;
  }
  swipedown() {
    this.transportationCost = true;
  }
  onInputChange(e) {
    this.searchTerms.next(e);
  }

  // 下拉加载(暂无用)
  loadData(event) {
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        this.conversationsList.push({
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
      if (this.conversationsList.length >= this.totalCount) {
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
          conversationType: item.type == 'C2C' ? 'c2c' : item.groupProfile.type,
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
      const hasExit = searchLocalStorage.some((e) => {
        return (
          e.orignPortHistory.id == local.orignPortHistory.id && e.deliveryPortHistory.id == local.deliveryPortHistory.id
        );
      });
      if (!hasExit) {
        if (searchLocalStorage.length >= 10) {
          searchLocalStorage.shift();
        }
        searchLocalStorage.push(local);
        localStorage.setItem(this.searchType, JSON.stringify(searchLocalStorage));
      }
    }
    if (this.searchType === 'seachRates') {
      this.nav.navigateForward(['/cityOcean/workbench/rates'], {
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
  toolTypeClick(item) {
    switch (item.type) {
      case 'rates':
        this.transportationCost = !this.transportationCost;
        this.searchType = 'seachRates';
        break;
      case 'sailingSchedules':
        this.transportationCost = !this.transportationCost;
        this.searchType = 'seachSailingSchedules';
        break;
      case 'billing':
        this.nav.navigateForward(['/cityOcean/workbench/' + item.type]);
        break;
      case 'booking':
        this.nav.navigateForward(['/cityOcean/workbench/' + item.type]);
        break;
      case 'sailingSchedules':
        this.nav.navigateForward(['/cityOcean/workbench/' + item.type]);
        break;
      case 'shipment':
        this.nav.navigateForward(['/cityOcean/workbench/' + item.type]);
        break;
      case 'more':
        this.nav.navigateForward(['/cityOcean/workbench']);
        break;
    }
  }
  deleteItem(i: any, data, node) {
    this.showDeleteButton = false;
    node.close();
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
