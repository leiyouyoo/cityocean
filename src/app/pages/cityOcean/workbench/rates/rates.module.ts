import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatesPageRoutingModule } from './rates-routing.module';

import { RatesPage } from './rates.page';
import { RatesFilterComponent } from './rates-filter/rates-filter.component';
import { RatesService } from './rates.service';
import { SharedModule } from '@shared';
import { RatesListPanelComponent } from './rates-list-panel/rates-list-panel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatesPageRoutingModule,
    SharedModule
  ],
  declarations: [RatesPage,RatesFilterComponent,RatesListPanelComponent],
  entryComponents:[RatesFilterComponent],
  providers:[RatesService]
})
export class RatesPageModule {}
