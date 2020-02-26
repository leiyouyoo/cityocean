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
    return this.http.get('/CSP/Schedule/GetAllScheduleList', { SearchMonthOrDay: searchMonth });
  }

  createAsync(data: any) {
    return this.http.postJson('/CSP/Schedule/CreateAsync', data);
  }

  updateAsync(data: any) {
    return this.http.put('/CSP/Schedule/UpdateAsync', data);
  }

  get(id: number) {
    return this.http.get('/CSP/Schedule/Get', { id: id });
  }

  delete(id: number) {
    return this.http.delete('/CSP/Schedule/Delete', { id: id });
  }
}
