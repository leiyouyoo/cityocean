import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchedulePage } from './schedule.page';
import { SharedModule } from '@shared/shared.module';
import { ScheduleDetialPage } from './schedule-detial/schedule-detial.page';
import { ScheduleAddPage } from './schedule-add/schedule-add.page';
import { SchedulePageRoutingModule } from './schedule-routing.module';

const COMPONENTS = [ScheduleAddPage, ScheduleDetialPage];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    SchedulePageRoutingModule,
    RouterModule.forChild([{ path: '', component: SchedulePage }]),
  ],
  declarations: [SchedulePage, ...COMPONENTS],
  exports: [...COMPONENTS],
})
export class SchedulePageModule {}
