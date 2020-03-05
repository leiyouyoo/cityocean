import { Component, OnInit, Input } from '@angular/core';
import { BillingServiceService } from '../../workbench/billing/billing-service.service';
import { MyShipmentService } from '../../workbench/shipment/shipment.service';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-globel-search',
  templateUrl: './globel-search.component.html',
  styleUrls: ['./globel-search.component.scss'],
})
export class GlobelSearchComponent implements OnInit {
  billingData: any;
  shipmentData: any;
  @Input() searchKey = '';
  page = {
    pageSize: 5,
    pageIndex: 1,
  };
  searchHistoryList: any = [];

  constructor(
    private billingService: BillingServiceService,
    private shipmentService: MyShipmentService,
    private nav: NavController,
    private modalController: ModalController,
  ) {}

  ngOnInit() {
    let searchHistory = JSON.parse(localStorage.getItem('globelSearchHistory'));
    if (searchHistory) {
      this.searchHistoryList = searchHistory;
    }
  }
  filterConfirm(data?) {
    if (this.searchKey) {
      let searchLocalStorage: Array<any> = JSON.parse(localStorage.getItem('globelSearchHistory'));
      if (!searchLocalStorage) {
        let tmp = [];
        tmp.push(this.searchKey);
        localStorage.setItem('globelSearchHistory', JSON.stringify(tmp));
      } else {
        const hasExit = searchLocalStorage.some((e) => {
          return e == this.searchKey;
        });
        if (!hasExit) {
          if (searchLocalStorage.length >= 10) {
            searchLocalStorage.shift();
          }
          searchLocalStorage.push(this.searchKey);
          localStorage.setItem('globelSearchHistory', JSON.stringify(searchLocalStorage));
        }
      }
    }
    if (data) {
      this.searchKey = data;
    }
    this.searchBilling();
    this.searchShipment();
  }
  delete() {
    this.searchKey = '';
    this.billingData = [];
    this.shipmentData = [];
  }
  deleteHistory() {
    localStorage.removeItem('globelSearchHistory');
    this.searchHistoryList = [];
  }
  goback() {
    // this.nav.navigateForward(['/cityOcean/home']);
    this.modalController.dismiss();
  }
  searchBilling() {
    this.billingService
      .getAllBilling({ maxResultCount: this.page.pageSize, ShipmentId: this.searchKey } as any)
      .subscribe((data) => {
        this.billingData = data as any;
      });
  }
  gotoBillingDetail(item) {
    this.nav.navigateForward(['/cityOcean/workbench/billing/billiingDetail'], {
      queryParams: { id: item.id },
    });
  }
  searchShipment() {
    this.shipmentService
      .GetAll({ MaxResultCount: this.page.pageSize, searchText: this.searchKey })
      .subscribe((data: any) => {
        this.shipmentData = data;
      });
  }
  gotoShipmentDetail(item) {
    this.nav.navigateForward(['/cityOcean/workbench/shipments/shipmentDetail'], {
      queryParams: { id: item.id, agreement: item.agreement },
    });
  }
}
