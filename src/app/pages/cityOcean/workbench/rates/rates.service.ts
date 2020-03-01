import { Injectable, Input } from "@angular/core";
import { HttpService } from "@cityocean/common-library";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../../src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class RatesService {
  constructor(private httpService: HttpService, private http: HttpClient) {}

  geFreightRates(params) {
    
    // return this.httpService.postTest(
    //   "/Rates/OceanBaseItemService/QueryFreightRates",
    //   params
    // );
    return this.httpService.postJson(
      "/Rates/OceanBaseItemService/QueryFreightRates",
      params
    );
  }
}
