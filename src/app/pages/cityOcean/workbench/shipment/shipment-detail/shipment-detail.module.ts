import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AmapLibraryModule } from '@cityocean/amap-library';

import { ShipmentDetailPageRoutingModule } from './shipment-detail-routing.module';

import { ShipmentDetailPage } from './shipment-detail.page';
import { SharedModule } from '@shared';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ShipmentDetailPageRoutingModule, SharedModule, AmapLibraryModule],
  declarations: [ShipmentDetailPage],
})
export class ShipmentDetailPageModule {}
