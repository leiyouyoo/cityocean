import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillStatus } from '../class/BillStatus';
import { BillingServiceService } from '../billing-service.service';
import * as moment from 'moment';
import { CityOceanService } from '../../../city-ocean.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-billiing-detail',
  templateUrl: './billiing-detail.page.html',
  styleUrls: ['./billiing-detail.page.scss'],
})
export class BilliingDetailPage implements OnInit {
  statusType: typeof BillStatus = BillStatus; // 显示状态
  baseShow = true; //控制基本更多信息展示
  id: any;
  billingDetail = {
    customerId: 0,
    shipmentNo: 'string',
    recipient: {
      name: 'string',
      value: 'string',
    },
    amount: [
      {
        name: 'string',
        value: 0,
      },
    ],
    balance: [
      {
        name: 'string',
        value: 0,
      },
    ],
    chargeItems: [
      {
        billId: 0,
        chargingCodeId: 0,
        chargingCodeString: 'string',
        currencyId: 0,
        currencyString: 'string',
        unitId: 0,
        unitString: 'string',
        unitPrice: 0,
        quantity: 0,
        payAmount: 0,
        description: 'string',
        chargeType: 1,
        id: 0,
      },
    ],
    paymentRecords: [
      {
        paymentRecordNo: 'string',
        chargeItemId: 0,
        currencyId: 0,
        currencyString: 'string',
        payAmount: 0,
        checkerId: 0,
        checkerName: 'string',
        bankDate: '2020-02-22T07:55:45.075Z',
        description: 'string',
        chargingCodeString: 'string',
        id: 0,
      },
    ],
    billNo: 'string',
    shipmentId: 0,
    shipmentItemId: 0,
    issuedDate: '2020-02-22T07:55:45.075Z',
    dueDate: '2020-02-22T07:55:45.075Z',
    status: 0,
    description: 'string',
    id: 0,
  };
  rateInformations = [
    {
      title: 'FREIGHT CHARGES',
      type: [
        {
          name: 'AIR FREIGHT',
          Rate: '$17.50',
          Quantity: '×122cbm',
          Amount: '$2,135',
        },
      ],
    },
    {
      title: 'ORIGIN CHARGES',
      type: [
        {
          name: 'TERMINAL HANDLING CHARGE',
          Rate: '$49.50',
          Quantity: '×1  Total',
          Amount: '$49.50',
        },
        {
          name: 'ORIGINAL RECEIVING CHARGE',
          Rate: '$49.50',
          Quantity: '×1  Total',
          Amount: '$49.50',
        },
        {
          name: 'EQUIPMENT INTERCHANGE RECEIPT CHARGE',
          Rate: '$49.50',
          Quantity: '×1  Total',
          Amount: '$49.50',
        },
        {
          name: 'SEALING CHARGE',
          Rate: '$49.50',
          Quantity: '×1  Total',
          Amount: '$49.50',
        },
        {
          name: 'DOCUMENTATION FEE',
          Rate: '$49.50',
          Quantity: '×1  Total',
          Amount: '$49.50',
        },
      ],
    },
    {
      title: 'DESTINATION CHARGES',
      type: [
        {
          name: 'TERMINAL HANDLING CHARGE',
          Rate: '$49.50',
          Quantity: '×122cbm',
          Amount: '$49.50',
        },
        {
          name: 'Delivery Handling Fee',
          Rate: '$49.50',
          Quantity: '×122cbm',
          Amount: '$49.50',
        },
        {
          name: 'TRUCKING CHARGE.DEST',
          Rate: '$17.50',
          Quantity: '×122cbm',
          Amount: '$49.50',
        },
        {
          name: 'DELIVERY ORDER FEE',
          Rate: '$49.50',
          Quantity: '×122cbm',
          Amount: '$49.50',
        },
      ],
    },
    {
      title: 'ADDITIONAL CHARGES',
      type: [
        {
          name: 'DEST. Customs Clearance Charge',
          Rate: '$49.50',
          Quantity: '×122cbm',
          Amount: '$49.50',
        },
      ],
    },
  ];

  businessTypeTitle: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private billingServiceService: BillingServiceService,
    private cityOceanService: CityOceanService,
    private nav:NavController
  ) {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.id = data.id;
    });
  }

  ngOnInit() {
    this.billingServiceService.getBillingDetail(this.id).subscribe((res: any) => {
      console.log(res);
      this.billingDetail = res;
      this.businessTypeTitle = { title1: this.billingDetail.shipmentNo };
    });
  }
  getTime(time) {
    if(!time){return ''}
    return moment(time).format('MMM D YYYY');
  }
  // 客服
  chatWithCustomer() {
    this.cityOceanService.chatWithCustomerService();
  }
  goback() {
    // this.nav.navigateForward(['/cityOcean/workbench/billing']);
    window.history.back();
  }
  getChargeItemsSubtotal(items: any[]) {
    return items.reduce((acc, cur) => {
      return acc + cur.payAmount;
    }, 0);
  }
  moreClick() {}
  getContainerType(data) {
    let str = '';
    try {
      if (data.containerType) {
        let containerType = JSON.parse(data.containerType);
        containerType.forEach((element) => {
          str += ' ' + element.value + '*' + element.name;
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
