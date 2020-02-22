import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingDetailPageRoutingModule } from './booking-detail-routing.module';

import { BookingDetailPage } from './booking-detail.page';
import { SharedModule } from '@shared';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    BookingDetailPageRoutingModule
  ],
  declarations: [BookingDetailPage]
})
export class BookingDetailPageModule {}
