import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillingPageRoutingModule } from './billing-routing.module';

import { BillingPage } from './billing.page';
import { BillingPopoverComponent } from './billing-popover/billing-popover.component';
import { BankAccountComponent } from './bank-account/bank-account.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillingPageRoutingModule
  ],
  declarations: [BillingPage,BillingPopoverComponent,BankAccountComponent ],
  entryComponents:[BillingPopoverComponent,BankAccountComponent]
})
export class BillingPageModule {}
