import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { PopoverComponent } from './chat/my-popover/popover.component';
import { HomeService } from './home.service';
import { PressPopoverComponent } from './chat/press-popover/press-popover.component';
import { MessageRollingComponent } from 'src/app/components/message-rolling/message-rolling.component';
import { SharedModule } from '@shared';
import { MassageComponent } from './massage/massage.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, SharedModule],
  declarations: [HomePage, PopoverComponent, MessageRollingComponent, PressPopoverComponent,MassageComponent],
  entryComponents: [PopoverComponent, PressPopoverComponent],
  providers: [HomeService],
})
export class HomePageModule {}
