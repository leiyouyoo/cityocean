import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, ModalController } from '@ionic/angular';
import { SearchlocaltionComponent } from '../home/search-localtion/search-localtion.component';
import { WorkbenchService } from './workbench.service';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-workbench',
  templateUrl: 'workbench.page.html',
  styleUrls: ['workbench.page.scss'],
})
export class WorkbenchPage implements OnInit {
  typeList = [
    // 所有业务类型
    {
      name: '运价',
      type: 'rates',
      marker: false,
      id: 0,
    },
    {
      name: '船期',
      type: 'sailingSchedules',
      marker: false,
      id: 0,
    },
    {
      name: '运单',
      type: 'shipment',
      marker: false,
      id: 0,
    },
    {
      name: '订单',
      type: 'booking',
      marker: false,
      id: 0,
    },
    {
      name: '报价',
      type: 'quotes',
      marker: false,
      id: 0,
    },
    {
      name: '账单',
      type: 'billing',
      marker: false,
      id: 0,
    },
  ];
  quickEnterList = [
    // 已添加到快捷入口的数据
    {
      name: '运价',
      type: 'rates',
      marker: false,
      id: 0,
    },
    {
      name: '船期',
      type: 'sailingSchedules',
      marker: false,
      id: 0,
    },
    {
      name: '运单',
      type: 'shipment',
      marker: false,
      id: 0,
    },
    {
      name: '订单',
      type: 'booking',
      marker: false,
      id: 0,
    },
  ];
  moreTypeList = [
    // 还未添加到快捷入口的数据
    {
      name: '账单',
      type: 'billing',
      marker: false,
      id: 0,
    },
    {
      name: '报价',
      type: 'quotes',
      marker: false,
      id: 0,
    },
  ];
  title = 'shipment';
  titleStatisticsList = [
    {
      type: 'intransit',
      name: '在途',
      value: 0,
    },
    {
      type: 'finished',
      name: '到港',
      value: 0,
    },
  ];

  searchTransportationCost = false; // 搜索展示
  isEditing = false; // 控制是否添加快捷入口
  orignPort: any = {}; //启运港
  deliveryPort: any = {}; //目的港
  searchType = 'seachRates'; //  当前查询类别
  constructor(
    public translate: TranslateService,
    private nav: NavController,
    public actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private workbenchService: WorkbenchService,
    private homeService: HomeService,
  ) {}
  ngOnInit(): void {
    this.shipmentStatistics();
  }
  ionViewWillEnter() {
    this.homeService.getQuickEntrance().subscribe((res) => {
      this.quickEnterList = res.items;
      this.moreTypeList = this.typeList.filter((e) => {
        if (this.quickEnterList.length == 0) {
          return true;
        }
        return !this.quickEnterList.some((ele) => {
          return e.type == ele.type;
        });
      });
    });
  }
  confirm() {
    this.homeService.createQuickEntrance(this.quickEnterList).subscribe((res) => {
      console.log(res);
    });
  }
  shipmentStatistics() {
    this.workbenchService.GetShipmentsStatistics().subscribe((res: any) => {
      let inProgress = 0;
      let arrival = 0;
      res.items.forEach((element) => {
        if (element.name === 'At Arrival Port') {
          arrival = element.count;
        } else if (element.name === 'All shipments in progress') {
          inProgress = element.count;
        }
        this.titleStatisticsList = [
          {
            type: 'intransit',
            name: '在途',
            value: inProgress,
          },
          {
            type: 'finished',
            name: '到港',
            value: arrival,
          },
        ];
      });
    });
  }
  /**
   *更换当前统计数据类别
   *
   * @memberof WorkbenchPage
   */
  async businessChange() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Business Data',
      cssClass: 'my-action-sheet',
      buttons: [
        {
          text: 'Shipment',
          icon: 'shipment',
          handler: () => {
            this.title = 'shipment';
            this.shipmentStatistics();
          },
        },
        {
          text: 'Booking',
          icon: 'booking',
          handler: () => {
            this.title = 'booking';
            this.workbenchService.GetBookingsStatistics().subscribe((res: any) => {
              let booked = 0;
              let booking = 0;
              res.models.forEach((element) => {
                if (element.status === 3) {
                  booked = element.count;
                } else {
                  booking = element.count;
                }
              });
              this.titleStatisticsList = [
                {
                  type: 'intransit',
                  name: '已订舱',
                  value: booked,
                },
                {
                  type: 'finished',
                  name: '待订舱',
                  value: booking,
                },
              ];
            });
          },
        },
        {
          text: 'Billing',
          icon: 'billing',
          handler: () => {
            this.title = 'billing';
            this.workbenchService.GetBillingsStatistics().subscribe((res: any) => {
              console.log(res);
              let payed = 0;
              let paying = 0;
              let delay = 0;
              res.models.forEach((element) => {
                if (element.status === 1) {
                  paying = element.count;
                } else if (element.status === 2) {
                  payed = element.count;
                } else if (element.status === 3) {
                  delay = element.count;
                }
              });
              this.titleStatisticsList = [
                {
                  type: 'intransit',
                  name: '已付',
                  value: payed,
                },
                {
                  type: 'finished',
                  name: '未付',
                  value: paying,
                },
                {
                  type: 'delay',
                  name: '逾期',
                  value: delay,
                },
              ];
            });
          },
        },
        // {
        //   text: 'Rates',
        //   icon: 'rates',
        //   handler: () => {
        //     this.title = 'shipment';
        //   },
        // },
      ],
    });
    await actionSheet.present();
  }
  /**
   * 点击图标
   *
   * @param {*} item
   * @memberof WorkbenchPage
   */
  typeClick(item) {
    if (item.type === 'rates') {
      this.searchTransportationCost = !this.searchTransportationCost;
      this.searchType = 'seachRates';
    } else if (item.type === 'sailingSchedules') {
      this.searchTransportationCost = !this.searchTransportationCost;
      this.searchType = 'seachSailingSchedules';
    } else {
      this.goRouter(item);
    }
  }
  /**
   * 导航到运单列表
   *
   * @memberof WorkbenchPage
   */
  searchConfirm() {
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
  /**
   * 启运港和目的港的地点搜索
   *
   * @param {*} type
   * @returns
   * @memberof WorkbenchPage
   */
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
  /**
   *
   *  从快捷入口删除
   * @param {*} event
   * @param {*} item
   * @param {*} index
   * @memberof WorkbenchPage
   */
  delete(event, item, index) {
    event.stopPropatgaion;
    this.quickEnterList.splice(index, 1);
    this.moreTypeList.push(item);
  }
  /**
   *  添加到快捷入口
   *
   * @param {*} event
   * @param {*} item
   * @param {*} index
   * @memberof WorkbenchPage
   */
  add(event, item, index) {
    event.stopPropatgaion;
    this.moreTypeList.splice(index, 1);
    this.quickEnterList.push(item);
  }

  goRouter(item) {
    this.nav.navigateForward(['/cityOcean/workbench/' + item.type]);
  }
}
