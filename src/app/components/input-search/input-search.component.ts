import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MyMessageServiceService } from 'src/app/pages/cityOcean/workbench/rates/message-service.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent implements OnInit {
  dataList = [];
  constructor(private popoverCtrl: PopoverController, private myMessageServiceService: MyMessageServiceService) {}

  ngOnInit() {
    this.myMessageServiceService.message$.subscribe((action: any) => (this.dataList = action));
  }
  dismiss(data) {
    this.popoverCtrl.dismiss(data);
  }
}
