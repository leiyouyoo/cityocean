import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyShipmentService } from '../shipment.service';
import * as moment from 'moment';
import { ShipmentStatusType } from '../class/shipment-status-type';
import { forkJoin } from 'rxjs';
import { ShipmentService } from '@cityocean/shipment-library';
import { CityOceanService } from '../../../city-ocean.service';
import { NavController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shipment-detail',
  templateUrl: './shipment-detail.page.html',
  styleUrls: ['./shipment-detail.page.scss'],
})
export class ShipmentDetailPage implements OnInit {
  mapShow = true;
  statusType: typeof ShipmentStatusType = ShipmentStatusType;
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
    soNo: '',
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
    shipmentNo: '',
  };
  businessTypeTitle: any;
  agreement: any; //Freight Type
  icons: any[];
  lines: any[];
  dashedLines: any[];
  isLoginWithTourist: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private myShipmentService: MyShipmentService,
    private shipmentService: ShipmentService,
    private cityOceanService:CityOceanService,
    private nav:NavController,
    private alertController:AlertController,
    private translate:TranslateService
  ) {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.id = data.id;
      this.agreement = data.agreement;
    });
  }

  ngOnInit() {
    if (localStorage.getItem('isLoginWithTourist') == 'true'){
      this.isLoginWithTourist = true
    }
  }
  ionViewWillEnter(){
    forkJoin(this.myShipmentService.GetShipmentDetail(this.id), this.myShipmentService.GetDetail(this.id)).subscribe(
      (res: any) => {
        console.log(res);
        this.basicDetail = res[0];
        this.routeDetail = res[1];
        this.getMapData(res[1]);
        this.businessTypeTitle = { title1: this.routeDetail.shipmentNo, title2: this.basicDetail.soNo };
      },
    );
  }
  getMapData(data) {
    this.shipmentService.getShipmentMapDataByDetails([data]).subscribe((mapData) => {
      if (mapData.length) {
        this.icons = mapData[0].icons;
        this.lines = mapData[0].lines;
        this.dashedLines = mapData[0].dashedLines;
      }
    });
  }
  getTime(time) {
    return moment(time).format('MMM D YYYY');
  }
  // 客服
  chatWithCustomer() {
    this.cityOceanService.chatWithCustomerService();
  }

  async showMore() {
    const alert = await this.alertController.create({
      header: this.translate.instant('Jump to login')+"?",
      message: this.translate.instant('Show more detail'),
      buttons: [
        {
          text: "Cancel",
          handler: blah => {
          }
        },
        {
          text: "Yes",
          handler: blah => {
            this.nav.navigateRoot("/login");
          }
        },
        
      ]
    });

    await alert.present();
  }
  goback() {
    // this.nav.navigateForward(['/cityOcean/workbench/shipment']);
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
