import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CalendarComponentOptions, DayConfig, CalendarModalOptions, CalendarOptions } from 'ion2-calendar';
import { ScheduleService } from '@cityocean/basicdata-library/region/service/schedule.service';
import { debug } from 'util';
import { EventService } from '@shared/helpers/event.service';
import { CityOceanService } from '../city-ocean.service';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: 'schedule.page.html',
  styleUrls: ['schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  isMore = false;
  date: string;
  type = 'js-date';
  options: any;
  msgData: any;
  constructor(
    private el: ElementRef,
    private eventService: EventService,
    public router: Router,
    public cityOceanService: CityOceanService,
    public nav: NavController,
    public schedule: ScheduleService,
  ) {}

  ngOnInit() {
    // 事件订阅
    this.eventService.event.on('Refresh', () => {
      this.initData(new Date());
    });
    this.initData(new Date());
  }

  initData(date) {
    // 默认获取当天详情
    const monthdeital =
      this.doHandleYear(new Date()) + '-' + this.doHandleMonth(new Date()) + '-' + this.doHandleDay(new Date());
    this.onGetDayDetial(monthdeital);
    // 获取本月列表
    let that = this;
    // tslint:disable-next-line: prefer-const
    let config: DayConfig[] = [];
    const options: CalendarComponentOptions = {
      from: new Date(2000, 0, 1),
      showToggleButtons: false,
      showMonthPicker: false,
      monthFormat: 'YYYY 年 MM 月',
      weekdays: ['天', '一', '二', '三', '四', '五', '六'],
      weekStart: 1,
    };
    const datedeital = this.doHandleYear(date) + '-' + this.doHandleMonth(date);
    this.schedule.getAllScheduleList(datedeital).subscribe((res: any) => {
      // tslint:disable-next-line: prefer-const
      let days = [];
      res.items.forEach((e) => {
        const startMonth = new Date(e.remindStartTime).getMonth();
        const startDay = new Date(e.remindStartTime).getDate();
        const endMonth = new Date(e.remindEndTime).getMonth();
        const endDay = new Date(e.remindEndTime).getDate();

        if (startMonth === endMonth) {
          for (let i = 0; i < 31; i++) {
            if (i >= startDay && i <= endDay) {
              days.push(i);
            }
          }
        } else if (endMonth > new Date(date).getMonth()) {
          for (let i = 0; i < 31; i++) {
            if (i >= startDay) {
              days.push(i);
            }
          }
        } else {
          for (let i = 0; i < 31; i++) {
            if (i <= endDay) {
              days.push(i);
            }
          }
        }
      });
      // 去重

      days = Array.from(new Set(days));
      // tslint:disable-next-line: prefer-const
      days.forEach((da, i) => {
        config.push({
          date: new Date(date.getFullYear(), date.getMonth(), days[i]),
          subTitle: `●`,
        });
      });
      options.daysConfig = config;
      that.options = options;
    });
  }

  onGetDayDetial(date) {
    this.schedule.getAllScheduleList(date).subscribe((res: any) => {
      this.msgData = res.items;
    });
  }

  doHandleYear(myDate) {
    const tYear = myDate.getFullYear();
    return tYear;
  }

  doHandleMonth(myDate) {
    const tMonth = myDate.getMonth();
    const mon = tMonth + 1;
    let m;
    if (mon.toString().length === 1) {
      m = '0' + mon;
    } else {
      m = mon;
    }
    return m;
  }

  doHandleDay(myDate) {
    const tDay = myDate.getDate();
    let d;
    if (tDay.toString().length === 1) {
      d = '0' + tDay;
    } else {
      d = tDay;
    }
    return d;
  }

  onScheduleDetial(id) {
    this.router.navigate(['/cityOcean/schedule/shceduleAdd'], {
      queryParams: { id: id },
    });
  }

  onScheduleAdd() {
    if (this.cityOceanService.getIsLoginWithTourist()) {
      this.cityOceanService.chatWithTourist();
      return;
    }

    this.router.navigate(['/cityOcean/schedule/shceduleAdd']);
  }

  onChange(data) {
    this.onGetDayDetial(data);
  }

  onShowMore() {
    if (this.el.nativeElement.querySelector('.small-calendar').style.height === '30em') {
      this.el.nativeElement.querySelector('.small-calendar').style.height = '11em';
    } else {
      this.el.nativeElement.querySelector('.small-calendar').style.height = '30em';
    }
  }
}
