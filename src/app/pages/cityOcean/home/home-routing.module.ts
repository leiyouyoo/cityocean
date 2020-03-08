import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'shipments',
    loadChildren: () => import('../workbench/shipment/shipment.module').then( m => m.ShipmentPageModule)
  },{
    path: 'rates',
    loadChildren: () => import('../workbench/rates/rates.module').then( m => m.RatesPageModule)
  },
  {
    path: 'sailingSchedules',
    loadChildren: () => import('../workbench/sailing-schedules/sailing-schedules.module').then( m => m.SailingSchedulesPageModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('../workbench/booking/booking.module').then( m => m.BookingPageModule)
  },
  {
    path: 'billing',
    loadChildren: () => import('../workbench/billing/billing.module').then( m => m.BillingPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
