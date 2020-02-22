import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { RatesFilterComponent } from './rates-filter/rates-filter.component';
import { RatesService } from './rates.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.page.html',
  styleUrls: ['./rates.page.scss'],
})
export class RatesPage implements OnInit {
  ratesList = [];
  deliveryPortId: any; //目的港id
  orignPortId: any; //启运港id
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
      this.orignPortId = data.orignPortId;
      this.deliveryPortId = data.deliveryPortId;
    });
  }

  ngOnInit() {
    this.getRatesList();
  }
  getRatesList(event?) {
    let param = {
      // "orignLocationId": this.orignPortId,
      orignPortId: [this.orignPortId],
      deliveryPortId: [this.deliveryPortId],
      // "deliveryLocationId": this.deliveryPortId,
      maxResultCount: this.pageInfo.maxResultCount,
      skipCount: this.pageInfo.skipCount
    };
    // let param = {
    //   // "carrierId": 32761,
    //   "ratesValidDays": 7,
    //   "orignPortId": [
    //     16768
    //   ],
    //   "deliveryPortId": [
    //     13574
    //   ],
    // }
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
    window.history.back();
  }
  gotoRatesDetail(item) {
    this.nav.navigateForward(['/cityOcean/workbench/rates/ratesDetail'], {
      queryParams: {},
    });
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
    });
    modal.onWillDismiss().then((res) => {
      let params = {};
      this.pageInfo = {
        maxResultCount : 5,
        skipCount:0,
      }
      if (res.data.cy) {
      }
    });
    return await modal.present();
  }
}
