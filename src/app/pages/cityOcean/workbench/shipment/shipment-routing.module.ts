import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShipmentPage } from './shipment.page';

const routes: Routes = [
  {
    path: '',
    component: ShipmentPage
  },
  {
    path: 'shipmentDetail',
    loadChildren: () => import('./shipment-detail/shipment-detail.module').then( m => m.ShipmentDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipmentPageRoutingModule {}
