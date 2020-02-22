import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatesDetailPageRoutingModule } from './rates-detail-routing.module';

import { RatesDetailPage } from './rates-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatesDetailPageRoutingModule
  ],
  declarations: [RatesDetailPage]
})
export class RatesDetailPageModule {}
