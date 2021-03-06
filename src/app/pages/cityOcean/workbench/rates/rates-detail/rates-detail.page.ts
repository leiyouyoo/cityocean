import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RatesService } from '../rates.service';
import * as moment from 'moment';
import { CityOceanService } from '../../../city-ocean.service';

@Component({
  selector: 'app-rates-detail',
  templateUrl: './rates-detail.page.html',
  styleUrls: ['./rates-detail.page.scss'],
})
export class RatesDetailPage implements OnInit {
  ratesDetail: any;
  AdditionalData: any;

  constructor(
    private nav: NavController,
    private ratesService: RatesService,
    private cityOceanService: CityOceanService,
  ) {}

  ngOnInit() {
    this.ratesDetail = this.cityOceanService.ratesDetail;
    if (this.cityOceanService.ratesDetail) {
      this.AdditionalData = this.cityOceanService.ratesDetail.chargesGroups[0];
    }
    console.log(this.ratesDetail);
  }
  goback() {
    // this.nav.navigateForward(['/cityOcean/workbench/rates']);
    window.history.back();
  }
  getTime(time) {
    if (!time) {
      return '';
    }
    return moment(time).format('YYYY/MM/DD');
  }
  segmentChanged($event) {
    this.onTableSelected($event);
  }
  onTableSelected(selected) {
    this.AdditionalData = null;
    this.ratesDetail.chargesGroups.forEach((r) => {
      if (r.freightCharges.containerCode === selected.detail.value) {
        this.AdditionalData = r;
      }
    });
  }
  getAllRate() {
    let total = 0;
    let currencyName = '';
    if (this.ratesDetail && this.ratesDetail.chargesGroups) {
      this.ratesDetail.chargesGroups.forEach((element) => {
        if (element.freightCharges.containerCode == this.AdditionalData.freightCharges.containerCode) {
          total += element.freightCharges.rate;
          currencyName = element.freightCharges.currencyName;
          if (element.originLocalUnitCharges) {
            element.originLocalUnitCharges.forEach((e) => {
              total += e.rate;
            });
          }
          if (element.deliveryLocalUnitCharges) {
            element.deliveryLocalUnitCharges.forEach((e) => {
              total += e.rate;
            });
          }
        }
      });
    }
    return currencyName + ' ' + total;
  }
  // 客服
  chatWithCustomer() {
    this.cityOceanService.chatWithCustomerService();
  }
}
