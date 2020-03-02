import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GlobelSearchPage } from './globel-search.page';

const routes: Routes = [
  {
    path: '',
    component: GlobelSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobelSearchPageRoutingModule {}
