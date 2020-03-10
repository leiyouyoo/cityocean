import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { CityOceanService } from '../../../city-ocean.service';

@Component({
  selector: 'app-sailing-schedules-list-panel',
  templateUrl: './sailing-schedules-list-panel.component.html',
  styleUrls: ['./sailing-schedules-list-panel.component.scss'],
})
export class SailingSchedulesListPanelComponent implements OnInit {
  @Input() sailingSchedulesListItem;
  constructor(private cityOceanService:CityOceanService) { }

  ngOnInit() {}
  getTime(time) {
    if(!time){return ''}
    return moment(time).format('MMM D YYYY');
  }
  // 客服
  chatWithCustomer(event) {
    event.stopPropagation();
    this.cityOceanService.chatWithCustomerService();
  }
}
