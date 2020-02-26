import { Pipe, Injectable, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { __awaiter } from 'tslib';
import { HttpService } from '@cityocean/common-library';
import { map, catchError } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { flatten } from 'lodash';
import { FreightMethodType } from '@cityocean/basicdata-library';
import { AmapService, ComponentToHtmlService } from '@cityocean/amap-library';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/entities/shipmentStatus.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const shipmentStatus = {
    0: 'Seller \'s Location / Booked',
    1: 'In Transit to Departure Port',
    2: 'Departure Port',
    3: 'In Transit to Arrival Port',
    4: 'Arrival  port',
    5: 'In Transit to Final Destination',
    6: 'Final destination',
};
/** @enum {number} */
const ShipmentStatusEnum = {
    SellerLocation: 0,
    OriginStopOff: 1,
    InTransitToDeparturePort: 2,
    DeparturePort: 3,
    InTransitToArrivalPort: 4,
    ArrivalPort: 5,
    InTransitToFinalDestination: 6,
    DestinationStopOff: 7,
    FinalDestination: 8,
    Canceled: 9,
    Completed: 10,
};
ShipmentStatusEnum[ShipmentStatusEnum.SellerLocation] = 'SellerLocation';
ShipmentStatusEnum[ShipmentStatusEnum.OriginStopOff] = 'OriginStopOff';
ShipmentStatusEnum[ShipmentStatusEnum.InTransitToDeparturePort] = 'InTransitToDeparturePort';
ShipmentStatusEnum[ShipmentStatusEnum.DeparturePort] = 'DeparturePort';
ShipmentStatusEnum[ShipmentStatusEnum.InTransitToArrivalPort] = 'InTransitToArrivalPort';
ShipmentStatusEnum[ShipmentStatusEnum.ArrivalPort] = 'ArrivalPort';
ShipmentStatusEnum[ShipmentStatusEnum.InTransitToFinalDestination] = 'InTransitToFinalDestination';
ShipmentStatusEnum[ShipmentStatusEnum.DestinationStopOff] = 'DestinationStopOff';
ShipmentStatusEnum[ShipmentStatusEnum.FinalDestination] = 'FinalDestination';
ShipmentStatusEnum[ShipmentStatusEnum.Canceled] = 'Canceled';
ShipmentStatusEnum[ShipmentStatusEnum.Completed] = 'Completed';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/pipes/shipment-status.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ShipmentStatusPipe {
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    transform(value, ...args) {
        switch (value) {
            case ShipmentStatusEnum.SellerLocation:
                return `Seller 's Location / Booked`;
            case ShipmentStatusEnum.InTransitToDeparturePort:
                return `In Transit to Departure Port`;
            case ShipmentStatusEnum.DeparturePort:
                return `Departure Port`;
            case ShipmentStatusEnum.InTransitToArrivalPort:
                return `In Transit to Arrival Port`;
            case ShipmentStatusEnum.ArrivalPort:
                return `Arrival  port`;
            case ShipmentStatusEnum.InTransitToFinalDestination:
                return `In Transit to Final Destination`;
            case ShipmentStatusEnum.FinalDestination:
                return `Final destination`;
            default:
                return '';
        }
    }
}
ShipmentStatusPipe.decorators = [
    { type: Pipe, args: [{
                name: 'shipmentStatus'
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: lib/service/shipment.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ShipmentService {
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
            (resolve) => __awaiter(this, void 0, void 0, function* () {
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
        (detail) => __awaiter(this, void 0, void 0, function* () {
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
        (repoList, port, detail) => __awaiter(this, void 0, void 0, function* () {
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
        (detail) => __awaiter(this, void 0, void 0, function* () {
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
/** @nocollapse */ ShipmentService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ShipmentService_Factory() { return new ShipmentService(ɵɵinject(HttpService), ɵɵinject(AmapService), ɵɵinject(ComponentToHtmlService)); }, token: ShipmentService, providedIn: "root" });
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

/**
 * @fileoverview added by tsickle
 * Generated from: lib/shipment-library.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const pipes = [
    ShipmentStatusPipe,
];
class ShipmentLibraryModule {
}
ShipmentLibraryModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ...pipes,
                ],
                imports: [],
                exports: [
                    ...pipes,
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: cityocean-shipment-library.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ShipmentLibraryModule, ShipmentService, ShipmentStatusEnum, shipmentStatus, ShipmentStatusPipe as ɵa };
//# sourceMappingURL=cityocean-shipment-library.js.map
