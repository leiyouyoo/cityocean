import { Injectable } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SailService {
  constructor(
    public http: HttpService,
  ) { }

  /*
  @title 获取船期数据
  */

  getSailingSchedules(json: { OrigPortId?: number, DestPortId?: number, CarrierCode?: Array<string>, ETD?: string, ETA?: string, MaxResultCount?: number, SkipCount?: number, Sorting?: string, Filter?: string, Quick?: number }) {
    return this.http.postJson('/PUB/SailingSchedules/QuerySailingSchedules', json);
  }

  /*
  @title 获取港口列表
  */
  getPortList() {
    return this.http.get('/PUB/SailingSchedules/GetPortList');
  }

  /*
  @title 获取船东列表
  */
  getCarrierList() {
    return this.http.get('/CRM/Customer/GetCustomerByType', { CustomerType: 1 })
      .pipe(
        map((o: any) => o.items)
      );
  }

}
