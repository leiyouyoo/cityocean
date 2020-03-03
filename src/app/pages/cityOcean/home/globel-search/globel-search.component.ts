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

  constructor(
    private billingService: BillingServiceService,
    private shipmentService: MyShipmentService,
    private nav: NavController,
    private modalController:ModalController
  ) {
  }

  ngOnInit() {
    this.filterConfirm()
  }
  filterConfirm(){
    this.searchBilling();
    this.searchShipment();
  }
  delete(){
    this.searchKey = '';
    this.filterConfirm();
  }
  goback() {
    // this.nav.navigateForward(['/cityOcean/home']);
    this.modalController.dismiss();
  }
  searchBilling() {
    this.billingService.getAllBilling({ maxResultCount: this.page.pageSize,ShipmentId:this.searchKey } as any).subscribe((data) => {
      this.billingData = data as any;
    });
  }
  gotoBillingDetail(item) {
    this.nav.navigateForward(['/cityOcean/workbench/billing/billiingDetail'], {
      queryParams: { id: item.id },
    });
  }
  searchShipment() {
    this.shipmentService.GetAll({ MaxResultCount: this.page.pageSize,searchText:this.searchKey }).subscribe((data: any) => {
      this.shipmentData = data;
    });
  }
  gotoShipmentDetail(item) {
    this.nav.navigateForward(['/cityOcean/workbench/shipments/shipmentDetail'], {
      queryParams: { id: item.id, agreement: item.agreement },
    });
  }
}