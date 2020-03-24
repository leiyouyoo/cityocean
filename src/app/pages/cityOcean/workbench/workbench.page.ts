import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, ModalController } from '@ionic/angular';
import { SearchlocaltionComponent } from '../home/search-localtion/search-localtion.component';
import { WorkbenchService } from './workbench.service';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from '../home/home.service';
import { QuickEnterComponent } from './quick-enter/quick-enter.component';
import { CityOceanService } from '../city-ocean.service';

@Component({
  selector: 'app-workbench',
  templateUrl: 'workbench.page.html',
  styleUrls: ['workbench.page.scss'],
})
export class WorkbenchPage implements OnInit {
  typeList: any;
  quickEnterList = []; // 已添加到快捷入口的数据

  title: any;
  titleStatisticsList: any;
  @ViewChild('quickEnter', { static: false }) quickEnter: QuickEnterComponent;
  isLoginWithTourist = this.cityOceanService.getIsLoginWithTourist();
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
    private cityOceanService: CityOceanService,
  ) {}
  ionViewDidEnter() {
    this.typeList = abp.nav.menus.MainMenu.items;
    this.typeList.forEach((e) => {
      if (e.name === 'MBillings') {
        e.type = 'billing';
      } else if (e.name === 'MBookings') {
        e.type = 'booking';
      } else if (e.name === 'MShipments') {
        e.type = 'shipments';
      }
    });
    this.title = this.translate.instant('Shipments');
    this.titleStatisticsList = [
      {
        type: 'intransit',
        name: this.translate.instant('In transit'),
        value: 0,
      },
      {
        type: 'finished',
        name: this.translate.instant('Arrival port'),
        value: 0,
      },
    ];
  }

  ngOnInit(): void {}
  ionViewWillEnter() {
    this.shipmentStatistics();
    this.homeService.getMyFavorites().subscribe((res) => {
      this.quickEnterList = res;
    });
  }
  confirm() {
    this.quickEnter.confirm();
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
            name: this.translate.instant('In transit'),
            value: inProgress,
          },
          {
            type: 'finished',
            name: this.translate.instant('Arrival port'),
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
      header: this.translate.instant('Business Data'),
      cssClass: 'my-action-sheet',
      buttons: [
        {
          text: this.translate.instant('Shipments'),
          icon: 'shipment',
          handler: () => {
            this.title = this.translate.instant('Shipments');
            this.shipmentStatistics();
          },
        },
        {
          text: this.translate.instant('Bookings'),
          icon: 'booking',
          handler: () => {
            this.title = this.translate.instant('Bookings');
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
                  name: this.translate.instant('Booked'),
                  value: booked,
                },
                {
                  type: 'finished',
                  name: this.translate.instant('To be booked'),
                  value: booking,
                },
              ];
            });
          },
        },
        {
          text: this.translate.instant('Billings'),
          icon: 'billing',
          handler: () => {
            this.title = this.translate.instant('Billings');
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
                  name: this.translate.instant('Paid'),
                  value: payed,
                },
                {
                  type: 'finished',
                  name: this.translate.instant('unpaid'),
                  value: paying,
                },
                {
                  type: 'delay',
                  name: this.translate.instant('Overdue'),
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
    if (this.clickLoginWithTourist(item.type)) {
      return;
    }
    if (item.type === 'rates') {
      this.searchTransportationCost = true;
      this.searchType = 'seachRates';
    } else if (item.type === 'sailingSchedules') {
      this.searchTransportationCost = true;
      this.searchType = 'searchSailingSchedules';
    } else {
      this.goRouter(item);
    }
  }
  /**
   * 游客模式询问是否去登录页
   *
   * @param {*} type
   * @returns {boolean}
   * @memberof WorkbenchPage
   */
  clickLoginWithTourist(type): boolean {
    if (this.cityOceanService.getIsLoginWithTourist()) {
      if (type != 'sailingSchedules' && type != 'shipments') {
        this.cityOceanService.chatWithCustomerService();
        return true;
      }
    }
  }
  /**
   * 导航到运价或船期列表
   *
   * @memberof WorkbenchPage
   */
  searchConfirm() {
    if (!this.orignPort.id || !this.deliveryPort.id) {
      return;
    }
    this.cityOceanService.setRatesOrSailSearchHistory(this.searchType, this.orignPort, this.deliveryPort);
    if (this.searchType === 'seachRates') {
      this.nav.navigateForward(['/cityOcean/workbench/rates'], {
        queryParams: {
          orignPortId: this.orignPort.id,
          orignPortName: this.orignPort.name,
          deliveryPortId: this.deliveryPort.id,
          deliveryPortName: this.deliveryPort.name,
          routeBackType: 'workbench',
        },
      });
    } else if (this.searchType === 'searchSailingSchedules') {
      this.nav.navigateForward(['/cityOcean/workbench/sailingSchedules'], {
        queryParams: {
          orignPortId: this.orignPort.id,
          deliveryPortId: this.deliveryPort.id,
          routeBackType: 'workbench',
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

  goRouter(item) {
    this.nav.navigateForward(['/cityOcean/workbench/' + item.type], {
      queryParams: {
        routeBackType: 'workbench',
      },
    });
  }
}
