import { Injectable } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { GetAllBillingInput } from './class/GetAllBillingInput';

@Injectable({
  providedIn: 'root'
})
export class BillingServiceService {
  constructor(public http: HttpService) {
  }

  /**
   * @param input
   * @return Success
   */
  getAllBilling(input: GetAllBillingInput) {
    const url = '/CSP/Billing/GetBillList';
    return this.http.get(url, input);
  }
  getBillingDetail(id: number) {
    return this.http.get('/CSP/Billing/GetBill', { id });
  }
}
