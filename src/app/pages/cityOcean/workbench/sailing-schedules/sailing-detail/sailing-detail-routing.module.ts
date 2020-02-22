import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SailingDetailPage } from './sailing-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SailingDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SailingDetailPageRoutingModule {}
