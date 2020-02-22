import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityOceanPage } from './cityOcean.page';

const routes: Routes = [
  {
    path: '',
    component: CityOceanPage,
    children: [
      {
        path: 'schedule',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./schedule/schedule.module').then(m => m.SchedulePageModule)
          }
        ]
      },
      {
        path: 'workbench',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./workbench/workbench.module').then(m => m.WorkbenchPageModule)
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'contacts',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./contacts/contacts.module').then(m => m.ContactsPageModule)
          }
        ]
      },
      {
        path: 'me',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./me/me.module').then(m => m.MePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/cityOcean/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/cityOcean/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityOceanPageRoutingModule {}
