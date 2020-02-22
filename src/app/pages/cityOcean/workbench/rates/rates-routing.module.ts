import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatesPage } from './rates.page';

const routes: Routes = [
  {
    path: '',
    component: RatesPage
  },
  {
    path: 'ratesDetail',
    loadChildren: () => import('./rates-detail/rates-detail.module').then( m => m.RatesDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatesPageRoutingModule {}
