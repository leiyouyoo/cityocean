import { Injectable } from '@angular/core';
import { HttpService } from "@cityocean/common-library";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class locationLibraryService {
  constructor(private http: HttpService) { }

  getLocationByNames(name: string): Observable<any> {
    let params = { Name: name }
    return this.http.get('/PUB/Location/GetAll', params);
  }
  //获取港口列表
  GetAllPort(locationObj: { Name?: string, RegionId?: number, IsOcean?: boolean, IsAir?: boolean, IsOther?: boolean, IsValid?: boolean, Sorting?: string, MaxResultCount?: number, SkipCount?: number }) {
    let params = locationObj;
    let url = "/PUB/Place/GetAll"
    return this.http.get(url, params);
  }

  //#region 获取字典列表
  GetAllDictionary(dic: { Code?: string, Name?: string, TypeId?: number, IsValid?: boolean }) {
    let params = dic;
    let url = "/PUB/DataDictionary/GetAll"
    return this.http.get(url, params);
  }
  //#endregion

  //获取地点列表
  getAllLocation() {
    return this.http.get('/CSP/PartnerLocation/GetShareAll');
  }
  
  //获取发货人 收货人信息
  getAllTenentLocation(){
    return this.http.get('/CSP/TenantLocation/GetAllLocation');
  }


}
