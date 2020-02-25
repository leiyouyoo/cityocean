import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CalendarComponentOptions, DayConfig, CalendarModalOptions } from 'ion2-calendar';
import { ScheduleService } from '@cityocean/basicdata-library/region/service/schedule.service';
import { debug } from 'util';

@Component({
  selector: 'app-schedule',
  templateUrl: 'schedule.page.html',
  styleUrls: ['schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  date: string;
  type = 'js-date';
  options: CalendarModalOptions = this.onSetCalendar();

  constructor(public router: Router, public nav: NavController, public schedule: ScheduleService) {}

  ngOnInit() {
    this.initData();
  }

  onSetCalendar() {
    // tslint:disable-next-line: prefer-const
    let config: DayConfig[] = [];
    for (let i = 0; i < 31; i++) {
      config.push({
        date: new Date(2020, 1, i + 1),
        subTitle: ``,
      });
    }
    const options = {
      format: 'YYYY-MM-DD',
      daysConfig: config,
    };

    return options;
  }

  initData() {
    const date = this.doHandleYear() + '-' + this.doHandleMonth();
    this.schedule.getAllScheduleList(date).subscribe((res) => {});
  }

  doHandleYear() {
    const myDate = new Date();
    const tYear = myDate.getFullYear();
    return tYear;
  }

  doHandleMonth() {
    const myDate = new Date();
    const tMonth = myDate.getMonth();

    const mon = tMonth + 1;
    let m;
    if (mon.toString().length === 1) {
      m = '0' + mon;
    }
    return m;
  }

  onScheduleDetial() {
    this.router.navigate(['/cityOcean/schedule/shceduleDetial']);
  }

  onScheduleAdd() {
    this.router.navigate(['/cityOcean/schedule/shceduleAdd']);
  }

  onChange(data) {
    debugger;
    // tslint:disable-next-line: prefer-const
    let config: DayConfig[] = [];
    for (let i = 0; i < 31; i++) {
      config.push({
        date: new Date(2020, 1, i + 1),
        subTitle: `111`,
      });
    }
    this.options = {
      format: 'yyyy年MM月',
      from: new Date(2020, 1, 1),
      to: new Date(2021, 11.1),
      daysConfig: config,
    };
  }
}
