/**
 * @fileoverview added by tsickle
 * Generated from: lib/service/shipment.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { catchError, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { flatten } from 'lodash';
import { FreightMethodType } from '@cityocean/basicdata-library';
import { ComponentToHtmlService, AmapService } from '@cityocean/amap-library';
import { ShipmentStatusEnum } from '../entities/shipmentStatus';
import * as i0 from "@angular/core";
import * as i1 from "@cityocean/common-library";
import * as i2 from "@cityocean/amap-library";
export class ShipmentService {
    /**
     * @param {?} http
     * @param {?} amapService
     * @param {?} componentToHtmlService
     */
    constructor(http, amapService, componentToHtmlService) {
        this.http = http;
        this.amapService = amapService;
        this.componentToHtmlService = componentToHtmlService;
    }
    /**
     * @param {?} json
     * @return {?}
     */
    GetAll(json) {
        return this.http.postJson('/CSP/Shipment/GetAllList', json)
            .pipe(map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            /** @type {?} */
            const temp = data.items;
            temp.forEach((/**
             * @param {?} s
             * @return {?}
             */
            s => {
                s.agreement = s.routeDetails.consigneeInfos.length === 0 && s.routeDetails.shipperInfos.length === 0 ? 'cy-cy' : s.routeDetails.shipperInfos.length === 0 ? 'cy-door' : s.routeDetails.consigneeInfos.length === 0 ? 'door-cy' : 'door-door';
                s.transportType = s.freightMethodType === FreightMethodType.Ocean ? 'ship' : 'air';
                try {
                    s.shiperShow = s.routeDetails.shipperInfos.length && s.routeDetails.shipperInfos[0].shipperNetWorkInfo.name || '';
                    s.consigneeShow = s.routeDetails.consigneeInfos.length && s.routeDetails.consigneeInfos[0].consigneeNetWorkInfo.name || '';
                }
                catch (e) {
                    console.log(e);
                }
                s.state = s.status;
                if (s.containerList) {
                    s.containerListShow = '';
                    s.containerList.forEach((/**
                     * @param {?} sc
                     * @return {?}
                     */
                    sc => {
                        s.containerListShow += `${sc.count}*${sc.code}` + ' ';
                    }));
                }
            }));
            return data;
        })));
    }
    /**
     * @return {?}
     */
    getStatistics() {
        /** @type {?} */
        const url = `/CSP/Shipment/GetShipmentsStatistics`;
        return this.http.get(url);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    GetDetail(id) {
        return (/** @type {?} */ (this.http.get('/CSP/Shipment/GetDetail', { id })));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    GetShipmentDetail(id) {
        return this.http.get('/CSP/Shipment/GetShipmentDetail', { id });
    }
    /**
     * @param {?=} pointList
     * @return {?}
     */
    getMapShipRoute(pointList = []) {
        /** @type {?} */
        let mapIconList = [];
        /** @type {?} */
        let line = [];
        /** @type {?} */
        const point = {
            yantian: { coor: [-247.388497, 22.551956], iconClass: 'icon-icon_oceanshipmentx' },
            guangzhou: { coor: [-246.629063, 22.594968], iconClass: 'icon-icon_oceanshipmentx' },
            angeles: { coor: [-118.243707, 34.053945], iconClass: 'icon-icon_oceanshipmentx' },
        };
        /*const result = e.some(o => o.name.includes('benefit')) &&
              e.some(o => o.name.includes('angeles')) &&
              e.some(o => o.name.includes('yantian'));*/
        /** @type {?} */
        const transportType = {
            ship: 'icon-icon_oceanshipmentx',
            air: 'icon-icon_airshipmentx',
        };
        /** @type {?} */
        const result = pointList.filter((/**
         * @param {?} o
         * @return {?}
         */
        o => {
            return o.name.includes('guangzhou') || o.name.includes('angeles') || o.name.includes('yantian');
        }));
        /** @type {?} */
        const random = (/**
         * @param {?} arr
         * @return {?}
         */
        (arr) => {
            return arr.map((/**
             * @param {?} o
             * @return {?}
             */
            o => o += Math.random()));
        });
        if (result.length >= 1) {
            mapIconList = result.map((/**
             * @param {?} o
             * @return {?}
             */
            o => {
                if (o.name.includes('guangzhou')) {
                    return Object.assign({}, point.guangzhou, { id: o.id, theme: o.isDanger ? 'error' : '', iconClass: transportType[o.transportType] });
                }
                if (o.name.includes('angeles')) {
                    return Object.assign({}, point.angeles, { id: o.id, start: false, theme: o.isDanger ? 'error' : '', iconClass: transportType[o.transportType] });
                }
                if (o.name.includes('yantian')) {
                    return Object.assign({}, point.yantian, { id: o.id, theme: o.isDanger ? 'error' : '', iconClass: transportType[o.transportType] });
                }
            }));
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
    /**
     * @param {?=} param
     * @return {?}
     */
    createShare(param = {}) {
        return this.http.postJson('/CSP/ShipmentShareLink/Create', param);
    }
    /**
     * @param {?=} param
     * @return {?}
     */
    getShareHistory(param = {}) {
        /** @type {?} */
        const url = `/CSP/ShipmentShareLink/GetAll`;
        return this.http.get(url, param);
    }
    /**
     * @param {?} param
     * @return {?}
     */
    shareSend(param) {
        /** @type {?} */
        const url = `/CSP/ShipmentShareLink/Update`;
        return this.http.put(url, param);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    shareCancel(id) {
        /** @type {?} */
        const url = `/CSP/ShipmentShareLink/Cancel`;
        return this.http.postJson(url, { id });
    }
    /**
     * @param {?} param
     * @return {?}
     */
    getShipTrack(param) {
        /** @type {?} */
        const url = `/PUB/VesselInfos/GetShipTrack`;
        if (!param.needCount)
            param.needCount = 100;
        return this.http.get(`${url}?VesselName=CMA%20CGM%20ORFEO&StartTime=12/15/2019%201:00:00%20AM&EndTime=1/19/2020%201:00:00%20AM&needCount=10000`)
            // return this.http.get(url, param)
            .pipe(map((/**
         * @param {?} o
         * @return {?}
         */
        (o) => {
            return o.map((/**
             * @param {?} point
             * @return {?}
             */
            point => {
                return (/** @type {?} */ (Object.assign({}, point, { point: [point.longitudeDegree, point.latitudeDegree] })));
            }));
        })));
    }
    /**
     * @param {?} res
     * @return {?}
     */
    getShipmentTrackByRes(res) {
        /** @type {?} */
        const route = res.routeDetails;
        return this.getShipTrack({
            vesselName: res.vessel,
            startTime: route.estDepatureOrginPortDate,
            endTime: route.estArrivalDestinationPortDate
        });
    }
    /**
     * @param {?} parm
     * @return {?}
     */
    getAllPortsForOthers(parm) {
        return this.http.get('/CSP/Shipment/GetAllPortsForOthers', parm);
    }
    /**
     * @param {?} parm
     * @return {?}
     */
    getAllLocationsForOthers(parm) {
        return this.http.get('/CSP/Shipment/GetAllLocationsForOthers', parm);
    }
    /**
     * @return {?}
     */
    getAllCompanyForOthers() {
        return this.http.get('/CSP/Shipment/GetAllCompanyForOthers');
    }
    /**
     * @param {?} param
     * @return {?}
     */
    createOrUpdateConditionGroup(param) {
        return this.http.postJson('/Platform/BusinessFilter/CreateOrUpdateConditionGroup', param);
    }
    /**
     * @param {?} Id
     * @return {?}
     */
    getShipmentLinkDetail(Id) {
        /** @type {?} */
        let params = { Id };
        return this.http.get('/CSP/ShipmentShareLink/GetDetail', params);
    }
    /**
     * shipment 的路线
     * @param {?} details
     *   目前参数是数组，应该用不到数组传进来的应该都是单个
     * @return {?}
     */
    getShipmentMapDataByDetails(details) {
        return forkJoin(details.map((/**
         * @param {?} detail
         * @return {?}
         */
        detail => {
            return new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            (resolve) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                try {
                    /** @type {?} */
                    const icons = [];
                    /** @type {?} */
                    const lines = [];
                    /** @type {?} */
                    const dashedLines = [];
                    /** @type {?} */
                    let track = [];
                    /** @type {?} */
                    const portAddress = [detail.routeDetails.originPort, detail.routeDetails.destinationPort].map((/**
                     * @param {?} port
                     * @return {?}
                     */
                    port => `${port.name},${port.fullName}`));
                    /** @type {?} */
                    const portPointList = (yield forkJoin(portAddress.map((/**
                     * @param {?} o
                     * @return {?}
                     */
                    o => this.amapService.googleGeo(o)))).toPromise())
                        .map((/**
                     * @param {?} o
                     * @return {?}
                     */
                    o => [o.geometry.location.lng, o.geometry.location.lat]));
                    if (detail.freightMethodType === FreightMethodType.Ocean) {
                        // port icon
                        icons.push({
                            point: portPointList[0],
                            icon: 'icon-port',
                        }, { point: portPointList[1], icon: 'icon-port' });
                        track = yield (this.getShipmentTrackByRes(detail)
                            .pipe(map((/**
                         * @param {?} o
                         * @return {?}
                         */
                        o => o.map((/**
                         * @param {?} p
                         * @return {?}
                         */
                        p => p.point)))))
                            .toPromise());
                        // display when on the way
                        if (track.length && detail.status === ShipmentStatusEnum.InTransitToArrivalPort) {
                            icons.push({
                                point: track[track.length - 1],
                                icon: 'icon-ship-round',
                            });
                        }
                    }
                    else {
                        // port icon
                        icons.push({
                            point: portPointList[0],
                            icon: 'icon-port',
                        }, { point: portPointList[1], icon: 'icon-port' });
                        // display when on the way
                        if (detail.status === ShipmentStatusEnum.InTransitToArrivalPort) {
                            icons.push({
                                point: [track[0][0] + track[1][0], track[0][1] + track[1][1]]
                                    /*track.reduce(
                                      (acc: [number, number], cur: [number, number]) => acc.map((val, i) => [val + cur[i]])
                                    )*/ .map((/**
                                 * @param {?} o
                                 * @return {?}
                                 */
                                o => o / 2)),
                                icon: 'icon-airplane',
                            });
                        }
                    }
                    // track start and end at port
                    track.unshift(portPointList[0]);
                    track.push(portPointList[1]);
                    // on the way or finished
                    if ([ShipmentStatusEnum.InTransitToArrivalPort, ShipmentStatusEnum.ArrivalPort].includes(detail.status)) {
                        lines.push(track);
                    }
                    dashedLines.push(track);
                    /** @type {?} */
                    const address = yield Promise.all([
                        forkJoin(detail.routeDetails.shipperInfos.map((/**
                         * @param {?} o
                         * @return {?}
                         */
                        o => this.amapService.googleGeo(o.shipperNetWorkInfo.streetAddress)))).toPromise(),
                        forkJoin(detail.routeDetails.consigneeInfos.map((/**
                         * @param {?} o
                         * @return {?}
                         */
                        o => this.amapService.googleGeo(o.consigneeNetWorkInfo.streetAddress)))).toPromise(),
                    ]);
                    const [shipperAddressList, consigneeAddressList] = address.map((/**
                     * @param {?} o
                     * @return {?}
                     */
                    o => o ? o : []));
                    [shipperAddressList, consigneeAddressList].forEach((/**
                     * @param {?} addressList
                     * @param {?} index
                     * @return {?}
                     */
                    (addressList, index) => {
                        addressList.map((/**
                         * @param {?} geo
                         * @return {?}
                         */
                        geo => {
                            /** @type {?} */
                            const point = [geo.geometry.location.lng, geo.geometry.location.lat];
                            icons.push({
                                point,
                                icon: 'icon-warehouse',
                            });
                            switch (index) {
                                case 0:
                                    dashedLines.push([point, track[0]]);
                                    if (detail.status > ShipmentStatusEnum.InTransitToDeparturePort) {
                                        lines.push([point, track[0]]);
                                    }
                                    else if (detail.status === ShipmentStatusEnum.InTransitToDeparturePort) {
                                        icons.push({
                                            point: [point[0] + track[0][0], point[1] + track[0][1]].map((/**
                                             * @param {?} o
                                             * @return {?}
                                             */
                                            o => o / 2)),
                                            icon: 'icon-truck',
                                        });
                                    }
                                    break;
                                case 1:
                                    dashedLines.push([track[track.length - 1], point]);
                                    if (detail.status > ShipmentStatusEnum.InTransitToFinalDestination) {
                                        lines.push([track[track.length - 1], point]);
                                    }
                                    else if (detail.status === ShipmentStatusEnum.InTransitToFinalDestination) {
                                        icons.push({
                                            point: [point[0] + track[track.length - 1][0], point[1] + track[track.length - 1][1]].map((/**
                                             * @param {?} o
                                             * @return {?}
                                             */
                                            o => o / 2)),
                                            icon: 'icon-truck',
                                        });
                                    }
                                    break;
                                default:
                            }
                        }));
                    }));
                    resolve({ icons, lines, dashedLines });
                }
                catch (e) {
                    console.error(e);
                    resolve(null);
                }
            })));
        }))).pipe(map((/**
         * @param {?} o
         * @return {?}
         */
        o => o.filter((/**
         * @param {?} p
         * @return {?}
         */
        p => p)))));
    }
    /**
     * shipment 状态点
     * @param {?} details
     * @return {?}
     */
    getIconListByDetails(details) {
        /** @type {?} */
        const iconFactory = (/**
         * @param {?} p
         * @param {?} icon
         * @param {?} detail
         * @return {?}
         */
        (p, icon, detail) => ({
            point: [
                p.geometry.location.lng + Math.random() * 0.008 - 0.004,
                p.geometry.location.lat + Math.random() * 0.008 - 0.004,
            ],
            template: this.componentToHtmlService.getShipmentTemplate(detail),
            icon,
            data: detail,
        }));
        /** @type {?} */
        const portIconFactory = (/**
         * @param {?} port
         * @param {?} detail
         * @return {?}
         */
        (port, detail) => this.amapService.googleGeo(`${port.name} ${port.fullName}`)
            .pipe(map((/**
         * @param {?} o
         * @return {?}
         */
        o => iconFactory(o, detail.freightMethodType === FreightMethodType.Ocean ? 'icon-ship-round' : 'icon-airplane', detail)))).toPromise());
        /** @type {?} */
        const airFreightTypeIconFactory = (/**
         * @param {?} detail
         * @return {?}
         */
        (detail) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const portAddress = [detail.routeDetails.originPort, detail.routeDetails.destinationPort].map((/**
             * @param {?} port
             * @return {?}
             */
            port => `${port.name},${port.fullName}`));
            /** @type {?} */
            const track = (yield forkJoin(portAddress.map((/**
             * @param {?} o
             * @return {?}
             */
            o => this.amapService.googleGeo(o)))).toPromise())
                .map((/**
             * @param {?} o
             * @return {?}
             */
            o => [o.geometry.location.lng, o.geometry.location.lat]));
            /** @type {?} */
            const icons = {
                point: track.reduce((/**
                 * @param {?} acc
                 * @param {?} cur
                 * @return {?}
                 */
                (acc, cur) => acc.map((/**
                 * @param {?} val
                 * @param {?} i
                 * @return {?}
                 */
                (val, i) => val + cur[i])))).map((/**
                 * @param {?} o
                 * @return {?}
                 */
                o => o / 2)),
                icon: 'icon-airplane',
                template: this.componentToHtmlService.getShipmentTemplate(detail),
                data: detail
            };
            return icons;
        }));
        /** @type {?} */
        const truckIconFactory = (/**
         * @param {?} repoList
         * @param {?} port
         * @param {?} detail
         * @return {?}
         */
        (repoList, port, detail) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const geoList = yield forkJoin(repoList.map((/**
             * @param {?} o
             * @return {?}
             */
            o => this.amapService.googleGeo(o.shipperNetWorkInfo.streetAddress)))).toPromise();
            /** @type {?} */
            const portGeo = yield this.amapService.googleGeo(`${port.name},${port.fullname}`).toPromise();
            return geoList.map((/**
             * @param {?} geo
             * @return {?}
             */
            geo => {
                geo.geometry.location.lng = (geo.geometry.location.lng + portGeo.geometry.location.lng) / 2;
                geo.geometry.location.lat = (geo.geometry.location.lat + portGeo.geometry.location.lat) / 2;
                return iconFactory(geo, 'icon-truck', detail);
            }));
        }));
        return forkJoin(
        // map to icon array
        details.map((/**
         * @param {?} detail
         * @return {?}
         */
        (detail) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                /** @type {?} */
                const originPort = detail.routeDetails.originPort;
                /** @type {?} */
                const destinationPort = detail.routeDetails.destinationPort;
                // assemble icons
                switch (detail.status) {
                    case ShipmentStatusEnum.SellerLocation:
                    case ShipmentStatusEnum.OriginStopOff:
                    case ShipmentStatusEnum.InTransitToDeparturePort:
                        return forkJoin(detail.routeDetails.shipperInfos.map((/**
                         * @param {?} o
                         * @return {?}
                         */
                        o => this.amapService.googleGeo(o.shipperNetWorkInfo.streetAddress)))).pipe(map((/**
                         * @param {?} o
                         * @return {?}
                         */
                        o => o.map((/**
                         * @param {?} p
                         * @return {?}
                         */
                        p => iconFactory(p, 'icon-warehouse-round', detail)))))).toPromise();
                    case ShipmentStatusEnum.DeparturePort:
                        return portIconFactory(detail.routeDetails.originPort, detail);
                    case ShipmentStatusEnum.InTransitToArrivalPort:
                        // ship: if has track data display last point, else in port
                        // air: display in way
                        return detail.freightMethodType === FreightMethodType.Ocean ?
                            this.getShipmentTrackByRes(detail)
                                .pipe(map((/**
                             * @param {?} o
                             * @return {?}
                             */
                            o => o.length ? iconFactory({ geometry: { location: { lng: o[length - 1].point[0], lat: o[length - 1].point[1] } } }, 'icon-ship-round', detail) : portIconFactory(detail.routeDetails.originPort, detail)))).toPromise()
                            : airFreightTypeIconFactory(detail);
                    case ShipmentStatusEnum.ArrivalPort:
                        return portIconFactory(detail.routeDetails.destinationPort, detail);
                    case ShipmentStatusEnum.InTransitToFinalDestination:
                        return truckIconFactory(detail.routeDetails.consigneeInfos, detail.routeDetails.destinationPort, detail);
                    case ShipmentStatusEnum.FinalDestination:
                        return forkJoin(detail.routeDetails.consigneeInfos.map((/**
                         * @param {?} o
                         * @return {?}
                         */
                        o => this.amapService.googleGeo(o.consigneeNetWorkInfo.streetAddress)))).pipe(map((/**
                         * @param {?} o
                         * @return {?}
                         */
                        o => o.map((/**
                         * @param {?} p
                         * @return {?}
                         */
                        p => iconFactory(p, 'icon-warehouse-round', detail)))))).toPromise();
                    default:
                }
            }
            catch (e) {
                console.error(e);
                return [];
            }
        })))).pipe(catchError((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            console.error(e);
            return of([]);
        })), map((/**
         * @param {?} o
         * @return {?}
         */
        o => flatten(o))));
    }
}
ShipmentService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ShipmentService.ctorParameters = () => [
    { type: HttpService },
    { type: AmapService },
    { type: ComponentToHtmlService }
];
/** @nocollapse */ ShipmentService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ShipmentService_Factory() { return new ShipmentService(i0.ɵɵinject(i1.HttpService), i0.ɵɵinject(i2.AmapService), i0.ɵɵinject(i2.ComponentToHtmlService)); }, token: ShipmentService, providedIn: "root" });
if (false) {
    /** @type {?} */
    ShipmentService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    ShipmentService.prototype.amapService;
    /**
     * @type {?}
     * @private
     */
    ShipmentService.prototype.componentToHtmlService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcG1lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjaXR5b2NlYW4vc2hpcG1lbnQtbGlicmFyeS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlL3NoaXBtZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWpDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWpFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUtoRSxNQUFNLE9BQU8sZUFBZTs7Ozs7O0lBQzFCLFlBQ1MsSUFBaUIsRUFDaEIsV0FBd0IsRUFDeEIsc0JBQThDO1FBRi9DLFNBQUksR0FBSixJQUFJLENBQWE7UUFDaEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtJQUV4RCxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxJQUEySjtRQUNoSyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLDBCQUEwQixFQUFFLElBQUksQ0FBQzthQUN4RCxJQUFJLENBQUMsR0FBRzs7OztRQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7O2tCQUNoQixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUs7WUFDdkIsSUFBSSxDQUFDLE9BQU87Ozs7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QUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNmLENBQUMsRUFBQyxFQUNGLEdBQUc7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUNyQixDQUFBO0lBQ0gsQ0FBQzs7O1lBMVpGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQWJRLFdBQVc7WUFRYSxXQUFXO1lBQW5DLHNCQUFzQjs7Ozs7SUFRM0IsK0JBQXdCOzs7OztJQUN4QixzQ0FBZ0M7Ozs7O0lBQ2hDLGlEQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICdAY2l0eW9jZWFuL2NvbW1vbi1saWJyYXJ5JztcclxuaW1wb3J0IHsgVHJhbnNwb3J0YXRpb25Nb2RlIH0gZnJvbSAnLi4vY2xhc3MvVHJhbnNwb3J0YXRpb25Nb2RlJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBmb3JrSm9pbiwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmxhdHRlbiB9IGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IFNoaXBtZW50RGV0YWlsIH0gZnJvbSAnLi4vZW50aXRpZXMvU2hpcG1lbnREZXRhaWwnO1xyXG5pbXBvcnQgeyBGcmVpZ2h0TWV0aG9kVHlwZSB9IGZyb20gJ0BjaXR5b2NlYW4vYmFzaWNkYXRhLWxpYnJhcnknO1xyXG5pbXBvcnQgeyBWZXNzZWxUcmFja1BvaW50IH0gZnJvbSAnLi4vZW50aXRpZXMvVmVzc2VsVHJhY2tQb2ludCc7XHJcbmltcG9ydCB7IENvbXBvbmVudFRvSHRtbFNlcnZpY2UsIEFtYXBTZXJ2aWNlIH0gZnJvbSAnQGNpdHlvY2Vhbi9hbWFwLWxpYnJhcnknO1xyXG5pbXBvcnQgeyBTaGlwbWVudFN0YXR1c0VudW0gfSBmcm9tICcuLi9lbnRpdGllcy9zaGlwbWVudFN0YXR1cyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaGlwbWVudFNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGh0dHA6IEh0dHBTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhbWFwU2VydmljZTogQW1hcFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbXBvbmVudFRvSHRtbFNlcnZpY2U6IENvbXBvbmVudFRvSHRtbFNlcnZpY2UsXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBHZXRBbGwoanNvbjogeyBTZWFyY2hLZXk/OiBzdHJpbmcsIElzRGVsaXZlcmVkPzogYm9vbGVhbiwgVHJhbnNwb3J0YXRpb25Nb2RlPzogVHJhbnNwb3J0YXRpb25Nb2RlLCBTb3J0aW5nPzogc3RyaW5nLCBNYXhSZXN1bHRDb3VudD86IG51bWJlciwgU2tpcENvdW50PzogbnVtYmVyIH0pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpzb24oJy9DU1AvU2hpcG1lbnQvR2V0QWxsTGlzdCcsIGpzb24pXHJcbiAgICAgIC5waXBlKG1hcCgoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGVtcCA9IGRhdGEuaXRlbXM7XHJcbiAgICAgICAgdGVtcC5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICAgICAgcy5hZ3JlZW1lbnQgPSBzLnJvdXRlRGV0YWlscy5jb25zaWduZWVJbmZvcy5sZW5ndGggPT09IDAgJiYgcy5yb3V0ZURldGFpbHMuc2hpcHBlckluZm9zLmxlbmd0aCA9PT0gMCA/ICdjeS1jeScgOiBzLnJvdXRlRGV0YWlscy5zaGlwcGVySW5mb3MubGVuZ3RoID09PSAwID8gJ2N5LWRvb3InIDogcy5yb3V0ZURldGFpbHMuY29uc2lnbmVlSW5mb3MubGVuZ3RoID09PSAwID8gJ2Rvb3ItY3knIDogJ2Rvb3ItZG9vcic7XHJcbiAgICAgICAgICBzLnRyYW5zcG9ydFR5cGUgPSBzLmZyZWlnaHRNZXRob2RUeXBlID09PSBGcmVpZ2h0TWV0aG9kVHlwZS5PY2VhbiA/ICdzaGlwJyA6ICdhaXInO1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcy5zaGlwZXJTaG93ID0gcy5yb3V0ZURldGFpbHMuc2hpcHBlckluZm9zLmxlbmd0aCAmJiBzLnJvdXRlRGV0YWlscy5zaGlwcGVySW5mb3NbMF0uc2hpcHBlck5ldFdvcmtJbmZvLm5hbWUgfHwgJyc7XHJcbiAgICAgICAgICAgIHMuY29uc2lnbmVlU2hvdyA9IHMucm91dGVEZXRhaWxzLmNvbnNpZ25lZUluZm9zLmxlbmd0aCAmJiBzLnJvdXRlRGV0YWlscy5jb25zaWduZWVJbmZvc1swXS5jb25zaWduZWVOZXRXb3JrSW5mby5uYW1lIHx8ICcnO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHMuc3RhdGUgPSBzLnN0YXR1cztcclxuICAgICAgICAgIGlmIChzLmNvbnRhaW5lckxpc3QpIHtcclxuICAgICAgICAgICAgcy5jb250YWluZXJMaXN0U2hvdyA9ICcnO1xyXG4gICAgICAgICAgICBzLmNvbnRhaW5lckxpc3QuZm9yRWFjaChzYyA9PiB7XHJcbiAgICAgICAgICAgICAgcy5jb250YWluZXJMaXN0U2hvdyArPSBgJHtzYy5jb3VudH0qJHtzYy5jb2RlfWAgKyAnICc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBnZXRTdGF0aXN0aWNzKCkge1xyXG4gICAgY29uc3QgdXJsID0gYC9DU1AvU2hpcG1lbnQvR2V0U2hpcG1lbnRzU3RhdGlzdGljc2A7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpO1xyXG4gIH1cclxuXHJcbiAgR2V0RGV0YWlsKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPFNoaXBtZW50RGV0YWlsPiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCgnL0NTUC9TaGlwbWVudC9HZXREZXRhaWwnLCB7aWR9KSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBHZXRTaGlwbWVudERldGFpbChpZDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCgnL0NTUC9TaGlwbWVudC9HZXRTaGlwbWVudERldGFpbCcsIHtpZH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWFwU2hpcFJvdXRlKHBvaW50TGlzdCA9IFtdKSB7XHJcbiAgICBsZXQgbWFwSWNvbkxpc3QgPSBbXTtcclxuICAgIGxldCBsaW5lID0gW107XHJcbiAgICBjb25zdCBwb2ludCA9IHtcclxuICAgICAgeWFudGlhbjoge2Nvb3I6IFstMjQ3LjM4ODQ5NywgMjIuNTUxOTU2XSwgaWNvbkNsYXNzOiAnaWNvbi1pY29uX29jZWFuc2hpcG1lbnR4J30sXHJcbiAgICAgIGd1YW5nemhvdToge2Nvb3I6IFstMjQ2LjYyOTA2MywgMjIuNTk0OTY4XSwgaWNvbkNsYXNzOiAnaWNvbi1pY29uX29jZWFuc2hpcG1lbnR4J30sXHJcbiAgICAgIGFuZ2VsZXM6IHtjb29yOiBbLTExOC4yNDM3MDcsIDM0LjA1Mzk0NV0sIGljb25DbGFzczogJ2ljb24taWNvbl9vY2VhbnNoaXBtZW50eCd9LFxyXG4gICAgfTtcclxuICAgIC8qY29uc3QgcmVzdWx0ID0gZS5zb21lKG8gPT4gby5uYW1lLmluY2x1ZGVzKCdiZW5lZml0JykpICYmXHJcbiAgICAgIGUuc29tZShvID0+IG8ubmFtZS5pbmNsdWRlcygnYW5nZWxlcycpKSAmJlxyXG4gICAgICBlLnNvbWUobyA9PiBvLm5hbWUuaW5jbHVkZXMoJ3lhbnRpYW4nKSk7Ki9cclxuICAgIGNvbnN0IHRyYW5zcG9ydFR5cGUgPSB7XHJcbiAgICAgIHNoaXA6ICdpY29uLWljb25fb2NlYW5zaGlwbWVudHgnLFxyXG4gICAgICBhaXI6ICdpY29uLWljb25fYWlyc2hpcG1lbnR4JyxcclxuICAgIH07XHJcbiAgICBjb25zdCByZXN1bHQgPSBwb2ludExpc3QuZmlsdGVyKG8gPT4ge1xyXG4gICAgICByZXR1cm4gby5uYW1lLmluY2x1ZGVzKCdndWFuZ3pob3UnKSB8fCBvLm5hbWUuaW5jbHVkZXMoJ2FuZ2VsZXMnKSB8fCBvLm5hbWUuaW5jbHVkZXMoJ3lhbnRpYW4nKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgcmFuZG9tID0gKGFycjogbnVtYmVyW10pID0+IHtcclxuICAgICAgcmV0dXJuIGFyci5tYXAobyA9PiBvICs9IE1hdGgucmFuZG9tKCkpO1xyXG4gICAgfTtcclxuICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcclxuICAgICAgbWFwSWNvbkxpc3QgPSByZXN1bHQubWFwKG8gPT4ge1xyXG4gICAgICAgIGlmIChvLm5hbWUuaW5jbHVkZXMoJ2d1YW5nemhvdScpKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5wb2ludC5ndWFuZ3pob3UsXHJcbiAgICAgICAgICAgIGlkOiBvLmlkLFxyXG4gICAgICAgICAgICB0aGVtZTogby5pc0RhbmdlciA/ICdlcnJvcicgOiAnJyxcclxuICAgICAgICAgICAgaWNvbkNsYXNzOiB0cmFuc3BvcnRUeXBlW28udHJhbnNwb3J0VHlwZV0sXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoby5uYW1lLmluY2x1ZGVzKCdhbmdlbGVzJykpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC4uLnBvaW50LmFuZ2VsZXMsXHJcbiAgICAgICAgICAgIGlkOiBvLmlkLFxyXG4gICAgICAgICAgICBzdGFydDogZmFsc2UsXHJcbiAgICAgICAgICAgIHRoZW1lOiBvLmlzRGFuZ2VyID8gJ2Vycm9yJyA6ICcnLFxyXG4gICAgICAgICAgICBpY29uQ2xhc3M6IHRyYW5zcG9ydFR5cGVbby50cmFuc3BvcnRUeXBlXSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvLm5hbWUuaW5jbHVkZXMoJ3lhbnRpYW4nKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4ucG9pbnQueWFudGlhbixcclxuICAgICAgICAgICAgaWQ6IG8uaWQsXHJcbiAgICAgICAgICAgIHRoZW1lOiBvLmlzRGFuZ2VyID8gJ2Vycm9yJyA6ICcnLFxyXG4gICAgICAgICAgICBpY29uQ2xhc3M6IHRyYW5zcG9ydFR5cGVbby50cmFuc3BvcnRUeXBlXSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgLyptYXBJY29uTGlzdC5mb3JFYWNoKG8gPT4ge1xyXG4gICAgICAgIG8uY29vciA9IHJhbmRvbShvLmNvb3IpO1xyXG4gICAgICB9KTsqL1xyXG4gICAgICAvKnRoaXMuZmFrZU1hcERhdGEgPSBbXHJcbiAgICAgICAgeyBjb29yOiBbLTI0Ni43ODg0OTcsIDIzLjEyMTk1Nl0sIGljb25DbGFzczogJ2ljb24taWNvbl9vY2VhbnNoaXBtZW50eCcgfSxcclxuICAgICAgICB7IGNvb3I6IFstMjQ3LjM4ODQ5NywgMjIuNTUxOTU2XSwgaWNvbkNsYXNzOiAnaWNvbi1pY29uX29jZWFuc2hpcG1lbnR4JyB9LFxyXG4gICAgICAgIHsgY29vcjogWy0yNDYuNjI5MDYzLCAyMi41OTQ5NjhdLCBpY29uQ2xhc3M6ICdpY29uLWljb25fb2NlYW5zaGlwbWVudHgnIH0sXHJcbiAgICAgICAgeyBjb29yOiBbLTExOC4yNDM3MDcsIDM0LjA1Mzk0NV0sIGljb25DbGFzczogJ2ljb24taWNvbl9vY2VhbnNoaXBtZW50eCcgfSxcclxuICAgICAgXTsgKi9cclxuICAgICAgaWYgKHJlc3VsdFswXSAmJiByZXN1bHRbMF0uc3RhcnQgIT09IGZhbHNlKSB7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2ljb25MaXN0OiBtYXBJY29uTGlzdCwgbGluZX07XHJcbiAgfVxyXG5cclxuICBjcmVhdGVTaGFyZShwYXJhbSA9IHt9KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKc29uKCcvQ1NQL1NoaXBtZW50U2hhcmVMaW5rL0NyZWF0ZScsIHBhcmFtKTtcclxuICB9XHJcblxyXG4gIGdldFNoYXJlSGlzdG9yeShwYXJhbSA9IHt9KSB7XHJcbiAgICBjb25zdCB1cmwgPSBgL0NTUC9TaGlwbWVudFNoYXJlTGluay9HZXRBbGxgO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCBwYXJhbSk7XHJcbiAgfVxyXG5cclxuICBzaGFyZVNlbmQocGFyYW0pIHtcclxuICAgIGNvbnN0IHVybCA9IGAvQ1NQL1NoaXBtZW50U2hhcmVMaW5rL1VwZGF0ZWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh1cmwsIHBhcmFtKTtcclxuICB9XHJcblxyXG4gIHNoYXJlQ2FuY2VsKGlkOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHVybCA9IGAvQ1NQL1NoaXBtZW50U2hhcmVMaW5rL0NhbmNlbGA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKc29uKHVybCwge2lkfSk7XHJcbiAgfVxyXG5cclxuICBnZXRTaGlwVHJhY2socGFyYW06IHsgdmVzc2VsTmFtZTogc3RyaW5nLCBzdGFydFRpbWU6IHN0cmluZywgZW5kVGltZTogc3RyaW5nLCBuZWVkQ291bnQ/OiBudW1iZXIgfSk6IE9ic2VydmFibGU8VmVzc2VsVHJhY2tQb2ludFtdPiB7XHJcbiAgICBjb25zdCB1cmwgPSBgL1BVQi9WZXNzZWxJbmZvcy9HZXRTaGlwVHJhY2tgO1xyXG4gICAgaWYgKCFwYXJhbS5uZWVkQ291bnQpIHBhcmFtLm5lZWRDb3VudCA9IDEwMDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3VybH0/VmVzc2VsTmFtZT1DTUElMjBDR00lMjBPUkZFTyZTdGFydFRpbWU9MTIvMTUvMjAxOSUyMDE6MDA6MDAlMjBBTSZFbmRUaW1lPTEvMTkvMjAyMCUyMDE6MDA6MDAlMjBBTSZuZWVkQ291bnQ9MTAwMDBgKVxyXG4gICAgLy8gcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCBwYXJhbSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChvOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG8ubWFwKHBvaW50ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAuLi5wb2ludCxcclxuICAgICAgICAgICAgICBwb2ludDogW3BvaW50LmxvbmdpdHVkZURlZ3JlZSwgcG9pbnQubGF0aXR1ZGVEZWdyZWVdLFxyXG4gICAgICAgICAgICB9IGFzIGFueTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2hpcG1lbnRUcmFja0J5UmVzKHJlczogU2hpcG1lbnREZXRhaWwpIHtcclxuICAgIGNvbnN0IHJvdXRlID0gcmVzLnJvdXRlRGV0YWlscztcclxuICAgIHJldHVybiB0aGlzLmdldFNoaXBUcmFjayh7XHJcbiAgICAgIHZlc3NlbE5hbWU6IHJlcy52ZXNzZWwsXHJcbiAgICAgIHN0YXJ0VGltZTogcm91dGUuZXN0RGVwYXR1cmVPcmdpblBvcnREYXRlLFxyXG4gICAgICBlbmRUaW1lOiByb3V0ZS5lc3RBcnJpdmFsRGVzdGluYXRpb25Qb3J0RGF0ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGxQb3J0c0Zvck90aGVycyhwYXJtOiB7IElzRnJvbUJvb2tpbmc/OiBib29sZWFuLCBJc0Zyb21TaGlwbWVudD86IGJvb2xlYW4sIElzRnJvbU9yaWdpbj86IGJvb2xlYW4sIElzRnJvbURlc3RpbmF0aW9uPzogYm9vbGVhbiB9KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCgnL0NTUC9TaGlwbWVudC9HZXRBbGxQb3J0c0Zvck90aGVycycsIHBhcm0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsTG9jYXRpb25zRm9yT3RoZXJzKHBhcm06IHsgSXNGcm9tQm9va2luZz86IGJvb2xlYW4sIElzRnJvbVNoaXBtZW50PzogYm9vbGVhbiwgSXNGcm9tT3JpZ2luPzogYm9vbGVhbiwgSXNGcm9tRGVzdGluYXRpb24/OiBib29sZWFuIH0pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCcvQ1NQL1NoaXBtZW50L0dldEFsbExvY2F0aW9uc0Zvck90aGVycycsIHBhcm0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsQ29tcGFueUZvck90aGVycygpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCcvQ1NQL1NoaXBtZW50L0dldEFsbENvbXBhbnlGb3JPdGhlcnMnKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZU9yVXBkYXRlQ29uZGl0aW9uR3JvdXAocGFyYW0pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpzb24oJy9QbGF0Zm9ybS9CdXNpbmVzc0ZpbHRlci9DcmVhdGVPclVwZGF0ZUNvbmRpdGlvbkdyb3VwJywgcGFyYW0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2hpcG1lbnRMaW5rRGV0YWlsKElkOiBudW1iZXIpIHtcclxuICAgIGxldCBwYXJhbXMgPSB7SWR9O1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJy9DU1AvU2hpcG1lbnRTaGFyZUxpbmsvR2V0RGV0YWlsJywgcGFyYW1zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNoaXBtZW50IOeahOi3r+e6v1xyXG4gICAqIEBwYXJhbSBkZXRhaWxzXHJcbiAgICogICDnm67liY3lj4LmlbDmmK/mlbDnu4TvvIzlupTor6XnlKjkuI3liLDmlbDnu4TkvKDov5vmnaXnmoTlupTor6Xpg73mmK/ljZXkuKpcclxuICAgKi9cclxuICBnZXRTaGlwbWVudE1hcERhdGFCeURldGFpbHMoZGV0YWlsczogU2hpcG1lbnREZXRhaWxbXSk6IE9ic2VydmFibGU8e2ljb25zOiBhbnlbXSwgbGluZXM6IGFueVtdLCBkYXNoZWRMaW5lczogYW55W119W10+IHtcclxuICAgIHJldHVybiBmb3JrSm9pbihcclxuICAgICAgZGV0YWlscy5tYXAoZGV0YWlsID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8e2ljb25zOiBhbnlbXSwgbGluZXM6IGFueVtdLCBkYXNoZWRMaW5lczogYW55W119Pihhc3luYyByZXNvbHZlID0+IHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb25zID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IGRhc2hlZExpbmVzID0gW107XHJcbiAgICAgICAgICAgIGxldCB0cmFjazogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgY29uc3QgcG9ydEFkZHJlc3MgPVxyXG4gICAgICAgICAgICAgIFtkZXRhaWwucm91dGVEZXRhaWxzLm9yaWdpblBvcnQsIGRldGFpbC5yb3V0ZURldGFpbHMuZGVzdGluYXRpb25Qb3J0XS5tYXAocG9ydCA9PiBgJHtwb3J0Lm5hbWV9LCR7cG9ydC5mdWxsTmFtZX1gKTtcclxuICAgICAgICAgICAgY29uc3QgcG9ydFBvaW50TGlzdCA9IChhd2FpdCBmb3JrSm9pbihwb3J0QWRkcmVzcy5tYXAobyA9PiB0aGlzLmFtYXBTZXJ2aWNlLmdvb2dsZUdlbyhvKSkpLnRvUHJvbWlzZSgpKVxyXG4gICAgICAgICAgICAgIC5tYXAobyA9PiBbby5nZW9tZXRyeS5sb2NhdGlvbi5sbmcsIG8uZ2VvbWV0cnkubG9jYXRpb24ubGF0XSlcclxuXHJcbiAgICAgICAgICAgIGlmIChkZXRhaWwuZnJlaWdodE1ldGhvZFR5cGUgPT09IEZyZWlnaHRNZXRob2RUeXBlLk9jZWFuKSB7XHJcbiAgICAgICAgICAgICAgLy8gcG9ydCBpY29uXHJcbiAgICAgICAgICAgICAgaWNvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBwb2ludDogcG9ydFBvaW50TGlzdFswXSxcclxuICAgICAgICAgICAgICAgIGljb246ICdpY29uLXBvcnQnLFxyXG4gICAgICAgICAgICAgIH0sIHsgcG9pbnQ6IHBvcnRQb2ludExpc3RbMV0sIGljb246ICdpY29uLXBvcnQnIH0pO1xyXG4gICAgICAgICAgICAgIHRyYWNrID0gYXdhaXQgKHRoaXMuZ2V0U2hpcG1lbnRUcmFja0J5UmVzKGRldGFpbClcclxuICAgICAgICAgICAgICAgIC5waXBlKG1hcChvID0+IG8ubWFwKHAgPT4gcC5wb2ludCkpKVxyXG4gICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpKTtcclxuICAgICAgICAgICAgICAvLyBkaXNwbGF5IHdoZW4gb24gdGhlIHdheVxyXG4gICAgICAgICAgICAgIGlmICh0cmFjay5sZW5ndGggJiYgZGV0YWlsLnN0YXR1cyA9PT0gU2hpcG1lbnRTdGF0dXNFbnVtLkluVHJhbnNpdFRvQXJyaXZhbFBvcnQpIHtcclxuICAgICAgICAgICAgICAgIGljb25zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICBwb2ludDogdHJhY2tbdHJhY2subGVuZ3RoIC0gMV0sXHJcbiAgICAgICAgICAgICAgICAgIGljb246ICdpY29uLXNoaXAtcm91bmQnLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIHBvcnQgaWNvblxyXG4gICAgICAgICAgICAgIGljb25zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgcG9pbnQ6IHBvcnRQb2ludExpc3RbMF0sXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnaWNvbi1wb3J0JyxcclxuICAgICAgICAgICAgICB9LCB7IHBvaW50OiBwb3J0UG9pbnRMaXN0WzFdLCBpY29uOiAnaWNvbi1wb3J0JyB9KTtcclxuICAgICAgICAgICAgICAvLyBkaXNwbGF5IHdoZW4gb24gdGhlIHdheVxyXG4gICAgICAgICAgICAgIGlmIChkZXRhaWwuc3RhdHVzID09PSBTaGlwbWVudFN0YXR1c0VudW0uSW5UcmFuc2l0VG9BcnJpdmFsUG9ydCkge1xyXG4gICAgICAgICAgICAgICAgaWNvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgIHBvaW50OlxyXG4gICAgICAgICAgICAgICAgICAgIFt0cmFja1swXVswXSArIHRyYWNrWzFdWzBdLCB0cmFja1swXVsxXSArIHRyYWNrWzFdWzFdXVxyXG4gICAgICAgICAgICAgICAgICAgIC8qdHJhY2sucmVkdWNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgKGFjYzogW251bWJlciwgbnVtYmVyXSwgY3VyOiBbbnVtYmVyLCBudW1iZXJdKSA9PiBhY2MubWFwKCh2YWwsIGkpID0+IFt2YWwgKyBjdXJbaV1dKVxyXG4gICAgICAgICAgICAgICAgICAgICkqLy5tYXAobyA9PiBvIC8gMiksXHJcbiAgICAgICAgICAgICAgICAgIGljb246ICdpY29uLWFpcnBsYW5lJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB0cmFjayBzdGFydCBhbmQgZW5kIGF0IHBvcnRcclxuICAgICAgICAgICAgdHJhY2sudW5zaGlmdChwb3J0UG9pbnRMaXN0WzBdKTtcclxuICAgICAgICAgICAgdHJhY2sucHVzaChwb3J0UG9pbnRMaXN0WzFdKTtcclxuICAgICAgICAgICAgLy8gb24gdGhlIHdheSBvciBmaW5pc2hlZFxyXG4gICAgICAgICAgICBpZiAoW1NoaXBtZW50U3RhdHVzRW51bS5JblRyYW5zaXRUb0Fycml2YWxQb3J0LCBTaGlwbWVudFN0YXR1c0VudW0uQXJyaXZhbFBvcnRdLmluY2x1ZGVzKGRldGFpbC5zdGF0dXMpKSB7XHJcbiAgICAgICAgICAgICAgbGluZXMucHVzaCh0cmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGFzaGVkTGluZXMucHVzaCh0cmFjayk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICAgIGZvcmtKb2luKFxyXG4gICAgICAgICAgICAgICAgZGV0YWlsLnJvdXRlRGV0YWlscy5zaGlwcGVySW5mb3MubWFwKG8gPT4gdGhpcy5hbWFwU2VydmljZS5nb29nbGVHZW8oby5zaGlwcGVyTmV0V29ya0luZm8uc3RyZWV0QWRkcmVzcykpXHJcbiAgICAgICAgICAgICAgKS50b1Byb21pc2UoKSxcclxuICAgICAgICAgICAgICBmb3JrSm9pbihcclxuICAgICAgICAgICAgICAgIGRldGFpbC5yb3V0ZURldGFpbHMuY29uc2lnbmVlSW5mb3MubWFwKG8gPT4gdGhpcy5hbWFwU2VydmljZS5nb29nbGVHZW8oby5jb25zaWduZWVOZXRXb3JrSW5mby5zdHJlZXRBZGRyZXNzKSlcclxuICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpLFxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IFtzaGlwcGVyQWRkcmVzc0xpc3QsIGNvbnNpZ25lZUFkZHJlc3NMaXN0XSA9IGFkZHJlc3MubWFwKG8gPT4gbyA/IG8gOiBbXSk7XHJcbiAgICAgICAgICAgIFtzaGlwcGVyQWRkcmVzc0xpc3QsIGNvbnNpZ25lZUFkZHJlc3NMaXN0XS5mb3JFYWNoKChhZGRyZXNzTGlzdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICBhZGRyZXNzTGlzdC5tYXAoZ2VvID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gW2dlby5nZW9tZXRyeS5sb2NhdGlvbi5sbmcsIGdlby5nZW9tZXRyeS5sb2NhdGlvbi5sYXRdO1xyXG4gICAgICAgICAgICAgICAgaWNvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgIHBvaW50LFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAnaWNvbi13YXJlaG91c2UnLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBkYXNoZWRMaW5lcy5wdXNoKFtwb2ludCwgdHJhY2tbMF1dKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGV0YWlsLnN0YXR1cyA+IFNoaXBtZW50U3RhdHVzRW51bS5JblRyYW5zaXRUb0RlcGFydHVyZVBvcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGxpbmVzLnB1c2goW3BvaW50LCB0cmFja1swXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGV0YWlsLnN0YXR1cyA9PT0gU2hpcG1lbnRTdGF0dXNFbnVtLkluVHJhbnNpdFRvRGVwYXJ0dXJlUG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWNvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50OiBbcG9pbnRbMF0gKyB0cmFja1swXVswXSwgcG9pbnRbMV0gKyB0cmFja1swXVsxXV0ubWFwKG8gPT4gbyAvIDIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnaWNvbi10cnVjaycsXHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBkYXNoZWRMaW5lcy5wdXNoKFt0cmFja1t0cmFjay5sZW5ndGggLSAxXSwgcG9pbnRdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGV0YWlsLnN0YXR1cyA+IFNoaXBtZW50U3RhdHVzRW51bS5JblRyYW5zaXRUb0ZpbmFsRGVzdGluYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGxpbmVzLnB1c2goW3RyYWNrW3RyYWNrLmxlbmd0aCAtIDFdLCBwb2ludF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGV0YWlsLnN0YXR1cyA9PT0gU2hpcG1lbnRTdGF0dXNFbnVtLkluVHJhbnNpdFRvRmluYWxEZXN0aW5hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWNvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50OiBbcG9pbnRbMF0gKyB0cmFja1t0cmFjay5sZW5ndGggLSAxXVswXSwgcG9pbnRbMV0gKyB0cmFja1t0cmFjay5sZW5ndGggLSAxXVsxXV0ubWFwKG8gPT4gbyAvIDIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnaWNvbi10cnVjaycsXHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZSh7aWNvbnMsIGxpbmVzLCBkYXNoZWRMaW5lc30pO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgKS5waXBlKFxyXG4gICAgICBtYXAobyA9PiBvLmZpbHRlcihwID0+IHApKSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzaGlwbWVudCDnirbmgIHngrlcclxuICAgKiBAcGFyYW0gZGV0YWlsc1xyXG4gICAqL1xyXG4gIGdldEljb25MaXN0QnlEZXRhaWxzKGRldGFpbHM6IFNoaXBtZW50RGV0YWlsW10pOiBPYnNlcnZhYmxlPHsgcG9pbnQ6IG51bWJlcltdLCB0ZW1wbGF0ZTogYW55LCBpY29uOiBzdHJpbmcsIGRhdGE/OiBhbnkgfVtdPiB7XHJcbiAgICBjb25zdCBpY29uRmFjdG9yeSA9IChwLCBpY29uLCBkZXRhaWwpID0+ICh7XHJcbiAgICAgIHBvaW50OiBbXHJcbiAgICAgICAgcC5nZW9tZXRyeS5sb2NhdGlvbi5sbmcgKyBNYXRoLnJhbmRvbSgpICogMC4wMDggLSAwLjAwNCwgLy8gcHJldmVudCBtdWx0aXBsZSBwb2ludHMgb24gb25lIGNvb3JcclxuICAgICAgICBwLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCArIE1hdGgucmFuZG9tKCkgKiAwLjAwOCAtIDAuMDA0LFxyXG4gICAgICBdLFxyXG4gICAgICB0ZW1wbGF0ZTogdGhpcy5jb21wb25lbnRUb0h0bWxTZXJ2aWNlLmdldFNoaXBtZW50VGVtcGxhdGUoZGV0YWlsKSxcclxuICAgICAgaWNvbixcclxuICAgICAgZGF0YTogZGV0YWlsLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcG9ydEljb25GYWN0b3J5ID0gKHBvcnQsIGRldGFpbDogU2hpcG1lbnREZXRhaWwpID0+XHJcbiAgICAgIHRoaXMuYW1hcFNlcnZpY2UuZ29vZ2xlR2VvKGAke3BvcnQubmFtZX0gJHtwb3J0LmZ1bGxOYW1lfWApXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAobyA9PiBpY29uRmFjdG9yeShvLCAgZGV0YWlsLmZyZWlnaHRNZXRob2RUeXBlID09PSBGcmVpZ2h0TWV0aG9kVHlwZS5PY2VhbiA/ICdpY29uLXNoaXAtcm91bmQnIDogJ2ljb24tYWlycGxhbmUnLCBkZXRhaWwpKVxyXG4gICAgICAgICkudG9Qcm9taXNlKCk7XHJcblxyXG4gICAgY29uc3QgYWlyRnJlaWdodFR5cGVJY29uRmFjdG9yeSA9IGFzeW5jIChkZXRhaWwpID0+IHtcclxuICAgICAgY29uc3QgcG9ydEFkZHJlc3MgPVxyXG4gICAgICAgIFtkZXRhaWwucm91dGVEZXRhaWxzLm9yaWdpblBvcnQsIGRldGFpbC5yb3V0ZURldGFpbHMuZGVzdGluYXRpb25Qb3J0XS5tYXAocG9ydCA9PiBgJHtwb3J0Lm5hbWV9LCR7cG9ydC5mdWxsTmFtZX1gKTtcclxuICAgICAgY29uc3QgdHJhY2sgPSAoYXdhaXQgZm9ya0pvaW4ocG9ydEFkZHJlc3MubWFwKG8gPT4gdGhpcy5hbWFwU2VydmljZS5nb29nbGVHZW8obykpKS50b1Byb21pc2UoKSlcclxuICAgICAgICAubWFwKG8gPT4gW28uZ2VvbWV0cnkubG9jYXRpb24ubG5nLCBvLmdlb21ldHJ5LmxvY2F0aW9uLmxhdF0pO1xyXG4gICAgICBjb25zdCBpY29ucyA9IHtcclxuICAgICAgICBwb2ludDpcclxuICAgICAgICAgIHRyYWNrLnJlZHVjZShcclxuICAgICAgICAgICAgKGFjYzogW251bWJlciwgbnVtYmVyXSwgY3VyOiBbbnVtYmVyLCBudW1iZXJdKSA9PiBhY2MubWFwKCh2YWwsIGkpID0+IHZhbCArIGN1cltpXSlcclxuICAgICAgICAgICkubWFwKG8gPT4gbyAvIDIpLFxyXG4gICAgICAgIGljb246ICdpY29uLWFpcnBsYW5lJyxcclxuICAgICAgICB0ZW1wbGF0ZTogdGhpcy5jb21wb25lbnRUb0h0bWxTZXJ2aWNlLmdldFNoaXBtZW50VGVtcGxhdGUoZGV0YWlsKSxcclxuICAgICAgICBkYXRhOiBkZXRhaWxcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIGljb25zO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCB0cnVja0ljb25GYWN0b3J5ID0gYXN5bmMgKHJlcG9MaXN0OiBhbnlbXSwgcG9ydCwgZGV0YWlsKSA9PiB7XHJcbiAgICAgIGNvbnN0IGdlb0xpc3QgPSBhd2FpdCBmb3JrSm9pbihcclxuICAgICAgICByZXBvTGlzdC5tYXAobyA9PiB0aGlzLmFtYXBTZXJ2aWNlLmdvb2dsZUdlbyhvLnNoaXBwZXJOZXRXb3JrSW5mby5zdHJlZXRBZGRyZXNzKSlcclxuICAgICAgKS50b1Byb21pc2UoKVxyXG4gICAgICBjb25zdCBwb3J0R2VvID0gYXdhaXQgdGhpcy5hbWFwU2VydmljZS5nb29nbGVHZW8oYCR7cG9ydC5uYW1lfSwke3BvcnQuZnVsbG5hbWV9YCkudG9Qcm9taXNlKCk7XHJcbiAgICAgIHJldHVybiBnZW9MaXN0Lm1hcChnZW8gPT4ge1xyXG4gICAgICAgIGdlby5nZW9tZXRyeS5sb2NhdGlvbi5sbmcgPSAoZ2VvLmdlb21ldHJ5LmxvY2F0aW9uLmxuZyArIHBvcnRHZW8uZ2VvbWV0cnkubG9jYXRpb24ubG5nKSAvIDI7XHJcbiAgICAgICAgZ2VvLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCA9IChnZW8uZ2VvbWV0cnkubG9jYXRpb24ubGF0ICsgcG9ydEdlby5nZW9tZXRyeS5sb2NhdGlvbi5sYXQpIC8gMjtcclxuICAgICAgICByZXR1cm4gaWNvbkZhY3RvcnkoZ2VvLCAnaWNvbi10cnVjaycsIGRldGFpbClcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9ya0pvaW4oXHJcbiAgICAgIC8vIG1hcCB0byBpY29uIGFycmF5XHJcbiAgICAgIGRldGFpbHMubWFwKGFzeW5jIGRldGFpbCA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IG9yaWdpblBvcnQgPSBkZXRhaWwucm91dGVEZXRhaWxzLm9yaWdpblBvcnQ7XHJcbiAgICAgICAgICBjb25zdCBkZXN0aW5hdGlvblBvcnQgPSBkZXRhaWwucm91dGVEZXRhaWxzLmRlc3RpbmF0aW9uUG9ydDtcclxuXHJcbiAgICAgICAgICAvLyBhc3NlbWJsZSBpY29uc1xyXG4gICAgICAgICAgc3dpdGNoIChkZXRhaWwuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU2hpcG1lbnRTdGF0dXNFbnVtLlNlbGxlckxvY2F0aW9uOlxyXG4gICAgICAgICAgICBjYXNlIFNoaXBtZW50U3RhdHVzRW51bS5PcmlnaW5TdG9wT2ZmOlxyXG4gICAgICAgICAgICBjYXNlIFNoaXBtZW50U3RhdHVzRW51bS5JblRyYW5zaXRUb0RlcGFydHVyZVBvcnQ6XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcmtKb2luKFxyXG4gICAgICAgICAgICAgICAgZGV0YWlsLnJvdXRlRGV0YWlscy5zaGlwcGVySW5mb3MubWFwKG8gPT4gdGhpcy5hbWFwU2VydmljZS5nb29nbGVHZW8oby5zaGlwcGVyTmV0V29ya0luZm8uc3RyZWV0QWRkcmVzcykpXHJcbiAgICAgICAgICAgICAgKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKG8gPT5cclxuICAgICAgICAgICAgICAgICAgby5tYXAoXHJcbiAgICAgICAgICAgICAgICAgICAgcCA9PiBpY29uRmFjdG9yeShwLCAnaWNvbi13YXJlaG91c2Utcm91bmQnLCBkZXRhaWwpXHJcbiAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpO1xyXG4gICAgICAgICAgICBjYXNlIFNoaXBtZW50U3RhdHVzRW51bS5EZXBhcnR1cmVQb3J0OlxyXG4gICAgICAgICAgICAgIHJldHVybiBwb3J0SWNvbkZhY3RvcnkoZGV0YWlsLnJvdXRlRGV0YWlscy5vcmlnaW5Qb3J0LCBkZXRhaWwpO1xyXG4gICAgICAgICAgICBjYXNlIFNoaXBtZW50U3RhdHVzRW51bS5JblRyYW5zaXRUb0Fycml2YWxQb3J0OlxyXG4gICAgICAgICAgICAgIC8vIHNoaXA6IGlmIGhhcyB0cmFjayBkYXRhIGRpc3BsYXkgbGFzdCBwb2ludCwgZWxzZSBpbiBwb3J0XHJcbiAgICAgICAgICAgICAgLy8gYWlyOiBkaXNwbGF5IGluIHdheVxyXG4gICAgICAgICAgICAgIHJldHVybiBkZXRhaWwuZnJlaWdodE1ldGhvZFR5cGUgPT09IEZyZWlnaHRNZXRob2RUeXBlLk9jZWFuID9cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2hpcG1lbnRUcmFja0J5UmVzKGRldGFpbClcclxuICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgbWFwKG8gPT4gby5sZW5ndGggPyBpY29uRmFjdG9yeSh7IGdlb21ldHJ5OiB7bG9jYXRpb246IHsgbG5nOiBvW2xlbmd0aC0xXS5wb2ludFswXSwgbGF0OiBvW2xlbmd0aC0xXS5wb2ludFsxXSB9fX0sICdpY29uLXNoaXAtcm91bmQnLCBkZXRhaWwpIDogcG9ydEljb25GYWN0b3J5KGRldGFpbC5yb3V0ZURldGFpbHMub3JpZ2luUG9ydCwgZGV0YWlsKSlcclxuICAgICAgICAgICAgICAgICAgKS50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgOiBhaXJGcmVpZ2h0VHlwZUljb25GYWN0b3J5KGRldGFpbCk7XHJcbiAgICAgICAgICAgIGNhc2UgU2hpcG1lbnRTdGF0dXNFbnVtLkFycml2YWxQb3J0OlxyXG4gICAgICAgICAgICAgIHJldHVybiBwb3J0SWNvbkZhY3RvcnkoZGV0YWlsLnJvdXRlRGV0YWlscy5kZXN0aW5hdGlvblBvcnQsIGRldGFpbClcclxuICAgICAgICAgICAgY2FzZSBTaGlwbWVudFN0YXR1c0VudW0uSW5UcmFuc2l0VG9GaW5hbERlc3RpbmF0aW9uOlxyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVja0ljb25GYWN0b3J5KGRldGFpbC5yb3V0ZURldGFpbHMuY29uc2lnbmVlSW5mb3MsIGRldGFpbC5yb3V0ZURldGFpbHMuZGVzdGluYXRpb25Qb3J0LCBkZXRhaWwpO1xyXG4gICAgICAgICAgICBjYXNlIFNoaXBtZW50U3RhdHVzRW51bS5GaW5hbERlc3RpbmF0aW9uOlxyXG4gICAgICAgICAgICAgIHJldHVybiBmb3JrSm9pbihcclxuICAgICAgICAgICAgICAgIGRldGFpbC5yb3V0ZURldGFpbHMuY29uc2lnbmVlSW5mb3MubWFwKG8gPT4gdGhpcy5hbWFwU2VydmljZS5nb29nbGVHZW8oby5jb25zaWduZWVOZXRXb3JrSW5mby5zdHJlZXRBZGRyZXNzKSlcclxuICAgICAgICAgICAgICApLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAobyA9PlxyXG4gICAgICAgICAgICAgICAgICBvLm1hcChcclxuICAgICAgICAgICAgICAgICAgICBwID0+IGljb25GYWN0b3J5KHAsICdpY29uLXdhcmVob3VzZS1yb3VuZCcsIGRldGFpbClcclxuICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICkudG9Qcm9taXNlKCk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgKS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKChlKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICByZXR1cm4gb2YoW10pXHJcbiAgICAgIH0pLFxyXG4gICAgICBtYXAobyA9PiBmbGF0dGVuKG8pKSxcclxuICAgIClcclxuICB9XHJcbn1cclxuIl19