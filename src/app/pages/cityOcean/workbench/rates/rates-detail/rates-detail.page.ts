import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-rates-detail',
  templateUrl: './rates-detail.page.html',
  styleUrls: ['./rates-detail.page.scss'],
})
export class RatesDetailPage implements OnInit {

  constructor(private nav:NavController) { }

  ngOnInit() {
  }
  goback(){
    this.nav.navigateForward(['/cityOcean/workbench/rates']);
  }
  segmentButtonClicked($event){
    console.log($event)
  }
}
