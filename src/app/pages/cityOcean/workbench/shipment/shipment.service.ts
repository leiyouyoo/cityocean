import { Injectable } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { TransportationMode } from './class/TransportationMode';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyShipmentService {
  public _shipmentsList: Array<any> = [];
  constructor(
    public http: HttpService,
  ) {

    this._shipmentsList = [
      {
        'agreement': 'door-cy',
        'transportType': 'ship',
        'containerListShow': '1*20GP,2*40GP,1*60GP,2*80GP',
        'shiperShow': 'shipper,shipper,shipper',
        'consigneeShow': 'consignee,consignee,consignee',

        "shipmentNo": "shipmentNo",
        "name": "name",
        "freightType": 0,
        "incotermsOrFBA": 0,
        "transportationMode": 0,
        "status": 1,
        "containerList": [
          {
            "count": 1,
            "code": "20GP"
          },
          {
            "count": 2,
            "code": "40GP"
          },
          {
            "count": 1,
            "code": "60GP"
          },
          {
            "count": 2,
            "code": "80GP"
          }
        ],
        "shipperList": [
          "shipper", "shipper", "shipper"
        ],
        "consigneeList": [
          "consignee", "consignee", "consignee",
        ],
        "originPortId": 0,
        "originPort": "Ningbo Port",
        "destinationPortId": 0,
        "destinationPort": "New York port ,NY,United",
        "cargoReadyDates": [
          "2019-09-20T03:53:30.024Z"
        ],

        "emptyPickupDate": "2019-09-20T03:53:30.024Z",
        "cyCutOffDate": "2019-09-20T03:53:30.024Z",
        "closingDate": "2019-09-20T03:53:30.024Z",
        "siClosingDate": "2019-09-20T03:53:30.024Z",


        "estDeliveryDate": "2019-09-20T03:53:30.024Z",
        "actualDeliveredDate": "2019-09-20T03:53:30.024Z",
        "estDepatureDate": "2019-09-20T03:53:30.024Z",
        "actualDepatureDate": "2019-09-20T03:53:30.024Z",

        "estArrivalDate": "2019-09-20T03:53:30.024Z",
        "actualArrivalDate": "2019-09-20T03:53:30.024Z",
        "estPickedUpDate": "2019-09-20T03:53:30.024Z",
        "actualPickedUpDate": "2019-09-20T03:53:30.024Z",

        "estDeliveryInFullDate": "2019-09-20T03:53:30.024Z",
        "actualDeliveryInFullDate": "2019-09-20T03:53:30.024Z",
        "id": 0
      },
      {
        'agreement': 'door-door',
        'transportType': 'air',
        'containerListShow': '1*20GP,2*40GP,1*60GP,2*80GP',
        'shiperShow': 'shipper,shipper,shipper',
        'consigneeShow': 'consignee,consignee,consignee',

        "shipmentNo": "shipmentNo",
        "name": "name",
        "freightType": 1,
        "incotermsOrFBA": 0,
        "transportationMode": 0,
        "status": 6,
        "containerList": [
          {
            "count": 1,
            "code": "20GP"
          },
          {
            "count": 2,
            "code": "40GP"
          },
          {
            "count": 1,
            "code": "60GP"
          },
          {
            "count": 2,
            "code": "80GP"
          }
        ],
        "shipperList": [
          "shipper", "shipper", "shipper"
        ],
        "consigneeList": [
          "consignee", "consignee", "consignee",
        ],
        "originPortId": 0,
        "originPort": "Ningbo Port",
        "destinationPortId": 0,
        "destinationPort": "New York port ,NY,United",
        "cargoReadyDates": [
          "2019-09-20T03:53:30.024Z"
        ],

        "emptyPickupDate": "2019-09-20T03:53:30.024Z",
        "cyCutOffDate": "2019-09-20T03:53:30.024Z",
        "closingDate": "2019-09-20T03:53:30.024Z",
        "siClosingDate": "2019-09-20T03:53:30.024Z",


        "estDeliveryDate": "2019-09-20T03:53:30.024Z",
        "actualDeliveredDate": "2019-09-20T03:53:30.024Z",

        "estDepatureDate": "2019-09-20T03:53:30.024Z",
        "actualDepatureDate": "2019-09-20T03:53:30.024Z",

        "estArrivalDate": "2019-09-20T03:53:30.024Z",
        "actualArrivalDate": "2019-09-20T03:53:30.024Z",

        "estPickedUpDate": "2019-09-20T03:53:30.024Z",
        "actualPickedUpDate": "2019-09-20T03:53:30.024Z",

        "estDeliveryInFullDate": "2019-09-20T03:53:30.024Z",
        "actualDeliveryInFullDate": "2019-09-20T03:53:30.024Z",
        "id": 0
      },
      {
        'agreement': 'door-cy',
        'transportType': 'ship',
        'containerListShow': '1*20GP,2*40GP,1*60GP,2*80GP',
        'shiperShow': 'shipper,shipper,shipper',
        'consigneeShow': 'consignee,consignee,consignee',

        "shipmentNo": "shipmentNo",
        "name": "name",
        "freightType": 0,
        "incotermsOrFBA": 0,
        "transportationMode": 0,
        "status": 5,
        "containerList": [
          {
            "count": 1,
            "code": "20GP"
          },
          {
            "count": 2,
            "code": "40GP"
          },
          {
            "count": 1,
            "code": "60GP"
          },
          {
            "count": 2,
            "code": "80GP"
          }
        ],
        "shipperList": [
          "shipper", "shipper", "shipper"
        ],
        "consigneeList": [
          "consignee", "consignee", "consignee",
        ],
        "originPortId": 0,
        "originPort": "Ningbo Port",
        "destinationPortId": 0,
        "destinationPort": "New York port ,NY,United",
        "cargoReadyDates": [
          "2019-09-20T03:53:30.024Z"
        ],

        "emptyPickupDate": "2019-09-20T03:53:30.024Z",
        "cyCutOffDate": "2019-09-20T03:53:30.024Z",
        "closingDate": "2019-09-20T03:53:30.024Z",
        "siClosingDate": "2019-09-20T03:53:30.024Z",


        "estDeliveryDate": "2019-09-20T03:53:30.024Z",
        "actualDeliveredDate": "2019-09-20T03:53:30.024Z",

        "estDepatureDate": "2019-09-20T03:53:30.024Z",
        "actualDepatureDate": "2019-09-20T03:53:30.024Z",

        "estArrivalDate": "2019-09-20T03:53:30.024Z",
        "actualArrivalDate": "2019-09-20T03:53:30.024Z",

        "estPickedUpDate": "2019-09-20T03:53:30.024Z",
        "actualPickedUpDate": "2019-09-20T03:53:30.024Z",

        "estDeliveryInFullDate": "2019-09-20T03:53:30.024Z",
        "actualDeliveryInFullDate": "2019-09-20T03:53:30.024Z",
        "id": 0
      },
      {
        'agreement': 'door-cy',
        'transportType': 'ship',
        'containerListShow': '1*20GP,2*40GP,1*60GP,2*80GP',
        'shiperShow': 'shipper,shipper,shipper',
        'consigneeShow': 'consignee,consignee,consignee',
        'isDanger': true,

        "shipmentNo": "shipmentNo",
        "name": "name",
        "freightType": 0,
        "incotermsOrFBA": 0,
        "transportationMode": 0,
        "status": 3,
        "containerList": [
          {
            "count": 1,
            "code": "20GP"
          },
          {
            "count": 2,
            "code": "40GP"
          },
          {
            "count": 1,
            "code": "60GP"
          },
          {
            "count": 2,
            "code": "80GP"
          }
        ],
        "shipperList": [
          "shipper", "shipper", "shipper"
        ],
        "consigneeList": [
          "consignee", "consignee", "consignee",
        ],
        "originPortId": 0,
        "originPort": "Ningbo Port",
        "destinationPortId": 0,
        "destinationPort": "New York port ,NY,United",
        "cargoReadyDates": [
          "2019-09-20T03:53:30.024Z"
        ],

        "emptyPickupDate": "2019-09-20T03:53:30.024Z",
        "cyCutOffDate": "2019-09-20T03:53:30.024Z",
        "closingDate": "2019-09-20T03:53:30.024Z",
        "siClosingDate": "2019-09-20T03:53:30.024Z",


        "estDeliveryDate": "2019-09-20T03:53:30.024Z",
        "actualDeliveredDate": "2019-09-20T03:53:30.024Z",

        "estDepatureDate": "2019-09-20T03:53:30.024Z",
        "actualDepatureDate": "2019-09-20T03:53:30.024Z",

        "estArrivalDate": "2019-09-20T03:53:30.024Z",
        "actualArrivalDate": "2019-09-20T03:53:30.024Z",

        "estPickedUpDate": "2019-09-20T03:53:30.024Z",
        "actualPickedUpDate": "2019-09-20T03:53:30.024Z",

        "estDeliveryInFullDate": "2019-09-20T03:53:30.024Z",
        "actualDeliveryInFullDate": "2019-09-20T03:53:30.024Z",
        "id": 0
      },
      {
        'agreement': 'door-door',
        'transportType': 'ship',
        'containerListShow': '1*20GP,2*40GP,1*60GP,2*80GP',
        'shiperShow': 'shipper,shipper,shipper',
        'consigneeShow': 'consignee,consignee,consignee',

        "shipmentNo": "shipmentNo",
        "name": "name",
        "freightType": 0,
        "incotermsOrFBA": 0,
        "transportationMode": 0,
        "status": 6,
        "containerList": [
          {
            "count": 1,
            "code": "20GP"
          },
          {
            "count": 2,
            "code": "40GP"
          },
          {
            "count": 1,
            "code": "60GP"
          },
          {
            "count": 2,
            "code": "80GP"
          }
        ],
        "shipperList": [
          "shipper", "shipper", "shipper"
        ],
        "consigneeList": [
          "consignee", "consignee", "consignee",
        ],
        "originPortId": 0,
        "originPort": "Ningbo Port",
        "destinationPortId": 0,
        "destinationPort": "New York port ,NY,United",
        "cargoReadyDates": [
          "2019-09-20T03:53:30.024Z"
        ],

        "emptyPickupDate": "2019-09-20T03:53:30.024Z",
        "cyCutOffDate": "2019-09-20T03:53:30.024Z",
        "closingDate": "2019-09-20T03:53:30.024Z",
        "siClosingDate": "2019-09-20T03:53:30.024Z",


        "estDeliveryDate": "2019-09-20T03:53:30.024Z",
        "actualDeliveredDate": "2019-09-20T03:53:30.024Z",

        "estDepatureDate": "2019-09-20T03:53:30.024Z",
        "actualDepatureDate": "2019-09-20T03:53:30.024Z",

        "estArrivalDate": "2019-09-20T03:53:30.024Z",
        "actualArrivalDate": "2019-09-20T03:53:30.024Z",

        "estPickedUpDate": "2019-09-20T03:53:30.024Z",
        "actualPickedUpDate": "2019-09-20T03:53:30.024Z",

        "estDeliveryInFullDate": "2019-09-20T03:53:30.024Z",
        "actualDeliveryInFullDate": "2019-09-20T03:53:30.024Z",
        "id": 0
      },
      {
        'agreement': 'cy-door',
        'transportType': 'ship',
        'containerListShow': '1*20GP,2*40GP,1*60GP,2*80GP',
        'shiperShow': 'shipper,shipper,shipper',
        'consigneeShow': 'consignee,consignee,consignee',

        "shipmentNo": "shipmentNo",
        "name": "name",
        "freightType": 0,
        "incotermsOrFBA": 0,
        "transportationMode": 0,
        "status": 5,
        "containerList": [
          {
            "count": 1,
            "code": "20GP"
          },
          {
            "count": 2,
            "code": "40GP"
          },
          {
            "count": 1,
            "code": "60GP"
          },
          {
            "count": 2,
            "code": "80GP"
          }
        ],
        "shipperList": [
          "shipper", "shipper", "shipper"
        ],
        "consigneeList": [
          "consignee", "consignee", "consignee",
        ],
        "originPortId": 0,
        "originPort": "Ningbo Port",
        "destinationPortId": 0,
        "destinationPort": "New York port ,NY,United",
        "cargoReadyDates": [
          "2019-09-20T03:53:30.024Z"
        ],

        "emptyPickupDate": "2019-09-20T03:53:30.024Z",
        "cyCutOffDate": "2019-09-20T03:53:30.024Z",
        "closingDate": "2019-09-20T03:53:30.024Z",
        "siClosingDate": "2019-09-20T03:53:30.024Z",


        "estDeliveryDate": "2019-09-20T03:53:30.024Z",
        "actualDeliveredDate": "2019-09-20T03:53:30.024Z",

        "estDepatureDate": "2019-09-20T03:53:30.024Z",
        "actualDepatureDate": "2019-09-20T03:53:30.024Z",

        "estArrivalDate": "2019-09-20T03:53:30.024Z",
        "actualArrivalDate": "2019-09-20T03:53:30.024Z",

        "estPickedUpDate": "2019-09-20T03:53:30.024Z",
        "actualPickedUpDate": "2019-09-20T03:53:30.024Z",

        "estDeliveryInFullDate": "2019-09-20T03:53:30.024Z",
        "actualDeliveryInFullDate": "2019-09-20T03:53:30.024Z",
        "id": 0
      },
      {
        'agreement': 'cy-door',
        'transportType': 'air',
        'containerListShow': '1*20GP,2*40GP,1*60GP,2*80GP',
        'shiperShow': 'shipper,shipper,shipper',
        'consigneeShow': 'consignee,consignee,consignee',

        "shipmentNo": "shipmentNo",
        "name": "name",
        "freightType": 0,
        "incotermsOrFBA": 0,
        "transportationMode": 0,
        "status": 7,
        "containerList": [
          {
            "count": 1,
            "code": "20GP"
          },
          {
            "count": 2,
            "code": "40GP"
          },
          {
            "count": 1,
            "code": "60GP"
          },
          {
            "count": 2,
            "code": "80GP"
          }
        ],
        "shipperList": [
          "shipper", "shipper", "shipper"
        ],
        "consigneeList": [
          "consignee", "consignee", "consignee",
        ],
        "originPortId": 0,
        "originPort": "Ningbo Port",
        "destinationPortId": 0,
        "destinationPort": "New York port ,NY,United",
        "cargoReadyDates": [
          "2019-09-20T03:53:30.024Z"
        ],

        "emptyPickupDate": "2019-09-20T03:53:30.024Z",
        "cyCutOffDate": "2019-09-20T03:53:30.024Z",
        "closingDate": "2019-09-20T03:53:30.024Z",
        "siClosingDate": "2019-09-20T03:53:30.024Z",


        "estDeliveryDate": "2019-09-20T03:53:30.024Z",
        "actualDeliveredDate": "2019-09-20T03:53:30.024Z",

        "estDepatureDate": "2019-09-20T03:53:30.024Z",
        "actualDepatureDate": "2019-09-20T03:53:30.024Z",

        "estArrivalDate": "2019-09-20T03:53:30.024Z",
        "actualArrivalDate": "2019-09-20T03:53:30.024Z",

        "estPickedUpDate": "2019-09-20T03:53:30.024Z",
        "actualPickedUpDate": "2019-09-20T03:53:30.024Z",

        "estDeliveryInFullDate": "2019-09-20T03:53:30.024Z",
        "actualDeliveryInFullDate": "2019-09-20T03:53:30.024Z",
        "id": 0
      },
    ];
  }

  GetAll(json: { searchText?: string, IsDelivered?: boolean, TransportationMode?: TransportationMode, Sorting?: string, MaxResultCount?: number, SkipCount?: number }) {
    return this.http.postJson('/CSP/Shipment/GetAllList', json)
      .pipe(map((data: any) => {
        return data;
      }));
  }
  getStatistics() {
    const url = `/CSP/Shipment/GetShipmentsStatistics`;
    return this.http.get(url);
  }
  GetDetail(id: number) {
    return this.http.get('/CSP/Shipment/GetDetail', { id });
  }

  GetShipmentDetail(id: number) {
    return this.http.get('/CSP/Shipment/GetShipmentDetail', { id });
  }
  getTestData() {
    return this._shipmentsList;
  }

  getMapShipRoute(pointList = []) {
    let mapIconList = [];
    let line = [];
    const point = {
      yantian: { coor: [-247.388497, 22.551956], iconClass: 'icon-icon_oceanshipmentx' },
      guangzhou: { coor: [-246.629063, 22.594968], iconClass: 'icon-icon_oceanshipmentx' },
      angeles: { coor: [-118.243707, 34.053945], iconClass: 'icon-icon_oceanshipmentx' },
    };
    /*const result = e.some(o => o.name.includes('benefit')) &&
      e.some(o => o.name.includes('angeles')) &&
      e.some(o => o.name.includes('yantian'));*/
    const transportType = {
      ship: 'icon-icon_oceanshipmentx',
      air: 'icon-icon_airshipmentx',
    };
    const result = pointList.filter(o => {
      return o.name.includes('guangzhou') || o.name.includes('angeles') || o.name.includes('yantian');
    });
    const random = (arr: number[]) => {
      return arr.map(o => o += Math.random());
    };
    if (result.length >= 1) {
      mapIconList = result.map(o => {
        if (o.name.includes('guangzhou')) {
          return {
            ...point.guangzhou,
            id: o.id,
            theme: o.isDanger ? 'error' : '',
            iconClass: transportType[o.transportType],
          };
        }
        if (o.name.includes('angeles')) {
          return {
            ...point.angeles,
            id: o.id,
            start: false,
            theme: o.isDanger ? 'error' : '',
            iconClass: transportType[o.transportType],
          };
        }
        if (o.name.includes('yantian')) {
          return {
            ...point.yantian,
            id: o.id,
            theme: o.isDanger ? 'error' : '',
            iconClass: transportType[o.transportType],
          };
        }
      });
      /*mapIconList.forEach(o => {
        o.coor = random(o.coor);
      });*/
      /*this.fakeMapData = [
        { coor: [-246.788497, 23.121956], iconClass: 'icon-icon_oceanshipmentx' },
        { coor: [-247.388497, 22.551956], iconClass: 'icon-icon_oceanshipmentx' },
        { coor: [-246.629063, 22.594968], iconClass: 'icon-icon_oceanshipmentx' },
        { coor: [-118.243707, 34.053945], iconClass: 'icon-icon_oceanshipmentx' },
      ]; */
      if (result[0] && result[0].start !== false) {
      }
    }

    return { iconList: mapIconList, line };
  }

  createShare(param = {}) {
    return this.http.postJson('/CSP/ShipmentShareLink/Create', param);
  }

  getShareHistory(param = {}) {
    const url = `/CSP/ShipmentShareLink/GetAll`;
    return this.http.get(url, param);
  }

  shareSend(param) {
    const url = `/CSP/ShipmentShareLink/Update`;
    return this.http.put(url, param);
  }

  shareCancel(id: number) {
    const url = `/CSP/ShipmentShareLink/Cancel`;
    return this.http.postJson(url, { id });
  }

  getShipTrack(param: { vesselName: string, startTime: string, endTime: string, needCount?: number }) {
    const url = `/PUB/VesselInfos/GetShipTrack`
    if (!param.needCount) param.needCount = 100;
    return this.http.get(url, param)
      .pipe(
        map((o: any[]) => {
          return o.map(point => {
            return {
              ...point,
              point: [point.longitudeDegree, point.latitudeDegree],
            } as any;
          });
        }),
      );
  }

  getShipmentTrackByRes(res) {
    const route = res.routeDetails;
    return this.getShipTrack({ vesselName: res.vessel, startTime: route.estDepatureOrginPortDate, endTime: route.estArrivalDestinationPortDate });
  }

  getAllPortsForOthers(parm: { IsFromBooking?: boolean, IsFromShipment?: boolean, IsFromOrigin?: boolean, IsFromDestination?: boolean }) {
    return this.http.get('/CSP/Shipment/GetAllPortsForOthers', parm);
  }

  getAllLocationsForOthers(parm: { IsFromBooking?: boolean, IsFromShipment?: boolean, IsFromOrigin?: boolean, IsFromDestination?: boolean }) {
    return this.http.get('/CSP/Shipment/GetAllLocationsForOthers', parm);
  }

  getAllCompanyForOthers() {
    return this.http.get('/CSP/Shipment/GetAllCompanyForOthers');
  }

  createOrUpdateConditionGroup(param) {
    return this.http.postJson('/Platform/BusinessFilter/CreateOrUpdateConditionGroup', param);
  }

  getShipmentLinkDetail(Id: number) {
    let params = { Id }
    return this.http.get('/CSP/ShipmentShareLink/GetDetail', params)
  }
}
