import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterPage } from './register/register.page';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SsoRouteModule {}
