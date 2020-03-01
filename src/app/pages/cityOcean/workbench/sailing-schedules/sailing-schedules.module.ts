import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SailingSchedulesPageRoutingModule } from './sailing-schedules-routing.module';

import { SailingSchedulesPage } from './sailing-schedules.page';
import { SailingFilterComponent } from './sailing-filter/sailing-filter.component';
import { SailingSchedulesListPanelComponent } from './sailing-schedules-list-panel/sailing-schedules-list-panel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SailingSchedulesPageRoutingModule
  ],
  declarations: [SailingSchedulesPage,SailingFilterComponent,SailingSchedulesListPanelComponent ],
  entryComponents:[SailingFilterComponent]
})
export class SailingSchedulesPageModule {}
