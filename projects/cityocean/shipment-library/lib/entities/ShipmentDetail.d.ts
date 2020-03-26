export interface ShipmentDetail {
  customerId: string;
  shipmentNo: string;
  shipmentName: string;
  soNo: string;
  shipmentType: number;
  freightMethodType: number;
  status: number;
  mainESTTruckDeliveryDate: string;
  vessel: string;
  containerDisplay: ContainerDisplay[];
  totalWeightDisplay: null;
  totalVolumeDisplay: null;
  routeDetails: RouteDetails;
  shipmentExceptionEvents: any[];
  shipmentBookings: any[];
  purchaseOrderIds: null;
  id: string;
}
interface ContainerDisplay {
  name: string;
  value: string;
}
export interface RouteDetails {
  pickUpContainerCount: number;
  containerCount: number;
  shipperInfos: ShipperInfo[];
  siCutOffDate: string;
  vgmCutOffDate: null;
  cyCutOffTime: null;
  originPortId: string;
  estTruckDeliveryOrignDate: string;
  actualTruckDeliveryOrignDate: string;
  estDepatureOrginPortDate: string;
  actualDepatureOrginPortDate: null;
  originPort: NPort;
  carrier: null;
  destinationPortId: string;
  estArrivalDestinationPortDate: string;
  actualArrivalDestinationPortDate: null;
  estPickUpTruckDestinationDate: string;
  actualPickUpTruckDestinationDate: string;
  destinationPort: NPort;
  truckCarrier: null;
  consigneeInfos: ConsigneeInfo[];
}
interface ConsigneeInfo {
  customerId: string;
  consigneeNetWorkInfo: NetWorkInfo;
  containerNo: string;
  estTruckDeliveryDate: string;
  actualTruckDeliveryDate: string;
}
interface NetWorkInfo {
  id: string;
  country: string;
  province: null;
  city: string;
  streetAddress: string;
  streetAddress2: string;
  name: string;
  tenantName: string;
}
interface NPort {
  id: string;
  code: string;
  name: string;
  fullName: string;
  regionId: string;
  regionName: string;
  countryName: null;
}
interface ShipperInfo {
  customerId: string;
  shipperNetWorkInfo: NetWorkInfo;
  containerNo: string;
  cargoReadyDate: null;
}
export {};
