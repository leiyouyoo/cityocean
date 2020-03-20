import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { SsoRouteModule } from './sso.route.module';
import { LoginComponent } from './login/login.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerPhoneComponent } from './login/customer-phone/customer-phone.component';
import { RegisterPage } from './register/register.page';
const component = [LoginComponent, RegisterPage, CustomerPhoneComponent];
@NgModule({
  declarations: [...component],
  entryComponents: [CustomerPhoneComponent],
  imports: [SharedModule, SsoRouteModule, IonicModule, TranslateModule],
  exports: [...component],
})
export class SsoWebModule {}
