import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ShipmentPageRoutingModule } from './shipment-routing.module';

import { ShipmentPage } from './shipment.page';
import { MyShipmentService } from './shipment.service';
import { ShipmentFilterComponent } from './shipment-filter/shipment-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShipmentPageRoutingModule,
    
  ],
  declarations: [ShipmentPage,ShipmentFilterComponent],
  entryComponents:[ShipmentFilterComponent],
  providers:[MyShipmentService]
})
export class ShipmentPageModule {}
