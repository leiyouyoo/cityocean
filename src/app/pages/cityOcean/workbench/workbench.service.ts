import { Injectable } from '@angular/core';
import { HttpService } from '@cityocean/common-library';

@Injectable({
  providedIn: 'root'
})
export class WorkbenchService {

  constructor(private httpService: HttpService) { }
  GetShipmentsStatistics(){
    return this.httpService.get('/CSP/Shipment/GetShipmentsStatistics');
  }
  GetBookingsStatistics() {
    return this.httpService.get('/CSP/Booking/GetBookingsStatistics');
  }
  GetBillingsStatistics(){
    return this.httpService.get('/CSP/Billing/GetBillingsStatistics');
  }
}
