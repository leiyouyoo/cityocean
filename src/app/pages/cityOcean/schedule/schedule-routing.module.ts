import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchedulePage } from './schedule.page';
import { ScheduleDetialPage } from './schedule-detial/schedule-detial.page';
import { ScheduleAddPage } from './schedule-add/schedule-add.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulePage,
  },
  {
    path: 'shceduleDetial',
    component: ScheduleDetialPage,
  },
  {
    path: 'shceduleAdd',
    component: ScheduleAddPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulePageRoutingModule {}
