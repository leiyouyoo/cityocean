import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// #region third libs
import { CountdownModule } from 'ngx-countdown';
// import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AbpModule } from '@abp/abp.module';
import { TranslateModule } from '@ngx-translate/core';

// tslint:disable-next-line: no-use-before-declare
const THIRDMODULES = [CountdownModule, DragDropModule, AbpModule, TranslateModule];
// #endregion

// #region your componets & directives
import { AppNzPaginationDirective } from './directives/app-nz-pagination.directive';
import { ImgFailedDirective } from './directives/img-failed.directive';
import { environment } from '@env/environment';
import { TableCellTitleDirective } from './directives/table-cell-title.directive';
import { DebounceInputDirective } from './directives/DebounceInput.Directive';
import { ImModule } from '../pages/im/im.module';
import { ErrorBorderDirective } from './directives/error-border.directive';
import { BusinessTypeComponent } from '../components/business-type/business-type.component';
import { InputSearchComponent } from '../components/input-search/input-search.component';

import { ContactsComponent } from '../components/contacts/contacts.component';
import { IonicModule } from '@ionic/angular';
const COMPONENTS_ENTRY = [BusinessTypeComponent, InputSearchComponent, ContactsComponent];
const COMPONENTS = [...COMPONENTS_ENTRY];
const DIRECTIVES = [
  DebounceInputDirective,
  ImgFailedDirective,
  AppNzPaginationDirective,
  TableCellTitleDirective,
  ErrorBorderDirective,
];
const Pipes = [];
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    IonicModule,
    // third libs
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...Pipes,
  ],
  entryComponents: COMPONENTS_ENTRY,
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...Pipes,
  ],
})
export class SharedModule {
  constructor() {}
}
