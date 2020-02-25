import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyMessageServiceService {
  private messageSource = new Subject<string>();
  message$ = this.messageSource.asObservable();
  constructor() {}
  messageAction(name: any) {
    this.messageSource.next(name);
  }
}
