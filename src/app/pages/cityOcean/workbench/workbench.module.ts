import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkbenchPage } from './workbench.page';
import { WorkbenchPageRoutingModule } from './workbench-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { WorkbenchService } from './workbench.service';
import { QuickEnterComponent } from './quick-enter/quick-enter.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    WorkbenchPageRoutingModule,
    TranslateModule
  ],
  declarations: [WorkbenchPage,QuickEnterComponent],
  entryComponents:[],
  providers:[WorkbenchService]
})
export class WorkbenchPageModule {}
