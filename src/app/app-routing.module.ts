import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: 'guide', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/sso/sso.web.module').then( m => m.SsoWebModule)
  },
  {
    path: 'guide',
    loadChildren: () => import('./pages/guide/guide.module').then(m => m.GuidePageModule)
  },
  {
    path: 'cityOcean',
    loadChildren: () => import('./pages/cityOcean/cityOcean.module').then(m => m.CityOceanPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
