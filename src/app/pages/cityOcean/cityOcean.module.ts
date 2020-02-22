import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CityOceanPageRoutingModule } from './cityOcean-routing.module';

import { CityOceanPage } from './cityOcean.page';
import { TranslateModule } from '@ngx-translate/core';
import { SearchlocaltionComponent } from './home/search-localtion/search-localtion.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    CityOceanPageRoutingModule
  ],
  declarations: [CityOceanPage,SearchlocaltionComponent],
  entryComponents:[SearchlocaltionComponent]
})
export class CityOceanPageModule {}
