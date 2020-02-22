import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rates-detail',
  templateUrl: './rates-detail.page.html',
  styleUrls: ['./rates-detail.page.scss'],
})
export class RatesDetailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  goback(){
    window.history.back()
  }
  segmentButtonClicked($event){
    console.log($event)
  }
}
