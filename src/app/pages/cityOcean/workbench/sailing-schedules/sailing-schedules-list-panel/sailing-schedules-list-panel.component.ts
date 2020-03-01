import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-sailing-schedules-list-panel',
  templateUrl: './sailing-schedules-list-panel.component.html',
  styleUrls: ['./sailing-schedules-list-panel.component.scss'],
})
export class SailingSchedulesListPanelComponent implements OnInit {
  @Input() sailingSchedulesListItem;
  constructor() { }

  ngOnInit() {}
  getTime(time) {
    return moment(time).format('MMM D YYYY');
  }
}
