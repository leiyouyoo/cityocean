import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { CityOceanService } from '../../../city-ocean.service';

@Component({
  selector: 'app-rates-list-panel',
  templateUrl: './rates-list-panel.component.html',
  styleUrls: ['./rates-list-panel.component.scss'],
})
export class RatesListPanelComponent implements OnInit {
  @Input() rateListItem;
  constructor(private cityOceanService:CityOceanService) { }

  ngOnInit() {}
  getTime(time) {
    if(!time){return ''}
    return moment(time).format('MMM D YYYY');
  }
   getTT(item) {
    if (!item) {
      return 0;
    }
    let dateSpan, iDays;
    dateSpan = Date.parse(item.fromDate) - Date.parse(item.toDate);
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays;
  }
  // 客服
  chatWithCustomer(event) {
    event.stopPropagation();
    this.cityOceanService.chatWithCustomerService();
  }
}
