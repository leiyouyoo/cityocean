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
import { CalendarModule } from 'ion2-calendar';
import { ScheduleEditComponent } from './schedule-add/schedule-edit-component/schedule-edit.component';
import { ScheduleAddEditComponent } from './schedule-add/edit/schedule-add-edit.component';

const COMPONENTS = [ScheduleAddPage, ScheduleDetialPage, ScheduleEditComponent, ScheduleAddEditComponent];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    CalendarModule,
    SchedulePageRoutingModule,
    RouterModule.forChild([{ path: '', component: SchedulePage }]),
  ],
  entryComponents: [ScheduleEditComponent, ScheduleAddEditComponent],
  declarations: [SchedulePage, ...COMPONENTS],
  exports: [...COMPONENTS],
})
export class SchedulePageModule {}
