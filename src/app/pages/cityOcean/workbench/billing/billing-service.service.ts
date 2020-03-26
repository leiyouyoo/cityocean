import { Injectable } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { GetAllBillingInput } from './class/GetAllBillingInput';

@Injectable({
  providedIn: 'root',
})
export class BillingServiceService {
  constructor(public http: HttpService) {}

  /**
   * 获取billing列表
   * @param input
   * @return Success
   */
  getAllBilling(input: GetAllBillingInput) {
    const url = '/CSP/Billing/GetBillList';
    return this.http.get(url, input);
  }
  /**
   *获取billing详情
   *
   * @param {string} id
   * @returns
   * @memberof BillingServiceService
   */
  getBillingDetail(id: string) {
    return this.http.get('/CSP/Billing/GetBill', { id });
  }
  /**
   * 获取银行账户
   *
   * @param {string} id
   * @returns
   * @memberof BillingServiceService
   */
  GetBankAccount(BillId: string) {
    return this.http.get('/CSP/Billing/GetBankAccount', { BillId });
  }

  GetBillingListByIds(input: Array<any>) {
    return this.http.postJson('/CSP/Billing/GetListByIds', input);
  }
}
