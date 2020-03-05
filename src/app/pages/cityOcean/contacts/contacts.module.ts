import { IonicModule, NavParams } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactsPage } from './contacts.page';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: ContactsPage }]),
  ],
  declarations: [ContactsPage],
})
export class ContactsPageModule {}
