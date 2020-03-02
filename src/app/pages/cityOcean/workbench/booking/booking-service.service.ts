import { Injectable } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor( public http: HttpService) { }
  
  GetAllBookingList(json: { IsEnglish?:boolean,ShipmentType?:any,FreightMethodType?:string,SearchKey?: string,TradeType?:any, BookingStatus?: string, Sorting?: string, MaxResultCount?: number, SkipCount?: number }) {
    return this.http.get('/CSP/Booking/GetAllList', json)
      .pipe(map((data: any) => {
        return data;
      }));
  }
 
  GetDetail(id: number) {
    return this.http.get('/CSP/Booking/Get', { id });
  }
  GetBookingListByIds(input: Array<number>) {
    return this.http.postJson('/CSP/Booking/GetListByIds', input);
  }
  
}
