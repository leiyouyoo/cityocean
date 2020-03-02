import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingPageRoutingModule } from './booking-routing.module';

import { BookingPage } from './booking.page';
import { SharedModule } from '@shared';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BookingPageRoutingModule,SharedModule,],
  declarations: [BookingPage, ],
  entryComponents: [],
})
export class BookingPageModule {}
