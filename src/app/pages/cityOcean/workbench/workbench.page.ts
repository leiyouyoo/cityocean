import { Component } from '@angular/core';
import { NavController, ActionSheetController, ModalController } from '@ionic/angular';
import { SearchlocaltionComponent } from '../home/search-localtion/search-localtion.component';

@Component({
  selector: 'app-workbench',
  templateUrl: 'workbench.page.html',
  styleUrls: ['workbench.page.scss'],
})
export class WorkbenchPage {
  typeList = [
    // 所有业务类型
    {
      name: '运价',
      type: 'rates',
      checked: false,
    },
    {
      name: '船期',
      type: 'sailingSchedules',
      checked: false,
    },
    {
      name: '运单',
      type: 'shipment',
      checked: false,
    },
    {
      name: '订单',
      type: 'booking',
      checked: false,
    },
    {
      name: '报价',
      type: 'quotes',
      checked: false,
    },
    {
      name: '账单',
      type: 'billing',
      checked: false,
    },
  ];
  quickEnterList = [
    // 已添加到快捷入口的数据
    {
      name: '运价',
      type: 'rates',
      checked: false,
    },
    {
      name: '船期',
      type: 'sailingSchedules',
      checked: false,
    },
    {
      name: '运单',
      type: 'shipment',
      checked: false,
    },
    {
      name: '订单',
      type: 'booking',
      checked: false,
    },
  ];
  moreTypeList = [
    // 还未添加到快捷入口的数据
    {
      name: '账单',
      type: 'billing',
      checked: false,
    },
    {
      name: '报价',
      type: 'quotes',
      checked: false,
    },
  ];
  searchTransportationCost = false; // 搜索展示
  isEditing = false; // 控制是否添加快捷入口
  orignPort: any = {}; //启运港
  deliveryPort: any = {}; //目的港
  searchType = 'seachRates'; //  当前查询类别
  constructor(
    private nav: NavController,
    public actionSheetController: ActionSheetController,
    private modalController: ModalController,
  ) {}
  ionViewWillEnter() {}
  confirm() {
    let selectedList = this.typeList.filter((e) => {
      return e.checked;
    });
    console.log(selectedList);
  }
  /**
   *更换当前data数据
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
            console.log('Play clicked');
          },
        },
        {
          text: 'Booking',
          icon: 'booking',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
        {
          text: 'Billing',
          icon: 'billing',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
        {
          text: 'Rates',
          icon: 'rates',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }
  /**
   *点击图标
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
      if (searchLocalStorage.length >= 10) {
        searchLocalStorage.shift();
      }
      searchLocalStorage.push(local);
      localStorage.setItem(this.searchType, JSON.stringify(searchLocalStorage));
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
