import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkbenchPage } from './workbench.page';

const routes: Routes = [
  {
    path: '',
    component: WorkbenchPage
  },
  {
    path: 'shipment',
    loadChildren: () => import('./shipment/shipment.module').then( m => m.ShipmentPageModule)
  },{
    path: 'rates',
    loadChildren: () => import('./rates/rates.module').then( m => m.RatesPageModule)
  },
  {
    path: 'sailingSchedules',
    loadChildren: () => import('./sailing-schedules/sailing-schedules.module').then( m => m.SailingSchedulesPageModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then( m => m.BookingPageModule)
  },
  {
    path: 'billing',
    loadChildren: () => import('./billing/billing.module').then( m => m.BillingPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkbenchPageRoutingModule {}
