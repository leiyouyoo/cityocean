import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupMessagePage } from './group-message.page';

const routes: Routes = [
  {
    path: '',
    component: GroupMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupMessagePageRoutingModule {}
