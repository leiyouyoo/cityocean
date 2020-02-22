import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatesDetailPage } from './rates-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RatesDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatesDetailPageRoutingModule {}
