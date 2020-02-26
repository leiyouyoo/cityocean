import { __assign, __awaiter, __generator, __read, __spread } from 'tslib';
import { Pipe, Injectable, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
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
var shipmentStatus = {
    0: 'Seller \'s Location / Booked',
    1: 'In Transit to Departure Port',
    2: 'Departure Port',
    3: 'In Transit to Arrival Port',
    4: 'Arrival  port',
    5: 'In Transit to Final Destination',
    6: 'Final destination',
};
/** @enum {number} */
var ShipmentStatusEnum = {
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
var ShipmentStatusPipe = /** @class */ (function () {
    function ShipmentStatusPipe() {
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    ShipmentStatusPipe.prototype.transform = /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        switch (value) {
            case ShipmentStatusEnum.SellerLocation:
                return "Seller 's Location / Booked";
            case ShipmentStatusEnum.InTransitToDeparturePort:
                return "In Transit to Departure Port";
            case ShipmentStatusEnum.DeparturePort:
                return "Departure Port";
            case ShipmentStatusEnum.InTransitToArrivalPort:
                return "In Transit to Arrival Port";
            case ShipmentStatusEnum.ArrivalPort:
                return "Arrival  port";
            case ShipmentStatusEnum.InTransitToFinalDestination:
                return "In Transit to Final Destination";
            case ShipmentStatusEnum.FinalDestination:
                return "Final destination";
            default:
                return '';
        }
    };
    ShipmentStatusPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'shipmentStatus'
                },] }
    ];
    return ShipmentStatusPipe;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: lib/service/shipment.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ShipmentService = /** @class */ (function () {
    function ShipmentService(http, amapService, componentToHtmlService) {
        this.http = http;
        this.amapService = amapService;
        this.componentToHtmlService = componentToHtmlService;
    }
    /**
     * @param {?} json
     * @return {?}
     */
    ShipmentService.prototype.GetAll = /**
     * @param {?} json
     * @return {?}
     */
    function (json) {
        return this.http.postJson('/CSP/Shipment/GetAllList', json)
            .pipe(map((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var temp = data.items;
            temp.forEach((/**
             * @param {?} s
             * @return {?}
             */
            function (s) {
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
                    function (sc) {
                        s.containerListShow += sc.count + "*" + sc.code + ' ';
                    }));
                }
            }));
            return data;
        })));
    };
    /**
     * @return {?}
     */
    ShipmentService.prototype.getStatistics = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = "/CSP/Shipment/GetShipmentsStatistics";
        return this.http.get(url);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    ShipmentService.prototype.GetDetail = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return (/** @type {?} */ (this.http.get('/CSP/Shipment/GetDetail', { id: id })));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    ShipmentService.prototype.GetShipmentDetail = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.http.get('/CSP/Shipment/GetShipmentDetail', { id: id });
    };
    /**
     * @param {?=} pointList
     * @return {?}
     */
    ShipmentService.prototype.getMapShipRoute = /**
     * @param {?=} pointList
     * @return {?}
     */
    function (pointList) {
        if (pointList === void 0) { pointList = []; }
        /** @type {?} */
        var mapIconList = [];
        /** @type {?} */
        var line = [];
        /** @type {?} */
        var point = {
            yantian: { coor: [-247.388497, 22.551956], iconClass: 'icon-icon_oceanshipmentx' },
            guangzhou: { coor: [-246.629063, 22.594968], iconClass: 'icon-icon_oceanshipmentx' },
            angeles: { coor: [-118.243707, 34.053945], iconClass: 'icon-icon_oceanshipmentx' },
        };
        /*const result = e.some(o => o.name.includes('benefit')) &&
              e.some(o => o.name.includes('angeles')) &&
              e.some(o => o.name.includes('yantian'));*/
        /** @type {?} */
        var transportType = {
            ship: 'icon-icon_oceanshipmentx',
            air: 'icon-icon_airshipmentx',
        };
        /** @type {?} */
        var result = pointList.filter((/**
         * @param {?} o
         * @return {?}
         */
        function (o) {
            return o.name.includes('guangzhou') || o.name.includes('angeles') || o.name.includes('yantian');
        }));
        /** @type {?} */
        var random = (/**
         * @param {?} arr
         * @return {?}
         */
        function (arr) {
            return arr.map((/**
             * @param {?} o
             * @return {?}
             */
            function (o) { return o += Math.random(); }));
        });
        if (result.length >= 1) {
            mapIconList = result.map((/**
             * @param {?} o
             * @return {?}
             */
            function (o) {
                if (o.name.includes('guangzhou')) {
                    return __assign({}, point.guangzhou, { id: o.id, theme: o.isDanger ? 'error' : '', iconClass: transportType[o.transportType] });
                }
                if (o.name.includes('angeles')) {
                    return __assign({}, point.angeles, { id: o.id, start: false, theme: o.isDanger ? 'error' : '', iconClass: transportType[o.transportType] });
                }
                if (o.name.includes('yantian')) {
                    return __assign({}, point.yantian, { id: o.id, theme: o.isDanger ? 'error' : '', iconClass: transportType[o.transportType] });
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
        return { iconList: mapIconList, line: line };
    };
    /**
     * @param {?=} param
     * @return {?}
     */
    ShipmentService.prototype.createShare = /**
     * @param {?=} param
     * @return {?}
     */
    function (param) {
        if (param === void 0) { param = {}; }
        return this.http.postJson('/CSP/ShipmentShareLink/Create', param);
    };
    /**
     * @param {?=} param
     * @return {?}
     */
    ShipmentService.prototype.getShareHistory = /**
     * @param {?=} param
     * @return {?}
     */
    function (param) {
        if (param === void 0) { param = {}; }
        /** @type {?} */
        var url = "/CSP/ShipmentShareLink/GetAll";
        return this.http.get(url, param);
    };
    /**
     * @param {?} param
     * @return {?}
     */
    ShipmentService.prototype.shareSend = /**
     * @param {?} param
     * @return {?}
     */
    function (param) {
        /** @type {?} */
        var url = "/CSP/ShipmentShareLink/Update";
        return this.http.put(url, param);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    ShipmentService.prototype.shareCancel = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var url = "/CSP/ShipmentShareLink/Cancel";
        return this.http.postJson(url, { id: id });
    };
    /**
     * @param {?} param
     * @return {?}
     */
    ShipmentService.prototype.getShipTrack = /**
     * @param {?} param
     * @return {?}
     */
    function (param) {
        /** @type {?} */
        var url = "/PUB/VesselInfos/GetShipTrack";
        if (!param.needCount)
            param.needCount = 100;
        return this.http.get(url + "?VesselName=CMA%20CGM%20ORFEO&StartTime=12/15/2019%201:00:00%20AM&EndTime=1/19/2020%201:00:00%20AM&needCount=10000")
            // return this.http.get(url, param)
            .pipe(map((/**
         * @param {?} o
         * @return {?}
         */
        function (o) {
            return o.map((/**
             * @param {?} point
             * @return {?}
             */
            function (point) {
                return (/** @type {?} */ (__assign({}, point, { point: [point.longitudeDegree, point.latitudeDegree] })));
            }));
        })));
    };
    /**
     * @param {?} res
     * @return {?}
     */
    ShipmentService.prototype.getShipmentTrackByRes = /**
     * @param {?} res
     * @return {?}
     */
    function (res) {
        /** @type {?} */
        var route = res.routeDetails;
        return this.getShipTrack({
            vesselName: res.vessel,
            startTime: route.estDepatureOrginPortDate,
            endTime: route.estArrivalDestinationPortDate
        });
    };
    /**
     * @param {?} parm
     * @return {?}
     */
    ShipmentService.prototype.getAllPortsForOthers = /**
     * @param {?} parm
     * @return {?}
     */
    function (parm) {
        return this.http.get('/CSP/Shipment/GetAllPortsForOthers', parm);
    };
    /**
     * @param {?} parm
     * @return {?}
     */
    ShipmentService.prototype.getAllLocationsForOthers = /**
     * @param {?} parm
     * @return {?}
     */
    function (parm) {
        return this.http.get('/CSP/Shipment/GetAllLocationsForOthers', parm);
    };
    /**
     * @return {?}
     */
    ShipmentService.prototype.getAllCompanyForOthers = /**
     * @return {?}
     */
    function () {
        return this.http.get('/CSP/Shipment/GetAllCompanyForOthers');
    };
    /**
     * @param {?} param
     * @return {?}
     */
    ShipmentService.prototype.createOrUpdateConditionGroup = /**
     * @param {?} param
     * @return {?}
     */
    function (param) {
        return this.http.postJson('/Platform/BusinessFilter/CreateOrUpdateConditionGroup', param);
    };
    /**
     * @param {?} Id
     * @return {?}
     */
    ShipmentService.prototype.getShipmentLinkDetail = /**
     * @param {?} Id
     * @return {?}
     */
    function (Id) {
        /** @type {?} */
        var params = { Id: Id };
        return this.http.get('/CSP/ShipmentShareLink/GetDetail', params);
    };
    /**
     * shipment 的路线
     * @param details
     *   目前参数是数组，应该用不到数组传进来的应该都是单个
     */
    /**
     * shipment 的路线
     * @param {?} details
     *   目前参数是数组，应该用不到数组传进来的应该都是单个
     * @return {?}
     */
    ShipmentService.prototype.getShipmentMapDataByDetails = /**
     * shipment 的路线
     * @param {?} details
     *   目前参数是数组，应该用不到数组传进来的应该都是单个
     * @return {?}
     */
    function (details) {
        var _this = this;
        return forkJoin(details.map((/**
         * @param {?} detail
         * @return {?}
         */
        function (detail) {
            return new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                var icons_1, lines_1, dashedLines_1, track_1, portAddress, portPointList, address, _a, shipperAddressList, consigneeAddressList, e_1;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 6, , 7]);
                            icons_1 = [];
                            lines_1 = [];
                            dashedLines_1 = [];
                            track_1 = [];
                            portAddress = [detail.routeDetails.originPort, detail.routeDetails.destinationPort].map((/**
                             * @param {?} port
                             * @return {?}
                             */
                            function (port) { return port.name + "," + port.fullName; }));
                            return [4 /*yield*/, forkJoin(portAddress.map((/**
                                 * @param {?} o
                                 * @return {?}
                                 */
                                function (o) { return _this.amapService.googleGeo(o); }))).toPromise()];
                        case 1:
                            portPointList = (_b.sent())
                                .map((/**
                             * @param {?} o
                             * @return {?}
                             */
                            function (o) { return [o.geometry.location.lng, o.geometry.location.lat]; }));
                            if (!(detail.freightMethodType === FreightMethodType.Ocean)) return [3 /*break*/, 3];
                            // port icon
                            icons_1.push({
                                point: portPointList[0],
                                icon: 'icon-port',
                            }, { point: portPointList[1], icon: 'icon-port' });
                            return [4 /*yield*/, (this.getShipmentTrackByRes(detail)
                                    .pipe(map((/**
                                 * @param {?} o
                                 * @return {?}
                                 */
                                function (o) { return o.map((/**
                                 * @param {?} p
                                 * @return {?}
                                 */
                                function (p) { return p.point; })); })))
                                    .toPromise())];
                        case 2:
                            track_1 = _b.sent();
                            // display when on the way
                            if (track_1.length && detail.status === ShipmentStatusEnum.InTransitToArrivalPort) {
                                icons_1.push({
                                    point: track_1[track_1.length - 1],
                                    icon: 'icon-ship-round',
                                });
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            // port icon
                            icons_1.push({
                                point: portPointList[0],
                                icon: 'icon-port',
                            }, { point: portPointList[1], icon: 'icon-port' });
                            // display when on the way
                            if (detail.status === ShipmentStatusEnum.InTransitToArrivalPort) {
                                icons_1.push({
                                    point: [track_1[0][0] + track_1[1][0], track_1[0][1] + track_1[1][1]]
                                        /*track.reduce(
                                          (acc: [number, number], cur: [number, number]) => acc.map((val, i) => [val + cur[i]])
                                        )*/ .map((/**
                                     * @param {?} o
                                     * @return {?}
                                     */
                                    function (o) { return o / 2; })),
                                    icon: 'icon-airplane',
                                });
                            }
                            _b.label = 4;
                        case 4:
                            // track start and end at port
                            track_1.unshift(portPointList[0]);
                            track_1.push(portPointList[1]);
                            // on the way or finished
                            if ([ShipmentStatusEnum.InTransitToArrivalPort, ShipmentStatusEnum.ArrivalPort].includes(detail.status)) {
                                lines_1.push(track_1);
                            }
                            dashedLines_1.push(track_1);
                            return [4 /*yield*/, Promise.all([
                                    forkJoin(detail.routeDetails.shipperInfos.map((/**
                                     * @param {?} o
                                     * @return {?}
                                     */
                                    function (o) { return _this.amapService.googleGeo(o.shipperNetWorkInfo.streetAddress); }))).toPromise(),
                                    forkJoin(detail.routeDetails.consigneeInfos.map((/**
                                     * @param {?} o
                                     * @return {?}
                                     */
                                    function (o) { return _this.amapService.googleGeo(o.consigneeNetWorkInfo.streetAddress); }))).toPromise(),
                                ])];
                        case 5:
                            address = _b.sent();
                            _a = __read(address.map((/**
                             * @param {?} o
                             * @return {?}
                             */
                            function (o) { return o ? o : []; })), 2), shipperAddressList = _a[0], consigneeAddressList = _a[1];
                            [shipperAddressList, consigneeAddressList].forEach((/**
                             * @param {?} addressList
                             * @param {?} index
                             * @return {?}
                             */
                            function (addressList, index) {
                                addressList.map((/**
                                 * @param {?} geo
                                 * @return {?}
                                 */
                                function (geo) {
                                    /** @type {?} */
                                    var point = [geo.geometry.location.lng, geo.geometry.location.lat];
                                    icons_1.push({
                                        point: point,
                                        icon: 'icon-warehouse',
                                    });
                                    switch (index) {
                                        case 0:
                                            dashedLines_1.push([point, track_1[0]]);
                                            if (detail.status > ShipmentStatusEnum.InTransitToDeparturePort) {
                                                lines_1.push([point, track_1[0]]);
                                            }
                                            else if (detail.status === ShipmentStatusEnum.InTransitToDeparturePort) {
                                                icons_1.push({
                                                    point: [point[0] + track_1[0][0], point[1] + track_1[0][1]].map((/**
                                                     * @param {?} o
                                                     * @return {?}
                                                     */
                                                    function (o) { return o / 2; })),
                                                    icon: 'icon-truck',
                                                });
                                            }
                                            break;
                                        case 1:
                                            dashedLines_1.push([track_1[track_1.length - 1], point]);
                                            if (detail.status > ShipmentStatusEnum.InTransitToFinalDestination) {
                                                lines_1.push([track_1[track_1.length - 1], point]);
                                            }
                                            else if (detail.status === ShipmentStatusEnum.InTransitToFinalDestination) {
                                                icons_1.push({
                                                    point: [point[0] + track_1[track_1.length - 1][0], point[1] + track_1[track_1.length - 1][1]].map((/**
                                                     * @param {?} o
                                                     * @return {?}
                                                     */
                                                    function (o) { return o / 2; })),
                                                    icon: 'icon-truck',
                                                });
                                            }
                                            break;
                                        default:
                                    }
                                }));
                            }));
                            resolve({ icons: icons_1, lines: lines_1, dashedLines: dashedLines_1 });
                            return [3 /*break*/, 7];
                        case 6:
                            e_1 = _b.sent();
                            console.error(e_1);
                            resolve(null);
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            }); }));
        }))).pipe(map((/**
         * @param {?} o
         * @return {?}
         */
        function (o) { return o.filter((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return p; })); })));
    };
    /**
     * shipment 状态点
     * @param details
     */
    /**
     * shipment 状态点
     * @param {?} details
     * @return {?}
     */
    ShipmentService.prototype.getIconListByDetails = /**
     * shipment 状态点
     * @param {?} details
     * @return {?}
     */
    function (details) {
        var _this = this;
        /** @type {?} */
        var iconFactory = (/**
         * @param {?} p
         * @param {?} icon
         * @param {?} detail
         * @return {?}
         */
        function (p, icon, detail) { return ({
            point: [
                p.geometry.location.lng + Math.random() * 0.008 - 0.004,
                p.geometry.location.lat + Math.random() * 0.008 - 0.004,
            ],
            template: _this.componentToHtmlService.getShipmentTemplate(detail),
            icon: icon,
            data: detail,
        }); });
        /** @type {?} */
        var portIconFactory = (/**
         * @param {?} port
         * @param {?} detail
         * @return {?}
         */
        function (port, detail) {
            return _this.amapService.googleGeo(port.name + " " + port.fullName)
                .pipe(map((/**
             * @param {?} o
             * @return {?}
             */
            function (o) { return iconFactory(o, detail.freightMethodType === FreightMethodType.Ocean ? 'icon-ship-round' : 'icon-airplane', detail); }))).toPromise();
        });
        /** @type {?} */
        var airFreightTypeIconFactory = (/**
         * @param {?} detail
         * @return {?}
         */
        function (detail) { return __awaiter(_this, void 0, void 0, function () {
            var portAddress, track, icons;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        portAddress = [detail.routeDetails.originPort, detail.routeDetails.destinationPort].map((/**
                         * @param {?} port
                         * @return {?}
                         */
                        function (port) { return port.name + "," + port.fullName; }));
                        return [4 /*yield*/, forkJoin(portAddress.map((/**
                             * @param {?} o
                             * @return {?}
                             */
                            function (o) { return _this.amapService.googleGeo(o); }))).toPromise()];
                    case 1:
                        track = (_a.sent())
                            .map((/**
                         * @param {?} o
                         * @return {?}
                         */
                        function (o) { return [o.geometry.location.lng, o.geometry.location.lat]; }));
                        icons = {
                            point: track.reduce((/**
                             * @param {?} acc
                             * @param {?} cur
                             * @return {?}
                             */
                            function (acc, cur) { return acc.map((/**
                             * @param {?} val
                             * @param {?} i
                             * @return {?}
                             */
                            function (val, i) { return val + cur[i]; })); })).map((/**
                             * @param {?} o
                             * @return {?}
                             */
                            function (o) { return o / 2; })),
                            icon: 'icon-airplane',
                            template: this.componentToHtmlService.getShipmentTemplate(detail),
                            data: detail
                        };
                        return [2 /*return*/, icons];
                }
            });
        }); });
        /** @type {?} */
        var truckIconFactory = (/**
         * @param {?} repoList
         * @param {?} port
         * @param {?} detail
         * @return {?}
         */
        function (repoList, port, detail) { return __awaiter(_this, void 0, void 0, function () {
            var geoList, portGeo;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, forkJoin(repoList.map((/**
                         * @param {?} o
                         * @return {?}
                         */
                        function (o) { return _this.amapService.googleGeo(o.shipperNetWorkInfo.streetAddress); }))).toPromise()];
                    case 1:
                        geoList = _a.sent();
                        return [4 /*yield*/, this.amapService.googleGeo(port.name + "," + port.fullname).toPromise()];
                    case 2:
                        portGeo = _a.sent();
                        return [2 /*return*/, geoList.map((/**
                             * @param {?} geo
                             * @return {?}
                             */
                            function (geo) {
                                geo.geometry.location.lng = (geo.geometry.location.lng + portGeo.geometry.location.lng) / 2;
                                geo.geometry.location.lat = (geo.geometry.location.lat + portGeo.geometry.location.lat) / 2;
                                return iconFactory(geo, 'icon-truck', detail);
                            }))];
                }
            });
        }); });
        return forkJoin(
        // map to icon array
        details.map((/**
         * @param {?} detail
         * @return {?}
         */
        function (detail) { return __awaiter(_this, void 0, void 0, function () {
            var originPort, destinationPort;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    originPort = detail.routeDetails.originPort;
                    destinationPort = detail.routeDetails.destinationPort;
                    // assemble icons
                    switch (detail.status) {
                        case ShipmentStatusEnum.SellerLocation:
                        case ShipmentStatusEnum.OriginStopOff:
                        case ShipmentStatusEnum.InTransitToDeparturePort:
                            return [2 /*return*/, forkJoin(detail.routeDetails.shipperInfos.map((/**
                                 * @param {?} o
                                 * @return {?}
                                 */
                                function (o) { return _this.amapService.googleGeo(o.shipperNetWorkInfo.streetAddress); }))).pipe(map((/**
                                 * @param {?} o
                                 * @return {?}
                                 */
                                function (o) {
                                    return o.map((/**
                                     * @param {?} p
                                     * @return {?}
                                     */
                                    function (p) { return iconFactory(p, 'icon-warehouse-round', detail); }));
                                }))).toPromise()];
                        case ShipmentStatusEnum.DeparturePort:
                            return [2 /*return*/, portIconFactory(detail.routeDetails.originPort, detail)];
                        case ShipmentStatusEnum.InTransitToArrivalPort:
                            // ship: if has track data display last point, else in port
                            // air: display in way
                            return [2 /*return*/, detail.freightMethodType === FreightMethodType.Ocean ?
                                    this.getShipmentTrackByRes(detail)
                                        .pipe(map((/**
                                     * @param {?} o
                                     * @return {?}
                                     */
                                    function (o) { return o.length ? iconFactory({ geometry: { location: { lng: o[length - 1].point[0], lat: o[length - 1].point[1] } } }, 'icon-ship-round', detail) : portIconFactory(detail.routeDetails.originPort, detail); }))).toPromise()
                                    : airFreightTypeIconFactory(detail)];
                        case ShipmentStatusEnum.ArrivalPort:
                            return [2 /*return*/, portIconFactory(detail.routeDetails.destinationPort, detail)];
                        case ShipmentStatusEnum.InTransitToFinalDestination:
                            return [2 /*return*/, truckIconFactory(detail.routeDetails.consigneeInfos, detail.routeDetails.destinationPort, detail)];
                        case ShipmentStatusEnum.FinalDestination:
                            return [2 /*return*/, forkJoin(detail.routeDetails.consigneeInfos.map((/**
                                 * @param {?} o
                                 * @return {?}
                                 */
                                function (o) { return _this.amapService.googleGeo(o.consigneeNetWorkInfo.streetAddress); }))).pipe(map((/**
                                 * @param {?} o
                                 * @return {?}
                                 */
                                function (o) {
                                    return o.map((/**
                                     * @param {?} p
                                     * @return {?}
                                     */
                                    function (p) { return iconFactory(p, 'icon-warehouse-round', detail); }));
                                }))).toPromise()];
                        default:
                    }
                }
                catch (e) {
                    console.error(e);
                    return [2 /*return*/, []];
                }
                return [2 /*return*/];
            });
        }); }))).pipe(catchError((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            console.error(e);
            return of([]);
        })), map((/**
         * @param {?} o
         * @return {?}
         */
        function (o) { return flatten(o); })));
    };
    ShipmentService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ShipmentService.ctorParameters = function () { return [
        { type: HttpService },
        { type: AmapService },
        { type: ComponentToHtmlService }
    ]; };
    /** @nocollapse */ ShipmentService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ShipmentService_Factory() { return new ShipmentService(ɵɵinject(HttpService), ɵɵinject(AmapService), ɵɵinject(ComponentToHtmlService)); }, token: ShipmentService, providedIn: "root" });
    return ShipmentService;
}());
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
var pipes = [
    ShipmentStatusPipe,
];
var ShipmentLibraryModule = /** @class */ (function () {
    function ShipmentLibraryModule() {
    }
    ShipmentLibraryModule.decorators = [
        { type: NgModule, args: [{
                    declarations: __spread(pipes),
                    imports: [],
                    exports: __spread(pipes)
                },] }
    ];
    return ShipmentLibraryModule;
}());

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
