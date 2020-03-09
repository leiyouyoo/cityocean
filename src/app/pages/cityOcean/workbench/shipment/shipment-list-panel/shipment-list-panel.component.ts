import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { ShipmentStatusType } from '../class/shipment-status-type';
import { CityOceanService } from '../../../city-ocean.service';

@Component({
  selector: 'app-shipment-list-panel',
  templateUrl: './shipment-list-panel.component.html',
  styleUrls: ['./shipment-list-panel.component.scss'],
})
export class ShipmentListPanelComponent implements OnInit {
  @Input() shipmentListItem;
  statusType: typeof ShipmentStatusType = ShipmentStatusType;
  isLoginWithTourist: boolean;

  constructor(private cityOceanService:CityOceanService) {}

  ngOnInit() {
    if (this.cityOceanService.getIsLoginWithTourist()){
      this.isLoginWithTourist = true
    }
  }
  getTime(time) {
    if (!time) {
      return '';
    } else {
      return moment(time).format('MMM D YYYY');
    }
  }
  
}
