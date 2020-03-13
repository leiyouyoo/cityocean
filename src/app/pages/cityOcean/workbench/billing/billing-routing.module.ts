import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillingPage } from './billing.page';

const routes: Routes = [
  {
    path: '',
    component: BillingPage
  },
  {
    path: 'billingDetail',
    loadChildren: () => import('./billiing-detail/billiing-detail.module').then( m => m.BilliingDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingPageRoutingModule {}
