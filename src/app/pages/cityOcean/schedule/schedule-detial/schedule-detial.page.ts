import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { ScheduleService } from '@cityocean/basicdata-library/region/service/schedule.service';

@Component({
  selector: 'app-schedule-detial',
  templateUrl: 'schedule-detial.page.html',
  styleUrls: ['schedule-detial.page.scss'],
})
export class ScheduleDetialPage implements OnInit {
  id: number;
  data:any;
  constructor(public activeRoute: ActivatedRoute, public scheduleService: ScheduleService) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.id = Number(params.id);
      this.initData();
    });
  }

  initData() {
    this.scheduleService.get(this.id).subscribe((res) => {
      this.data = res;

    });
  }

  onDetial() {}
}
