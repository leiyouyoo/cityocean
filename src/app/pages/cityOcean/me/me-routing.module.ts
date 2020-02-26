import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MePage } from './me.page';

const routes: Routes = [
  {
    path: '',
    component: MePage,
  },
  {
    path: 'language',
    loadChildren: () => import('./language/language.module').then((m) => m.LanguagePageModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then((m) => m.AboutPageModule),
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then((m) => m.SettingPageModule),
  },
  {
    path: 'theme',
    loadChildren: () => import('./theme/theme.module').then((m) => m.ThemePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MePageRoutingModule {}
