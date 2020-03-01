import { Component, OnInit } from '@angular/core';
import { BillingServiceService } from '../../workbench/billing/billing-service.service';
import { MyShipmentService } from '../../workbench/shipment/shipment.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-globel-search',
  templateUrl: './globel-search.page.html',
  styleUrls: ['./globel-search.page.scss'],
})
export class GlobelSearchPage implements OnInit {
  billingData: any;
  shipmentData: any;
  page = {
    pageSize: 5,
    pageIndex: 1,
  };

  constructor(
    private billingService: BillingServiceService,
    private shipmentService: MyShipmentService,
    private nav: NavController,
  ) {}

  ngOnInit() {
    this.searchBilling();
    this.searchShipment();
  }
  goback() {
    this.nav.navigateForward(['/cityOcean/home']);
  }
  searchBilling() {
    this.billingService.getAllBilling({ maxResultCount: this.page.pageSize } as any).subscribe((data) => {
      this.billingData = data as any;
    });
  }
  gotoBillingDetail(item) {
    this.nav.navigateForward(['/cityOcean/workbench/billing/billiingDetail'], {
      queryParams: { id: item.id },
    });
  }
  searchShipment() {
    this.shipmentService.GetAll({ MaxResultCount: this.page.pageSize }).subscribe((data: any) => {
      this.shipmentData = data;
    });
  }
  gotoShipmentDetail(item) {
    this.nav.navigateForward(['/cityOcean/workbench/shipment/shipmentDetail'], {
      queryParams: { id: item.id, agreement: item.agreement },
    });
  }
}
