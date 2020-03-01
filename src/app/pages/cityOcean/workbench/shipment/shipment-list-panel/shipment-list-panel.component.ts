import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { ShipmentStatusType } from '../class/shipment-status-type';

@Component({
  selector: 'app-shipment-list-panel',
  templateUrl: './shipment-list-panel.component.html',
  styleUrls: ['./shipment-list-panel.component.scss'],
})
export class ShipmentListPanelComponent implements OnInit {
  @Input() shipmentListItem;
  statusType: typeof ShipmentStatusType = ShipmentStatusType;

  constructor() {}

  ngOnInit() {}
  getTime(time) {
    return moment(time).format('MMM D YYYY');
  }
}
