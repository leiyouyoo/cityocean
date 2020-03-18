import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
interface BroadcastEvent {
  key: any;
  data?: any;
}
@Injectable({
  providedIn: 'root',
})

export class BroadcastService {
  private _eventBus: Subject<BroadcastEvent>;

  constructor() {
    this._eventBus = new Subject<BroadcastEvent>();
  }

  public broadcast(key: any, data?: any) {
    this._eventBus.next({ key, data });
  }

  public on<T>(key: any): Observable<T> {
    return this._eventBus.asObservable().pipe(
      filter((event) => event.key === key),
      map((event) => <T>event.data),
    );
  }
}
