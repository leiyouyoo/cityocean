import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RatesService } from '../rates.service';

@Component({
  selector: 'app-rates-detail',
  templateUrl: './rates-detail.page.html',
  styleUrls: ['./rates-detail.page.scss'],
})
export class RatesDetailPage implements OnInit {
  ratesDetail: any;

  constructor(private nav:NavController,
    private ratesService:RatesService) { }

  ngOnInit() {
    this.ratesDetail = this.ratesService.ratesDetail;
    console.log(this.ratesDetail)
  }
  goback(){
    // this.nav.navigateForward(['/cityOcean/workbench/rates']);
    window.history.back();
  }
  segmentChanged($event){
    console.log($event)
  }
}
