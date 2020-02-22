import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SailingDetailPageRoutingModule } from './sailing-detail-routing.module';

import { SailingDetailPage } from './sailing-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SailingDetailPageRoutingModule
  ],
  declarations: [SailingDetailPage]
})
export class SailingDetailPageModule {}
