import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatesPageRoutingModule } from './rates-routing.module';

import { RatesPage } from './rates.page';
import { RatesFilterComponent } from './rates-filter/rates-filter.component';
import { RatesService } from './rates.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatesPageRoutingModule
  ],
  declarations: [RatesPage,RatesFilterComponent],
  entryComponents:[RatesFilterComponent],
  providers:[RatesService]
})
export class RatesPageModule {}
