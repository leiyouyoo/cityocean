import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { SsoRouteModule } from './sso.route.module';
import { LoginComponent } from './login/login.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
const component = [
  LoginComponent,
]
@NgModule({
  declarations: [
    ...component,
  ],
  imports: [
    SharedModule,
    SsoRouteModule,
    IonicModule,
    TranslateModule
  ],
  exports: [
    ...component
  ]
})
export class SsoWebModule { }
