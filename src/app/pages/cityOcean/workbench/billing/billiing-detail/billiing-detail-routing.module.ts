import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BilliingDetailPage } from './billiing-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BilliingDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BilliingDetailPageRoutingModule {}
