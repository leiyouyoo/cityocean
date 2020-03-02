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

  constructor(private nav:NavController,
    private ratesService:RatesService,
    private cityOceanService:CityOceanService) { }

  ngOnInit() {
    this.ratesDetail = this.ratesService.ratesDetail;
    this.AdditionalData= this.ratesService.ratesDetail.chargesGroups[0];
    console.log(this.ratesDetail)
  }
  goback(){
    // this.nav.navigateForward(['/cityOcean/workbench/rates']);
    window.history.back();
  }
  getTime(time) {
    return moment(time).format("YYYY/MM/DD");
  }
  segmentChanged($event){
    this.onTableSelected($event)
  }
  onTableSelected(selected) {
    this.AdditionalData = null;
    this.ratesDetail.chargesGroups.forEach((r) => {
      if (r.freightCharges.containerCode === selected.detail.value) {
        this.AdditionalData = r;
      }
    });
  }
  // 客服
  chatWithCustomer() {
    this.cityOceanService.chatWithCustomerService();
  }
}
