import { Injectable } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(public http: HttpService) {}

  /*
  @title 获取港口列表
  */
  getAllScheduleList(searchMonth: string) {
    return this.http.get('/CSP/Schedule/GetAllScheduleList', { SearchMonth: searchMonth });
  }
}
