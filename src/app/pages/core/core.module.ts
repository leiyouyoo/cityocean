import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { AbpHttpConfiguration } from './http/response-interceptor.service';

const PROVIDES = [AbpHttpConfiguration];

@NgModule({
  declarations: [],
  imports: [SharedModule],
  providers: [...PROVIDES],
})
export class CoreModule {}
