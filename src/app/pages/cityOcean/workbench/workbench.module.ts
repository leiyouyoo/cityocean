import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkbenchPage } from './workbench.page';
import { WorkbenchPageRoutingModule } from './workbench-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    WorkbenchPageRoutingModule,
    TranslateModule
  ],
  declarations: [WorkbenchPage],
  entryComponents:[]
})
export class WorkbenchPageModule {}
