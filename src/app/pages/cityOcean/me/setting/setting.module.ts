import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SettingPage } from './setting.page';
import { SettingPageRoutingModule } from './setting-routing.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SettingPageRoutingModule
  ],
  declarations: [SettingPage]
})
export class SettingPageModule {}
