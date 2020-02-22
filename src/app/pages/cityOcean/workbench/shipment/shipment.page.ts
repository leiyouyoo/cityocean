import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ShipmentService } from './shipment.service';
import { ShipmentFilterComponent } from './shipment-filter/shipment-filter.component';
import { StatusType } from './class/status-type';
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
  shipmentsList = [];
  statusType: typeof StatusType = StatusType;
  constructor(
    private nav: NavController,
    private shipmentService: ShipmentService,
    private modalController: ModalController,
  ) {}

  ngOnInit() {
    this.getShipmentList({});
  }
  /**
   *
   *
   * @param {*} params
   * @param {*} [event]  下拉参数
   * @memberof ShipmentPage
   */
  getShipmentList(params, event?) {
    params.MaxResultCount = this.pageInfo.maxResultCount;
    params.SkipCount = this.pageInfo.skipCount * this.pageInfo.maxResultCount;
    this.shipmentService.GetAll(params).subscribe((res) => {
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
  getTime(time) {
    return moment(time).format('MMM D YYYY');
  }
  goback() {
    window.history.back();
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
        maxResultCount : 5,
        skipCount:0,
      }
      this.shipmentsList = [];
      this.getShipmentList(res.data);
    });
    return await modal.present();
  }
}
