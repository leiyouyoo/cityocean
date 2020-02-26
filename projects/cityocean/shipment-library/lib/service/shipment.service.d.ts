import { HttpService } from '@cityocean/common-library';
import { TransportationMode } from '../class/TransportationMode';
import { Observable } from 'rxjs';
import { ShipmentDetail } from '../entities/ShipmentDetail';
import { VesselTrackPoint } from '../entities/VesselTrackPoint';
import { AmapService, ComponentToHtmlService } from 'projects/cityocean/amap-library/public-api';
export declare class ShipmentService {
    http: HttpService;
    private amapService;
    private componentToHtmlService;
    constructor(http: HttpService, amapService: AmapService, componentToHtmlService: ComponentToHtmlService);
    GetAll(json: {
        SearchKey?: string;
        IsDelivered?: boolean;
        TransportationMode?: TransportationMode;
        Sorting?: string;
        MaxResultCount?: number;
        SkipCount?: number;
    }): Observable<any>;
    getStatistics(): Observable<Object>;
    GetDetail(id: number): Observable<ShipmentDetail>;
    GetShipmentDetail(id: number): Observable<Object>;
    getMapShipRoute(pointList?: any[]): {
        iconList: any[];
        line: any[];
    };
    createShare(param?: {}): Observable<Object>;
    getShareHistory(param?: {}): Observable<Object>;
    shareSend(param: any): Observable<Object>;
    shareCancel(id: number): Observable<Object>;
    getShipTrack(param: {
        vesselName: string;
        startTime: string;
        endTime: string;
        needCount?: number;
    }): Observable<VesselTrackPoint[]>;
    getShipmentTrackByRes(res: ShipmentDetail): Observable<VesselTrackPoint[]>;
    getAllPortsForOthers(parm: {
        IsFromBooking?: boolean;
        IsFromShipment?: boolean;
        IsFromOrigin?: boolean;
        IsFromDestination?: boolean;
    }): Observable<Object>;
    getAllLocationsForOthers(parm: {
        IsFromBooking?: boolean;
        IsFromShipment?: boolean;
        IsFromOrigin?: boolean;
        IsFromDestination?: boolean;
    }): Observable<Object>;
    getAllCompanyForOthers(): Observable<Object>;
    createOrUpdateConditionGroup(param: any): Observable<Object>;
    getShipmentLinkDetail(Id: number): Observable<Object>;
    /**
     * shipment 的路线
     * @param details
     *   目前参数是数组，应该用不到数组传进来的应该都是单个
     */
    getShipmentMapDataByDetails(details: ShipmentDetail[]): Observable<{
        icons: any[];
        lines: any[];
        dashedLines: any[];
    }[]>;
    /**
     * shipment 状态点
     * @param details
     */
    getIconListByDetails(details: ShipmentDetail[]): Observable<{
        point: number[];
        template: any;
        icon: string;
        data?: any;
    }[]>;
}
