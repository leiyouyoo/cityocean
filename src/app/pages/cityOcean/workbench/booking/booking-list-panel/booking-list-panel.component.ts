import { Component, OnInit, Input } from '@angular/core';
import { BookingStatusType } from '../class/booking-status-type';
import * as moment from 'moment';

@Component({
  selector: 'app-booking-list-panel',
  templateUrl: './booking-list-panel.component.html',
  styleUrls: ['./booking-list-panel.component.scss'],
})
export class BookingListPanelComponent implements OnInit {
  @Input() bookingListItem;
  statusType: typeof BookingStatusType = BookingStatusType; // 显示状态

  constructor() { }

  ngOnInit() {}
  getTime(time) {
    if(!time){return ''}
    return moment(time).format('MMM D YYYY');
  }
}
