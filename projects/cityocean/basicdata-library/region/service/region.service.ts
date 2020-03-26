import { Injectable } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { Observable } from 'rxjs';

interface CreateInfo {}

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  constructor(private http: HttpService) {}
  //获取地区信息
  getRegionInfo(obj?: any): Observable<any> {
    let params = obj; //{ Code:code, Name:name,ParentId:parentId,IsValid:isValid,IsRecursion:isRecursion }
    return this.http.get('/PUB/Region/GetAll', params);
  }

  get(id: string): Observable<any> {
    return this.http.get('/PUB/Region/Get', { id });
  }

  /*创建或者更新地域信息 */
  createRegionInfo(params): Observable<any> {
    return this.http.postJson('/PUB/Region/CreateOrUpdate', params);
  }
}
