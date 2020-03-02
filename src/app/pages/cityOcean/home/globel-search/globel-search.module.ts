import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GlobelSearchPageRoutingModule } from './globel-search-routing.module';

import { GlobelSearchPage } from './globel-search.page';
import { SharedModule } from '@shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlobelSearchPageRoutingModule,
    SharedModule
  ],
  declarations: [GlobelSearchPage]
})
export class GlobelSearchPageModule {}
