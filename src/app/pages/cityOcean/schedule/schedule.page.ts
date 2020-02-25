import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-schedule',
  templateUrl: 'schedule.page.html',
  styleUrls: ['schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  date = '2020-02-24';
  type = 'js-date';
  optionsMulti: CalendarComponentOptions = {
    monthFormat: 'YYYY 年 MM 月 ',
    weekdays: ['天', '一', '二', '三', '四', '五', '六'],
    weekStart: 1
  };
  constructor(public router: Router, public nav: NavController) {}

  ngOnInit() {}

  onScheduleDetial() {
    this.router.navigate(['/cityOcean/schedule/shceduleDetial']);
  }

  onScheduleAdd() {
    this.router.navigate(['/cityOcean/schedule/shceduleAdd']);
  }

  onChange() {}
}
