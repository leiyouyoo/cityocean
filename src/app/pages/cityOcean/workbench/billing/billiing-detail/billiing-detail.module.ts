import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BilliingDetailPageRoutingModule } from './billiing-detail-routing.module';

import { BilliingDetailPage } from './billiing-detail.page';
import { SharedModule } from '@shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    BilliingDetailPageRoutingModule
  ],
  declarations: [BilliingDetailPage]
})
export class BilliingDetailPageModule {}
