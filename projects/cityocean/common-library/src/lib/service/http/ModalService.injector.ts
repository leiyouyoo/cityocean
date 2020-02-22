import {InjectionToken} from '@angular/core';

export const MODAL_SERVICE = new InjectionToken('modal service');

export class ModalService {
  constructor(...args: any[]) {}

  error(options: any) {}
}

