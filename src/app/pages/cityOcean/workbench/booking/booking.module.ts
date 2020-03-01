import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingPageRoutingModule } from './booking-routing.module';

import { BookingPage } from './booking.page';
import { BookingListPanelComponent } from './booking-list-panel/booking-list-panel.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BookingPageRoutingModule],
  declarations: [BookingPage, BookingListPanelComponent],
  entryComponents: [],
})
export class BookingPageModule {}
