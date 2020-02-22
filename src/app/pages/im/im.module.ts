import { NgModule } from '@angular/core';
// import { ImRoutingModule } from './im.routing.module';
import { SharedModule } from '../../shared';
import { messagePipe } from './pipe/message.pipe';

const components = [
];

const pipes = [
  messagePipe
];

const modules = [
];

const service = [

];

@NgModule({
  declarations: [
    ...components,
    ...pipes
  ],
  imports: [
    SharedModule,
    // ImRoutingModule,
    ...modules
  ],
  exports: [
    ...components,
    ...pipes
  ],
  providers: [
    ...service
  ]
})
export class ImModule { }
