import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { WebLoaddingComponent } from './component/web/mobile-loadding/web-loadding.component';
import { MobileLoaddingComponent } from './component/mobile/mobile-loadding/mobile-loadding.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { OMSDatePipe } from './pipe/oms-date/oms-date.pipe';
import { FocusDirective } from './directive/focus/focus.directive';
import { CursorPositionDirective } from './directive/cursorPosition/cursorPosition.directive';
import { HttpService } from './service/http/http.service';
import { CommonService } from './service/common/common.service';
import {ENVIRONMENT, Environment} from './service/http/environment';
import {MESSAGE_SERVICE, MessageService} from './service/http/MessageService.injector';
import { FormvalidationComponent } from './component/formvalidation/formvalidation.component';
import {JWTInterceptor} from '@delon/auth';

const Components = [
  WebLoaddingComponent,
  MobileLoaddingComponent,
  FormvalidationComponent,
];
const Directives = [
  FocusDirective,
  CursorPositionDirective,
];
const Pipes = [
  // OMSDatePipe,
];
const Modules = [
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
];

@NgModule({
  declarations: [
    ...Components,
    ...Directives,
    ...Pipes
  ],
  imports: [
    ...Modules
  ],
  exports: [
    ...Components,
    ...Directives,
    ...Pipes,
    ...Modules
  ],
  providers: [
    CommonService,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }
  ]
})
export class CommonLibraryModule {
  static forRoot(config: { messageService?: typeof MessageService, environment: Environment } ): ModuleWithProviders {
    return {
      ngModule: CommonLibraryModule,
      providers: [
        { provide: ENVIRONMENT, useValue: config.environment },
        { provide: MESSAGE_SERVICE, useExisting: config.messageService },
      ],
    };
  }
}


// export service
export * from './service/http/http.service';
export * from './service/common/common.service';
export * from './service/formvalid/formvalid.service';



