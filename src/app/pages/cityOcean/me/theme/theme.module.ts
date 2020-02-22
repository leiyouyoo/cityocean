import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ThemePage } from './theme.page';
import { ThemePageRoutingModule } from './theme-routing.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ThemePageRoutingModule
  ],
  declarations: [ThemePage]
})
export class ThemePageModule {}
