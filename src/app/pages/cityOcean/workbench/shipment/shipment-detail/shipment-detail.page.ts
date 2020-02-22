import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipmentService } from '../shipment.service';
import * as moment from 'moment';
import { StatusType } from '../class/status-type';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-shipment-detail',
  templateUrl: './shipment-detail.page.html',
  styleUrls: ['./shipment-detail.page.scss'],
})
export class ShipmentDetailPage implements OnInit {
  mapShow = true;
  statusType: typeof StatusType = StatusType;
  baseShow = true; //控制基本更多信息展示
  originPortShow = false; //控制出发地更多信息展示
  consigneeShow = false; //控制目的地更多信息展示
  id: any;
  basicDetail = {
    billOfLadingNo: '',
    containerNos: '',
    quantityString: '',
    totalWeightString: '',
    totalVolumeString: '',
    specialInstructions: '',
    incotermsString: '',
    soNo:'',
  };
  routeDetail = {
    status: -1,
    routeDetails: {
      shipperInfos: [],
      consigneeInfos: [],
      originPort: {
        name: '',
        code: '',
      },
      destinationPort: {
        name: '',
        code: '',
      },
      actualDepatureOrginPortDate: '',
      carrierCustomerName: '',
      actualArrivalDestinationPortDate: '',
      actualPickUpTruckDestinationDate: '',
      truckCustomerName: '',
    },
    shipmentNo:'',
  };
  businessTypeTitle :any;
  agreement: any; //Freight Type
  constructor(private activatedRoute: ActivatedRoute, private shipmentService: ShipmentService) {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.id = data.id;
      this.agreement = data.agreement;
    });
  }

  ngOnInit() {
    forkJoin(this.shipmentService.GetShipmentDetail(this.id), this.shipmentService.GetDetail(this.id)).subscribe(
      (res: any) => {
        console.log(res);
        this.basicDetail = res[0];
        this.routeDetail = res[1];
        this.businessTypeTitle = {title1:this.routeDetail.shipmentNo,title2:this.basicDetail.soNo}
      },
    );
  }
  getTime(time) {
    return moment(time).format('MMM D YYYY');
  }
  goback() {
    window.history.back();
  }
  swipeup() {
    this.mapShow = false;
  }
  swipedown() {
    this.mapShow = true;
  }
  toggle() {
    this.mapShow = !this.mapShow;
  }
  getContainerType(data) {
    let str = '';
    if (data.containerTypes) {
      data.containerTypes.forEach((element) => {
        str += ' ' + element.value + '*' + element.name;
      });
    }
    return str;
  }
}
