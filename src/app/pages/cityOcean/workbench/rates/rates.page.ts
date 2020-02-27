import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { RatesFilterComponent } from './rates-filter/rates-filter.component';
import { RatesService } from './rates.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { isArray } from 'lodash';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.page.html',
  styleUrls: ['./rates.page.scss'],
})
export class RatesPage implements OnInit {
  ratesList = [];
  currentParam: any = {
    orignPortId: [], //启运港id
    orignLocationId: '',
    deliveryPortId: [], //目的港id
    deliveryLocationId: '',
    carrierId: '',
    ratesValidDays: '7',
  };
  pageInfo = {
    maxResultCount: 5,
    skipCount: 0,
  };
  constructor(
    private nav: NavController,
    private modalController: ModalController,
    private ratesService: RatesService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.currentParam.orignPortId = [data.orignPortId];
      this.currentParam.deliveryPortId = [data.deliveryPortId];
    });
  }

  ngOnInit() {
    this.getRatesList();
  }
  getRatesList(event?) {
    let param = {
      maxResultCount: this.pageInfo.maxResultCount,
      skipCount: this.pageInfo.skipCount,
    };
    for (const key in this.currentParam) {
      if (this.currentParam.hasOwnProperty(key)) {
        if (isArray(this.currentParam[key])) {
          !this.currentParam[key][0] && delete this.currentParam[key];
        } else {
          !this.currentParam[key] && delete this.currentParam[key];
        }
      }
    }
    Object.assign(param, this.currentParam);
    this.ratesService.geFreightRates(param).subscribe((res: any) => {
      console.log(res);
      event && event.target.complete(); //告诉ion-infinite-scroll数据已经更新完成
      this.ratesList = this.ratesList.concat(res.items);
      this.pageInfo.skipCount++;
      if (this.ratesList.length >= res.totalCount && event) {
        // 已加载全部数据，禁用上拉刷新
        event.target.disabled = true;
      }
    });
  }
  goback() {
    this.nav.navigateForward(['/cityOcean/workbench']);
  }
  gotoRatesDetail(item) {
    this.nav.navigateForward(['/cityOcean/workbench/rates/ratesDetail'], {
      queryParams: {},
    });
  }
  getTime(time) {
    return moment(time).format('MMM D YYYY');
  }
  getTT(item) {
    if (!item) {
      return 0;
    }
    let dateSpan, iDays;
    dateSpan = Date.parse(item.fromDate) - Date.parse(item.toDate);
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays;
  }
  async ratesFilter(type) {
    const modal = await this.modalController.create({
      component: RatesFilterComponent,
      componentProps: {},
    });
    modal.onWillDismiss().then((res) => {
      if (!res.data) {
        return;
      }
      this.pageInfo = {
        maxResultCount: 5,
        skipCount: 0,
      };
      this.ratesList = [];
      this.currentParam.ratesValidDays = res.data.ratesValidDays;
      this.currentParam.orignLocationId = res.data.orignLocationId;
      this.currentParam.orignPortId = [res.data.orignPortId];
      this.currentParam.deliveryPortId = [res.data.deliveryPortId];
      this.currentParam.deliveryLocationId = res.data.deliveryLocationId;
      this.currentParam.carrierId = res.data.carrierId;
      this.getRatesList();
    });
    return await modal.present();
  }
}
