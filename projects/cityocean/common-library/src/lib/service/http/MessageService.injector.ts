import {InjectionToken} from '@angular/core';

export const MESSAGE_SERVICE = new InjectionToken('message service');

export class MessageService {
  constructor(...args: any[]) {}

  error(content:any,options?: any) {}
}

