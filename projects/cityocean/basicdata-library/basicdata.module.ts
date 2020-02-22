import { NgModule } from '@angular/core';
import { RegionService } from './region/service/region.service';
import { SailService } from './region/service/sail.service';
import { locationLibraryService } from './region/service/location.service';

const services = [
  RegionService,
  SailService,
  locationLibraryService
];

@NgModule({
  declarations: [],
  imports: [

  ],
  exports: [],
  providers: [
    ...services
  ]
})
export class BaseInfoModule {
  constructor() {
  }
}