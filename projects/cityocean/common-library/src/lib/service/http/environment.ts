import {InjectionToken} from '@angular/core';

export const ENVIRONMENT = new InjectionToken('env');

export interface Environment {
  SERVER_URL: string;
}
