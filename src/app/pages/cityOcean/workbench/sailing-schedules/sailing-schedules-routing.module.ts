import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SailingSchedulesPage } from './sailing-schedules.page';

const routes: Routes = [
  {
    path: '',
    component: SailingSchedulesPage
  },
  {
    path: 'sailingDetail',
    loadChildren: () => import('./sailing-detail/sailing-detail.module').then( m => m.SailingDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SailingSchedulesPageRoutingModule {}
