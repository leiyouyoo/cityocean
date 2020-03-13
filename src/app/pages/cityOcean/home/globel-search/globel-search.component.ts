import { Component, OnInit, Input } from '@angular/core';
import { BillingServiceService } from '../../workbench/billing/billing-service.service';
import { MyShipmentService } from '../../workbench/shipment/shipment.service';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BookingServiceService } from '../../workbench/booking/booking-service.service';
import { CityOceanService } from '../../city-ocean.service';

@Component({
  selector: 'app-globel-search',
  templateUrl: './globel-search.component.html',
  styleUrls: ['./globel-search.component.scss'],
})
export class GlobelSearchComponent implements OnInit {
  billingData: any = {};
  shipmentData: any= {};
  searchKey = '';
  page = {
    pageSize: 5,
    pageIndex: 1,
  };
  searchHistoryList: any = [];
  bookingData: any= {};
  isLoginWithTourist = this.cityOceanService.getIsLoginWithTourist();
  globelSearchHistoryKey = '';
  constructor(
    private billingService: BillingServiceService,
    private shipmentService: MyShipmentService,
    private bookingServiceService: BookingServiceService,
    private nav: NavController,
    private modalController: ModalController,
    private cityOceanService: CityOceanService,
  ) {}

  ngOnInit() {
    if (this.isLoginWithTourist) {
      this.globelSearchHistoryKey = 'visitorGlobelSearchHistory';
    } else {
      this.globelSearchHistoryKey = 'globelSearchHistory';
    }
    let searchHistory = JSON.parse(localStorage.getItem(this.globelSearchHistoryKey));
    if (searchHistory) {
      this.searchHistoryList = searchHistory;
    }
  }
  filterConfirm(data?) {
    if (data) {
      this.searchKey = data;
    }
    if (!this.searchKey) {
      this.delete();
      return;
    }

    this.searchBilling();
    this.searchShipment();
    this.searchBooking();
  }
  delete() {
    this.searchKey = '';
    this.billingData = [];
    this.shipmentData = [];
    this.bookingData = [];
  }
  deleteHistory() {
    localStorage.removeItem(this.globelSearchHistoryKey);
    this.searchHistoryList = [];
  }
  goback() {
    // this.nav.navigateForward(['/cityOcean/home']);
    this.modalController.dismiss();
  }
  searchBilling() {
    if (!this.isLoginWithTourist) {
      this.billingService
        .getAllBilling({ maxResultCount: this.page.pageSize, ShipmentId: this.searchKey } as any)
        .subscribe((data) => {
          this.billingData = data as any;
        });
    }
  }
  searchBooking() {
    if (!this.isLoginWithTourist) {
      this.bookingServiceService
        .GetAllBookingList({ maxResultCount: this.page.pageSize, searchKey: this.searchKey } as any)
        .subscribe((data) => {
          this.bookingData = data as any;
        });
    }
  }
  gotoBookingDetail(item) {
    this.setHistory();
    this.modalController.dismiss();
    this.nav.navigateForward(['/cityOcean/workbench/booking/bookingDetail'], {
      queryParams: { id: item.id },
    });
  }
  gotoBillingDetail(item) {
    this.setHistory();
    this.modalController.dismiss();
    this.nav.navigateForward(['/cityOcean/workbench/billing/billingDetail'], {
      queryParams: { id: item.id },
    });
  }
  searchShipment() {
    if (!this.isLoginWithTourist) {
      this.shipmentService
        .GetAll({ MaxResultCount: this.page.pageSize, searchText: this.searchKey })
        .subscribe((data: any) => {
          this.shipmentData = data;
        });
    } else {
      this.cityOceanService.GetRouteDetailsByShipmentNo(String(this.searchKey)).subscribe((res: any) => {
        this.shipmentData['items'] = [res];
        this.shipmentData.totalCount = 1;
      });
    }
  }
  gotoShipmentDetail(item) {
    this.setHistory();
    this.modalController.dismiss();
    this.nav.navigateForward(['/cityOcean/workbench/shipments/shipmentDetail'], {
      queryParams: { id: item.id, agreement: item.agreement },
    });
  }
  setHistory() {
    if (this.searchKey) {
      let searchLocalStorage: Array<any> = JSON.parse(localStorage.getItem(this.globelSearchHistoryKey));
      if (!searchLocalStorage) {
        let tmp = [];
        tmp.push(this.searchKey);
        localStorage.setItem(this.globelSearchHistoryKey, JSON.stringify(tmp));
      } else {
        const hasExit = searchLocalStorage.some((e) => {
          return e == this.searchKey;
        });
        if (!hasExit) {
          if (searchLocalStorage.length >= 10) {
            searchLocalStorage.shift();
          }
          searchLocalStorage.push(this.searchKey);
          localStorage.setItem(this.globelSearchHistoryKey, JSON.stringify(searchLocalStorage));
        }
      }
    }
  }
}
