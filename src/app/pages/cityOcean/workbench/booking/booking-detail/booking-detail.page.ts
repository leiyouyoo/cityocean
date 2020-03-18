import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BookingStatusType } from '../class/booking-status-type';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BookingServiceService } from '../booking-service.service';
import { bookingStatus } from '../class/bookingStatus';
import { CityOceanService } from '../../../city-ocean.service';
import { NavController } from '@ionic/angular';
import { PopoverComponent } from '../../../../../components/my-popover/popover.component';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.page.html',
  styleUrls: ['./booking-detail.page.scss'],
})
export class BookingDetailPage implements OnInit {
  statusType: typeof BookingStatusType = BookingStatusType;
  baseShow = true; //控制基本更多信息展示
  id: any;
  requestProcess = [
    {
      name: 'Booking is received by City Ocean Staff.',
      status: 'received',
      checked: false,
    },
    {
      name: 'Shipping order  is requested with the carrier..',
      status: 'requested',
      checked: false,
    },
    {
      name: 'Notified SO successfully with the customer..',
      status: 'Notified',
      checked: false,
    },
    {
      name: 'Shipping order is done..',
      status: 'done',
      checked: false,
    },
  ];
  bookingDetail = {
    bookingNo: 'string',
    cancelReason: 0,
    cancelRemark: 'string',
    shipmentNo: 'string',
    quoteEnquiryId: 0,
    status: 0,
    processingStatus: 0,
    customsDeclarationDocumentIds: ['string'],
    isCustomerUpdate: true,
    customerUpdateLastDataJson: 'string',
    lastData: {
      originPort: {
        id: 0,
        code: 'string',
        name: 'string',
        fullName: 'string',
        regionId: 0,
        regionName: 'string',
        countryName: 'string',
      },
      destinationPort: {
        id: 0,
        code: 'string',
        name: 'string',
        fullName: 'string',
        regionId: 0,
        regionName: 'string',
        countryName: 'string',
      },
      shipperAddress: {
        id: 0,
        country: 'string',
        province: 'string',
        city: 'string',
        streetAddress: 'string',
        streetAddress2: 'string',
        name: 'string',
        tenantName: 'string',
      },
      consigneeAddress: {
        id: 0,
        country: 'string',
        province: 'string',
        city: 'string',
        streetAddress: 'string',
        streetAddress2: 'string',
        name: 'string',
        tenantName: 'string',
      },
      cargoReadyDate: '2020-02-21T09:18:34.601Z',
      freightType: 0,
      tradeType: 0,
      incotermsString: 'string',
      containerType: 'string',
      quantityUnitString: 'string',
      weightUnitString: 'string',
      volumeUnitString: 'string',
      quantity: 0,
      weight: 0,
      volume: 0,
      description: 'string',
      specialInstructions: 'string',
    },
    bookingTemplateId: 0,
    purchaseOrderIds: [0],
    incotermsString: 'string',
    quantityUnitString: 'string',
    weightUnitString: 'string',
    volumeUnitString: 'string',
    originPort: {
      id: 0,
      code: 'string',
      name: 'string',
      fullName: 'string',
      regionId: 0,
      regionName: 'string',
      countryName: 'string',
    },
    destinationPort: {
      id: 0,
      code: 'string',
      name: 'string',
      fullName: 'string',
      regionId: 0,
      regionName: 'string',
      countryName: 'string',
    },
    shipperAddress: {
      id: 0,
      country: 'string',
      province: 'string',
      city: 'string',
      streetAddress: 'string',
      streetAddress2: 'string',
      name: 'string',
      tenantName: 'string',
    },
    consigneeAddress: {
      id: 0,
      country: 'string',
      province: 'string',
      city: 'string',
      streetAddress: 'string',
      streetAddress2: 'string',
      name: 'string',
      tenantName: 'string',
    },
    deliveryWarehouse: {
      id: 0,
      zip: 'string',
      streetAddress: 'string',
      streetAddress2: 'string',
      name: 'string',
      country: 'string',
      province: 'string',
      city: 'string',
      viewableType: 0,
      partnerId: 0,
      customerId: 0,
      tenantName: 'string',
      unlocode: 'string',
      isVerifiedCompany: true,
    },
    pickUpAddress: {
      id: 0,
      country: 'string',
      province: 'string',
      city: 'string',
      streetAddress: 'string',
      streetAddress2: 'string',
      name: 'string',
      tenantName: 'string',
    },
    deliveryTimeRange: 'string',
    pickUpTimeRange: 'string',
    contactName: 'string',
    contactPhone: 'string',
    fbaFreightMethodString: 'string',
    channelString: 'string',
    cusClearanceInvoices: [
      {
        bookingId: 0,
        cusClearanceProductId: 0,
        referenceId: 'string',
        fbaNo: 'string',
        sku: 'string',
        quantity: 0,
        unitId: 0,
        unitPriceValue: 0,
        unitPriceUnitId: 0,
        totalPriceValue: 0,
        totalPriceUnitId: 0,
        commodityEnglishDesc: 'string',
        commodityChineseDesc: 'string',
        brand: 'string',
        material: 'string',
        uses: 'string',
        hsCode: 'string',
        asin: 'string',
        isContainsBattery: true,
        model: 'string',
        imageId: 'string',
        id: 0,
      },
    ],
    packingLists: [
      {
        packageNo: 'string',
        fbaNo: 'string',
        codeRules: 'string',
        startNo: 'string',
        endNo: 'string',
        grossWeight: 0,
        grossWeightUnitId: 0,
        grossWeightUnitString: 'string',
        netWeight: 0,
        netWeightUnitId: 0,
        netWeightUnitString: 'string',
        dimensions: 'string',
        dimensionsUnitId: 0,
        dimensionsUnitString: 'string',
        bookingId: 0,
        packingListItems: [
          {
            packingListId: 0,
            sku: 'string',
            quantities: 0,
            totalQuantities: 0,
            commodityChineseDesc: 'string',
            id: 0,
          },
        ],
        id: 0,
      },
    ],
    serviceCompanyId: 0,
    quantity: 0,
    quantityUnitId: 0,
    weight: 0,
    weightUnitId: 0,
    volume: 0,
    volumeUnitId: 0,
    unitConvertType: 0,
    isContainsSpecialGoods: true,
    containsSpecialGoodsTypes: 'string',
    description: 'string',
    specialInstructions: 'string',
    containerType: 'string',
    declareCurrencyId: 0,
    name: 'string',
    consigneeLocationId: 0,
    consigneeCustomerId: 0,
    consigneePartnerId: 0,
    shipperLocationId: 0,
    shipperCustomerId: 0,
    shipperPartnerId: 0,
    cargoReadyDate: '2020-02-21T09:18:34.601Z',
    incotermsId: 0,
    tradeType: 0,
    freightType: 0,
    freightMethodType: 0,
    shipmentType: 0,
    originPortId: 0,
    originIsRequireTruck: true,
    originAddressId: 0,
    isDeclaration: true,
    isInsurance: true,
    destinationPortId: 0,
    destinationAddressId: 0,
    deliveryDate: '2020-02-21T09:18:34.601Z',
    destinationIsRequireTruck: true,
    isClearance: true,
    isTaxIncluded: true,
    contactId: 0,
    deliveryMethodType: 0,
    deliveryWarehouseId: 0,
    fbaFreightMethodId: 0,
    channelId: 0,
    customerId: 0,
    id: 0,
    creationTime: '2020-02-21T09:18:34.602Z',
    creatorUserId: 0,
    lastModificationTime: '2020-02-21T09:18:34.602Z',
    lastModifierUserId: 0,
    deletionTime: '2020-02-21T09:18:34.602Z',
    deleterUserId: 0,
    isDeleted: true,
  };
  statusStep: number;
  isfromChat: boolean;
  routeBackType = 'home';

  constructor(private activatedRoute: ActivatedRoute, 
    private bookingServiceService: BookingServiceService,
    private cityOceanService:CityOceanService,
    private nav:NavController) {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.id = data.id;
      this.isfromChat = Boolean(data.fromChat);
      this.routeBackType = data.routeBackType;
    });
  }
  setRequestProcess() {
    if (this.bookingDetail.status != 4 && this.bookingDetail.status != 5 && this.bookingDetail.status != 6) {
      this.requestProcess = [
        {
          name: 'Booking is received by City Ocean Staff.',
          status: 'received',
          checked: false,
        },
        {
          name: 'Shipping order  is requested with the carrier..',
          status: 'requested',
          checked: false,
        },
        {
          name: 'Notified SO successfully with the customer..',
          status: 'Notified',
          checked: false,
        },
        {
          name: 'Shipping order is done..',
          status: 'done',
          checked: false,
        },
      ];
    } else if (this.bookingDetail.status == 4) {
      this.requestProcess = [
        {
          name: 'Booking is received by City Ocean Staff.',
          status: 'received',
          checked: false,
        },
        {
          name: 'Freight quote  is sended to the customer.',
          status: 'requested',
          checked: false,
        },
        {
          name: 'Shipping order  is requested with the carrier..',
          status: 'requested',
          checked: false,
        },
        {
          name: 'Notified SO successfully with the customer..',
          status: 'Notified',
          checked: false,
        },
        {
          name: 'Shipping order is done..',
          status: 'done',
          checked: false,
        },
      ];
    } else if (this.bookingDetail.status == 5 || this.bookingDetail.status == 6) {
      this.requestProcess = [
        {
          name: 'Booking is received by City Ocean Staff.',
          status: 'received',
          checked: false,
        },
        {
          name: 'Freight quote  is sended to the customer.',
          status: 'requested',
          checked: false,
        },
        {
          name: 'Quote  is comfirmed by the customer.',
          status: 'requested',
          checked: false,
        },
        {
          name: 'Shipping order  is requested with the carrier..',
          status: 'requested',
          checked: false,
        },
        {
          name: 'Notified SO successfully with the customer..',
          status: 'Notified',
          checked: false,
        },
        {
          name: 'Shipping order is done..',
          status: 'done',
          checked: false,
        },
      ];
    }
    for (let index = 0; index <= this.statusStep; index++) {
      this.requestProcess[index].checked = true;
    }
  }
  ngOnInit() {
    this.bookingServiceService.GetDetail(this.id).subscribe((res: any) => {
      console.log(res);
      this.bookingDetail = res;
      switch (res.status) {
        case bookingStatus.Cancelled:
          this.statusStep = 0;
          break;
        case bookingStatus.Submitted:
          this.statusStep = 1;
          break;
        case bookingStatus.Booked:
          this.statusStep = 3;
          break;
        case bookingStatus.WaitingForPricing:
          if (res.tradeType != 1) {
            this.statusStep = -1;
          } else {
            this.statusStep = 0;
          }
          break;
        case bookingStatus.WaitingForBuyer:
          this.statusStep = 1;
          break;
        case bookingStatus.WaitingForSellerr:
          this.statusStep = 1;
          break;
        case bookingStatus.ConfirmCancelled:
          this.statusStep = -1;
          break;
        default:
          break;
      }
      this.setRequestProcess();
    });
  }
  getTime(time) {
    if(!time){return ''}
    return moment(time).format('MMM D YYYY');
  }
  goback() {
    // this.nav.navigateForward(['/cityOcean/workbench/booking']);
    window.history.back();
  }
  showRelatedBusinessPopover(event) {
    this.cityOceanService.showRelatedBusinessPopover(event,{},PopoverComponent,'booking',this.routeBackType);
  }
  // 客服
  chatWithCustomer() {
    this.cityOceanService.chatWithCustomerService('Booking',this.id,this.bookingDetail.bookingNo);
  }

  getContainerType(data) {
    let str = '';
    try {
      if (data.containerType) {
        let containerType = JSON.parse(data.containerType);
        containerType.forEach((element) => {
          if(element.value){
            str += ' ' + element.value + '*' + element.name;
          }
        });
      }
    } catch (error) {
      // console.log(error);
    }
    return str;
  }
  getSpecialGoodsName(data) {
    let str = '';
    try {
      if (data) {
        let containsSpecialGoodsTypes = JSON.parse(data);
        containsSpecialGoodsTypes.forEach((element) => {
          str += ' ' + element.Name;
        });
      }
    } catch (error) {
      // console.log(error);
    }
    return str;
  }
}
