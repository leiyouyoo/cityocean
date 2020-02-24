import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-schedule',
  templateUrl: 'schedule.page.html',
  styleUrls: ['schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  constructor(public router: Router, public nav: NavController) {}

  ngOnInit() {}

  onScheduleDetial() {
    this.router.navigate(['/cityOcean/schedule/shceduleDetial']);
  }

  onScheduleAdd() {
    this.router.navigate(['/cityOcean/schedule/shceduleAdd']);
  }
}
