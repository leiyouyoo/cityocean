import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { MyShipmentService } from './shipment.service';
import { ShipmentFilterComponent } from './shipment-filter/shipment-filter.component';
import { ShipmentStatusType } from './class/shipment-status-type';
import * as moment from 'moment';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.page.html',
  styleUrls: ['./shipment.page.scss'],
})
export class ShipmentPage implements OnInit {
  pageInfo = {
    maxResultCount: 5,
    skipCount: 0,
  };
  searchText = '';
  shipmentsList = [];
  statusType: typeof ShipmentStatusType = ShipmentStatusType;
  currentParams: any = {};
  constructor(
    private nav: NavController,
    private myShipmentService: MyShipmentService,
    private modalController: ModalController,
  ) {}

  ngOnInit() {
    this.getShipmentList();
  }
  /**
   *
   *
   * @param {*} params
   * @param {*} [event]  下拉参数
   * @memberof ShipmentPage
   */
  getShipmentList(event?) {
    this.searchText ? this.currentParams.searchText = this.searchText:delete this.currentParams.searchText;
    this.currentParams.MaxResultCount = this.pageInfo.maxResultCount;
    this.currentParams.SkipCount = this.pageInfo.skipCount * this.pageInfo.maxResultCount;
    this.myShipmentService.GetAll(this.currentParams).subscribe((res) => {
      console.log(res);
      event && event.target.complete(); //告诉ion-infinite-scroll数据已经更新完成
      this.shipmentsList = this.shipmentsList.concat(res.items);
      this.pageInfo.skipCount++;
      if (this.shipmentsList.length >= res.totalCount && event) {
        // 已加载全部数据，禁用上拉刷新
        event.target.disabled = true;
      }
    });
  }
  resetFilter(){
    this.shipmentsList = [];
    this.getShipmentList()
  }
  getTime(time) {
    return moment(time).format('MMM D YYYY');
  }
  goback() {
    this.nav.navigateForward(['/cityOcean/workbench']);
  }
  gotoShipmentDetail(item) {
    this.nav.navigateForward(['/cityOcean/workbench/shipment/shipmentDetail'], {
      queryParams: { id: item.id, agreement: item.agreement },
    });
  }
  async shipmentFilter(type) {
    const modal = await this.modalController.create({
      component: ShipmentFilterComponent,
    });
    modal.onWillDismiss().then((res) => {
      console.log(res);
      this.pageInfo = {
        maxResultCount: 5,
        skipCount: 0,
      };
      this.currentParams  = {};
      if (res.data) {
        this.currentParams = res.data;
        this.resetFilter()
      }
    });
    return await modal.present();
  }
}
