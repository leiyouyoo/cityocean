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
                    return tslib_1.__assign({}, point.guangzhou, { id: o.id, theme: o.isDanger ? 'error' : '', iconClass: transportType[o.transportType] });
                }
                if (o.name.includes('angeles')) {
                    return tslib_1.__assign({}, point.angeles, { id: o.id, start: false, theme: o.isDanger ? 'error' : '', iconClass: transportType[o.transportType] });
                }
                if (o.name.includes('yantian')) {
                    return tslib_1.__assign({}, point.yantian, { id: o.id, theme: o.isDanger ? 'error' : '', iconClass: transportType[o.transportType] });
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
                return (/** @type {?} */ (tslib_1.__assign({}, point, { point: [point.longitudeDegree, point.latitudeDegree] })));
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
            function (resolve) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var icons_1, lines_1, dashedLines_1, track_1, portAddress, portPointList, address, _a, shipperAddressList, consigneeAddressList, e_1;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
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
                            _a = tslib_1.__read(address.map((/**
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
        function (detail) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var portAddress, track, icons;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
        function (repoList, port, detail) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var geoList, portGeo;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
        function (detail) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var originPort, destinationPort;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
    /** @nocollapse */ ShipmentService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ShipmentService_Factory() { return new ShipmentService(i0.ɵɵinject(i1.HttpService), i0.ɵɵinject(i2.AmapService), i0.ɵɵinject(i2.ComponentToHtmlService)); }, token: ShipmentService, providedIn: "root" });
    return ShipmentService;
}());
export { ShipmentService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcG1lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjaXR5b2NlYW4vc2hpcG1lbnQtbGlicmFyeS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlL3NoaXBtZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWpDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWpFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUVoRTtJQUlFLHlCQUNTLElBQWlCLEVBQ2hCLFdBQXdCLEVBQ3hCLHNCQUE4QztRQUYvQyxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2hCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7SUFFeEQsQ0FBQzs7Ozs7SUFFRCxnQ0FBTTs7OztJQUFOLFVBQU8sSUFBMko7UUFDaEssT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUM7YUFDeEQsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFDLElBQVM7O2dCQUNaLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSztZQUN2QixJQUFJLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsQ0FBQztnQkFDWixD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b3JlJztcclxuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICdAY2l0eW9jZWFuL2NvbW1vbi1saWJyYXJ5JztcclxuaW1wb3J0IHsgVHJhbnNwb3J0YXRpb25Nb2RlIH0gZnJvbSAnLi4vY2xhc3MvVHJhbnNwb3J0YXRpb25Nb2RlJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBmb3JrSm9pbiwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmxhdHRlbiB9IGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IFNoaXBtZW50RGV0YWlsIH0gZnJvbSAnLi4vZW50aXRpZXMvU2hpcG1lbnREZXRhaWwnO1xyXG5pbXBvcnQgeyBGcmVpZ2h0TWV0aG9kVHlwZSB9IGZyb20gJ0BjaXR5b2NlYW4vYmFzaWNkYXRhLWxpYnJhcnknO1xyXG5pbXBvcnQgeyBWZXNzZWxUcmFja1BvaW50IH0gZnJvbSAnLi4vZW50aXRpZXMvVmVzc2VsVHJhY2tQb2ludCc7XHJcbmltcG9ydCB7IENvbXBvbmVudFRvSHRtbFNlcnZpY2UsIEFtYXBTZXJ2aWNlIH0gZnJvbSAnQGNpdHlvY2Vhbi9hbWFwLWxpYnJhcnknO1xyXG5pbXBvcnQgeyBTaGlwbWVudFN0YXR1c0VudW0gfSBmcm9tICcuLi9lbnRpdGllcy9zaGlwbWVudFN0YXR1cyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaGlwbWVudFNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGh0dHA6IEh0dHBTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhbWFwU2VydmljZTogQW1hcFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbXBvbmVudFRvSHRtbFNlcnZpY2U6IENvbXBvbmVudFRvSHRtbFNlcnZpY2UsXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBHZXRBbGwoanNvbjogeyBTZWFyY2hLZXk/OiBzdHJpbmcsIElzRGVsaXZlcmVkPzogYm9vbGVhbiwgVHJhbnNwb3J0YXRpb25Nb2RlPzogVHJhbnNwb3J0YXRpb25Nb2RlLCBTb3J0aW5nPzogc3RyaW5nLCBNYXhSZXN1bHRDb3VudD86IG51bWJlciwgU2tpcENvdW50PzogbnVtYmVyIH0pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpzb24oJy9DU1AvU2hpcG1lbnQvR2V0QWxsTGlzdCcsIGpzb24pXHJcbiAgICAgIC5waXBlKG1hcCgoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGVtcCA9IGRhdGEuaXRlbXM7XHJcbiAgICAgICAgdGVtcC5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICAgICAgcy5hZ3JlZW1lbnQgPSBzLnJvdXRlRGV0YWlscy5jb25zaWduZWVJbmZvcy5sZW5ndGggPT09IDAgJiYgcy5yb3V0ZURldGFpbHMuc2hpcHBlckluZm9zLmxlbmd0aCA9PT0gMCA/ICdjeS1jeScgOiBzLnJvdXRlRGV0YWlscy5zaGlwcGVySW5mb3MubGVuZ3RoID09PSAwID8gJ2N5LWRvb3InIDogcy5yb3V0ZURldGFpbHMuY29uc2lnbmVlSW5mb3MubGVuZ3RoID09PSAwID8gJ2Rvb3ItY3knIDogJ2Rvb3ItZG9vcic7XHJcbiAgICAgICAgICBzLnRyYW5zcG9ydFR5cGUgPSBzLmZyZWlnaHRNZXRob2RUeXBlID09PSBGcmVpZ2h0TWV0aG9kVHlwZS5PY2VhbiA/ICdzaGlwJyA6ICdhaXInO1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcy5zaGlwZXJTaG93ID0gcy5yb3V0ZURldGFpbHMuc2hpcHBlckluZm9zLmxlbmd0aCAmJiBzLnJvdXRlRGV0YWlscy5zaGlwcGVySW5mb3NbMF0uc2hpcHBlck5ldFdvcmtJbmZvLm5hbWUgfHwgJyc7XHJcbiAgICAgICAgICAgIHMuY29uc2lnbmVlU2hvdyA9IHMucm91dGVEZXRhaWxzLmNvbnNpZ25lZUluZm9zLmxlbmd0aCAmJiBzLnJvdXRlRGV0YWlscy5jb25zaWduZWVJbmZvc1swXS5jb25zaWduZWVOZXRXb3JrSW5mby5uYW1lIHx8ICcnO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHMuc3RhdGUgPSBzLnN0YXR1cztcclxuICAgICAgICAgIGlmIChzLmNvbnRhaW5lckxpc3QpIHtcclxuICAgICAgICAgICAgcy5jb250YWluZXJMaXN0U2hvdyA9ICcnO1xyXG4gICAgICAgICAgICBzLmNvbnRhaW5lckxpc3QuZm9yRWFjaChzYyA9PiB7XHJcbiAgICAgICAgICAgICAgcy5jb250YWluZXJMaXN0U2hvdyArPSBgJHtzYy5jb3VudH0qJHtzYy5jb2RlfWAgKyAnICc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBnZXRTdGF0aXN0aWNzKCkge1xyXG4gICAgY29uc3QgdXJsID0gYC9DU1AvU2hpcG1lbnQvR2V0U2hpcG1lbnRzU3RhdGlzdGljc2A7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpO1xyXG4gIH1cclxuXHJcbiAgR2V0RGV0YWlsKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPFNoaXBtZW50RGV0YWlsPiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCgnL0NTUC9TaGlwbWVudC9HZXREZXRhaWwnLCB7aWR9KSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBHZXRTaGlwbWVudERldGFpbChpZDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCgnL0NTUC9TaGlwbWVudC9HZXRTaGlwbWVudERldGFpbCcsIHtpZH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWFwU2hpcFJvdXRlKHBvaW50TGlzdCA9IFtdKSB7XHJcbiAgICBsZXQgbWFwSWNvbkxpc3QgPSBbXTtcclxuICAgIGxldCBsaW5lID0gW107XHJcbiAgICBjb25zdCBwb2ludCA9IHtcclxuICAgICAgeWFudGlhbjoge2Nvb3I6IFstMjQ3LjM4ODQ5NywgMjIuNTUxOTU2XSwgaWNvbkNsYXNzOiAnaWNvbi1pY29uX29jZWFuc2hpcG1lbnR4J30sXHJcbiAgICAgIGd1YW5nemhvdToge2Nvb3I6IFstMjQ2LjYyOTA2MywgMjIuNTk0OTY4XSwgaWNvbkNsYXNzOiAnaWNvbi1pY29uX29jZWFuc2hpcG1lbnR4J30sXHJcbiAgICAgIGFuZ2VsZXM6IHtjb29yOiBbLTExOC4yNDM3MDcsIDM0LjA1Mzk0NV0sIGljb25DbGFzczogJ2ljb24taWNvbl9vY2VhbnNoaXBtZW50eCd9LFxyXG4gICAgfTtcclxuICAgIC8qY29uc3QgcmVzdWx0ID0gZS5zb21lKG8gPT4gby5uYW1lLmluY2x1ZGVzKCdiZW5lZml0JykpICYmXHJcbiAgICAgIGUuc29tZShvID0+IG8ubmFtZS5pbmNsdWRlcygnYW5nZWxlcycpKSAmJlxyXG4gICAgICBlLnNvbWUobyA9PiBvLm5hbWUuaW5jbHVkZXMoJ3lhbnRpYW4nKSk7Ki9cclxuICAgIGNvbnN0IHRyYW5zcG9ydFR5cGUgPSB7XHJcbiAgICAgIHNoaXA6ICdpY29uLWljb25fb2NlYW5zaGlwbWVudHgnLFxyXG4gICAgICBhaXI6ICdpY29uLWljb25fYWlyc2hpcG1lbnR4JyxcclxuICAgIH07XHJcbiAgICBjb25zdCByZXN1bHQgPSBwb2ludExpc3QuZmlsdGVyKG8gPT4ge1xyXG4gICAgICByZXR1cm4gby5uYW1lLmluY2x1ZGVzKCdndWFuZ3pob3UnKSB8fCBvLm5hbWUuaW5jbHVkZXMoJ2FuZ2VsZXMnKSB8fCBvLm5hbWUuaW5jbHVkZXMoJ3lhbnRpYW4nKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgcmFuZG9tID0gKGFycjogbnVtYmVyW10pID0+IHtcclxuICAgICAgcmV0dXJuIGFyci5tYXAobyA9PiBvICs9IE1hdGgucmFuZG9tKCkpO1xyXG4gICAgfTtcclxuICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcclxuICAgICAgbWFwSWNvbkxpc3QgPSByZXN1bHQubWFwKG8gPT4ge1xyXG4gICAgICAgIGlmIChvLm5hbWUuaW5jbHVkZXMoJ2d1YW5nemhvdScpKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5wb2ludC5ndWFuZ3pob3UsXHJcbiAgICAgICAgICAgIGlkOiBvLmlkLFxyXG4gICAgICAgICAgICB0aGVtZTogby5pc0RhbmdlciA/ICdlcnJvcicgOiAnJyxcclxuICAgICAgICAgICAgaWNvbkNsYXNzOiB0cmFuc3BvcnRUeXBlW28udHJhbnNwb3J0VHlwZV0sXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoby5uYW1lLmluY2x1ZGVzKCdhbmdlbGVzJykpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC4uLnBvaW50LmFuZ2VsZXMsXHJcbiAgICAgICAgICAgIGlkOiBvLmlkLFxyXG4gICAgICAgICAgICBzdGFydDogZmFsc2UsXHJcbiAgICAgICAgICAgIHRoZW1lOiBvLmlzRGFuZ2VyID8gJ2Vycm9yJyA6ICcnLFxyXG4gICAgICAgICAgICBpY29uQ2xhc3M6IHRyYW5zcG9ydFR5cGVbby50cmFuc3BvcnRUeXBlXSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvLm5hbWUuaW5jbHVkZXMoJ3lhbnRpYW4nKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4ucG9pbnQueWFudGlhbixcclxuICAgICAgICAgICAgaWQ6IG8uaWQsXHJcbiAgICAgICAgICAgIHRoZW1lOiBvLmlzRGFuZ2VyID8gJ2Vycm9yJyA6ICcnLFxyXG4gICAgICAgICAgICBpY29uQ2xhc3M6IHRyYW5zcG9ydFR5cGVbby50cmFuc3BvcnRUeXBlXSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgLyptYXBJY29uTGlzdC5mb3JFYWNoKG8gPT4ge1xyXG4gICAgICAgIG8uY29vciA9IHJhbmRvbShvLmNvb3IpO1xyXG4gICAgICB9KTsqL1xyXG4gICAgICAvKnRoaXMuZmFrZU1hcERhdGEgPSBbXHJcbiAgICAgICAgeyBjb29yOiBbLTI0Ni43ODg0OTcsIDIzLjEyMTk1Nl0sIGljb25DbGFzczogJ2ljb24taWNvbl9vY2VhbnNoaXBtZW50eCcgfSxcclxuICAgICAgICB7IGNvb3I6IFstMjQ3LjM4ODQ5NywgMjIuNTUxOTU2XSwgaWNvbkNsYXNzOiAnaWNvbi1pY29uX29jZWFuc2hpcG1lbnR4JyB9LFxyXG4gICAgICAgIHsgY29vcjogWy0yNDYuNjI5MDYzLCAyMi41OTQ5NjhdLCBpY29uQ2xhc3M6ICdpY29uLWljb25fb2NlYW5zaGlwbWVudHgnIH0sXHJcbiAgICAgICAgeyBjb29yOiBbLTExOC4yNDM3MDcsIDM0LjA1Mzk0NV0sIGljb25DbGFzczogJ2ljb24taWNvbl9vY2VhbnNoaXBtZW50eCcgfSxcclxuICAgICAgXTsgKi9cclxuICAgICAgaWYgKHJlc3VsdFswXSAmJiByZXN1bHRbMF0uc3RhcnQgIT09IGZhbHNlKSB7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2ljb25MaXN0OiBtYXBJY29uTGlzdCwgbGluZX07XHJcbiAgfVxyXG5cclxuICBjcmVhdGVTaGFyZShwYXJhbSA9IHt9KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKc29uKCcvQ1NQL1NoaXBtZW50U2hhcmVMaW5rL0NyZWF0ZScsIHBhcmFtKTtcclxuICB9XHJcblxyXG4gIGdldFNoYXJlSGlzdG9yeShwYXJhbSA9IHt9KSB7XHJcbiAgICBjb25zdCB1cmwgPSBgL0NTUC9TaGlwbWVudFNoYXJlTGluay9HZXRBbGxgO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCBwYXJhbSk7XHJcbiAgfVxyXG5cclxuICBzaGFyZVNlbmQocGFyYW0pIHtcclxuICAgIGNvbnN0IHVybCA9IGAvQ1NQL1NoaXBtZW50U2hhcmVMaW5rL1VwZGF0ZWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh1cmwsIHBhcmFtKTtcclxuICB9XHJcblxyXG4gIHNoYXJlQ2FuY2VsKGlkOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHVybCA9IGAvQ1NQL1NoaXBtZW50U2hhcmVMaW5rL0NhbmNlbGA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKc29uKHVybCwge2lkfSk7XHJcbiAgfVxyXG5cclxuICBnZXRTaGlwVHJhY2socGFyYW06IHsgdmVzc2VsTmFtZTogc3RyaW5nLCBzdGFydFRpbWU6IHN0cmluZywgZW5kVGltZTogc3RyaW5nLCBuZWVkQ291bnQ/OiBudW1iZXIgfSk6IE9ic2VydmFibGU8VmVzc2VsVHJhY2tQb2ludFtdPiB7XHJcbiAgICBjb25zdCB1cmwgPSBgL1BVQi9WZXNzZWxJbmZvcy9HZXRTaGlwVHJhY2tgO1xyXG4gICAgaWYgKCFwYXJhbS5uZWVkQ291bnQpIHBhcmFtLm5lZWRDb3VudCA9IDEwMDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3VybH0/VmVzc2VsTmFtZT1DTUElMjBDR00lMjBPUkZFTyZTdGFydFRpbWU9MTIvMTUvMjAxOSUyMDE6MDA6MDAlMjBBTSZFbmRUaW1lPTEvMTkvMjAyMCUyMDE6MDA6MDAlMjBBTSZuZWVkQ291bnQ9MTAwMDBgKVxyXG4gICAgLy8gcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCBwYXJhbSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChvOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG8ubWFwKHBvaW50ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAuLi5wb2ludCxcclxuICAgICAgICAgICAgICBwb2ludDogW3BvaW50LmxvbmdpdHVkZURlZ3JlZSwgcG9pbnQubGF0aXR1ZGVEZWdyZWVdLFxyXG4gICAgICAgICAgICB9IGFzIGFueTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2hpcG1lbnRUcmFja0J5UmVzKHJlczogU2hpcG1lbnREZXRhaWwpIHtcclxuICAgIGNvbnN0IHJvdXRlID0gcmVzLnJvdXRlRGV0YWlscztcclxuICAgIHJldHVybiB0aGlzLmdldFNoaXBUcmFjayh7XHJcbiAgICAgIHZlc3NlbE5hbWU6IHJlcy52ZXNzZWwsXHJcbiAgICAgIHN0YXJ0VGltZTogcm91dGUuZXN0RGVwYXR1cmVPcmdpblBvcnREYXRlLFxyXG4gICAgICBlbmRUaW1lOiByb3V0ZS5lc3RBcnJpdmFsRGVzdGluYXRpb25Qb3J0RGF0ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGxQb3J0c0Zvck90aGVycyhwYXJtOiB7IElzRnJvbUJvb2tpbmc/OiBib29sZWFuLCBJc0Zyb21TaGlwbWVudD86IGJvb2xlYW4sIElzRnJvbU9yaWdpbj86IGJvb2xlYW4sIElzRnJvbURlc3RpbmF0aW9uPzogYm9vbGVhbiB9KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCgnL0NTUC9TaGlwbWVudC9HZXRBbGxQb3J0c0Zvck90aGVycycsIHBhcm0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsTG9jYXRpb25zRm9yT3RoZXJzKHBhcm06IHsgSXNGcm9tQm9va2luZz86IGJvb2xlYW4sIElzRnJvbVNoaXBtZW50PzogYm9vbGVhbiwgSXNGcm9tT3JpZ2luPzogYm9vbGVhbiwgSXNGcm9tRGVzdGluYXRpb24/OiBib29sZWFuIH0pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCcvQ1NQL1NoaXBtZW50L0dldEFsbExvY2F0aW9uc0Zvck90aGVycycsIHBhcm0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsQ29tcGFueUZvck90aGVycygpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCcvQ1NQL1NoaXBtZW50L0dldEFsbENvbXBhbnlGb3JPdGhlcnMnKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZU9yVXBkYXRlQ29uZGl0aW9uR3JvdXAocGFyYW0pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpzb24oJy9QbGF0Zm9ybS9CdXNpbmVzc0ZpbHRlci9DcmVhdGVPclVwZGF0ZUNvbmRpdGlvbkdyb3VwJywgcGFyYW0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2hpcG1lbnRMaW5rRGV0YWlsKElkOiBudW1iZXIpIHtcclxuICAgIGxldCBwYXJhbXMgPSB7SWR9O1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJy9DU1AvU2hpcG1lbnRTaGFyZUxpbmsvR2V0RGV0YWlsJywgcGFyYW1zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNoaXBtZW50IOeahOi3r+e6v1xyXG4gICAqIEBwYXJhbSBkZXRhaWxzXHJcbiAgICogICDnm67liY3lj4LmlbDmmK/mlbDnu4TvvIzlupTor6XnlKjkuI3liLDmlbDnu4TkvKDov5vmnaXnmoTlupTor6Xpg73mmK/ljZXkuKpcclxuICAgKi9cclxuICBnZXRTaGlwbWVudE1hcERhdGFCeURldGFpbHMoZGV0YWlsczogU2hpcG1lbnREZXRhaWxbXSk6IE9ic2VydmFibGU8e2ljb25zOiBhbnlbXSwgbGluZXM6IGFueVtdLCBkYXNoZWRMaW5lczogYW55W119W10+IHtcclxuICAgIHJldHVybiBmb3JrSm9pbihcclxuICAgICAgZGV0YWlscy5tYXAoZGV0YWlsID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8e2ljb25zOiBhbnlbXSwgbGluZXM6IGFueVtdLCBkYXNoZWRMaW5lczogYW55W119Pihhc3luYyByZXNvbHZlID0+IHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb25zID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IGRhc2hlZExpbmVzID0gW107XHJcbiAgICAgICAgICAgIGxldCB0cmFjazogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgY29uc3QgcG9ydEFkZHJlc3MgPVxyXG4gICAgICAgICAgICAgIFtkZXRhaWwucm91dGVEZXRhaWxzLm9yaWdpblBvcnQsIGRldGFpbC5yb3V0ZURldGFpbHMuZGVzdGluYXRpb25Qb3J0XS5tYXAocG9ydCA9PiBgJHtwb3J0Lm5hbWV9LCR7cG9ydC5mdWxsTmFtZX1gKTtcclxuICAgICAgICAgICAgY29uc3QgcG9ydFBvaW50TGlzdCA9IChhd2FpdCBmb3JrSm9pbihwb3J0QWRkcmVzcy5tYXAobyA9PiB0aGlzLmFtYXBTZXJ2aWNlLmdvb2dsZUdlbyhvKSkpLnRvUHJvbWlzZSgpKVxyXG4gICAgICAgICAgICAgIC5tYXAobyA9PiBbby5nZW9tZXRyeS5sb2NhdGlvbi5sbmcsIG8uZ2VvbWV0cnkubG9jYXRpb24ubGF0XSlcclxuXHJcbiAgICAgICAgICAgIGlmIChkZXRhaWwuZnJlaWdodE1ldGhvZFR5cGUgPT09IEZyZWlnaHRNZXRob2RUeXBlLk9jZWFuKSB7XHJcbiAgICAgICAgICAgICAgLy8gcG9ydCBpY29uXHJcbiAgICAgICAgICAgICAgaWNvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBwb2ludDogcG9ydFBvaW50TGlzdFswXSxcclxuICAgICAgICAgICAgICAgIGljb246ICdpY29uLXBvcnQnLFxyXG4gICAgICAgICAgICAgIH0sIHsgcG9pbnQ6IHBvcnRQb2ludExpc3RbMV0sIGljb246ICdpY29uLXBvcnQnIH0pO1xyXG4gICAgICAgICAgICAgIHRyYWNrID0gYXdhaXQgKHRoaXMuZ2V0U2hpcG1lbnRUcmFja0J5UmVzKGRldGFpbClcclxuICAgICAgICAgICAgICAgIC5waXBlKG1hcChvID0+IG8ubWFwKHAgPT4gcC5wb2ludCkpKVxyXG4gICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpKTtcclxuICAgICAgICAgICAgICAvLyBkaXNwbGF5IHdoZW4gb24gdGhlIHdheVxyXG4gICAgICAgICAgICAgIGlmICh0cmFjay5sZW5ndGggJiYgZGV0YWlsLnN0YXR1cyA9PT0gU2hpcG1lbnRTdGF0dXNFbnVtLkluVHJhbnNpdFRvQXJyaXZhbFBvcnQpIHtcclxuICAgICAgICAgICAgICAgIGljb25zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICBwb2ludDogdHJhY2tbdHJhY2subGVuZ3RoIC0gMV0sXHJcbiAgICAgICAgICAgICAgICAgIGljb246ICdpY29uLXNoaXAtcm91bmQnLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIHBvcnQgaWNvblxyXG4gICAgICAgICAgICAgIGljb25zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgcG9pbnQ6IHBvcnRQb2ludExpc3RbMF0sXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnaWNvbi1wb3J0JyxcclxuICAgICAgICAgICAgICB9LCB7IHBvaW50OiBwb3J0UG9pbnRMaXN0WzFdLCBpY29uOiAnaWNvbi1wb3J0JyB9KTtcclxuICAgICAgICAgICAgICAvLyBkaXNwbGF5IHdoZW4gb24gdGhlIHdheVxyXG4gICAgICAgICAgICAgIGlmIChkZXRhaWwuc3RhdHVzID09PSBTaGlwbWVudFN0YXR1c0VudW0uSW5UcmFuc2l0VG9BcnJpdmFsUG9ydCkge1xyXG4gICAgICAgICAgICAgICAgaWNvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgIHBvaW50OlxyXG4gICAgICAgICAgICAgICAgICAgIFt0cmFja1swXVswXSArIHRyYWNrWzFdWzBdLCB0cmFja1swXVsxXSArIHRyYWNrWzFdWzFdXVxyXG4gICAgICAgICAgICAgICAgICAgIC8qdHJhY2sucmVkdWNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgKGFjYzogW251bWJlciwgbnVtYmVyXSwgY3VyOiBbbnVtYmVyLCBudW1iZXJdKSA9PiBhY2MubWFwKCh2YWwsIGkpID0+IFt2YWwgKyBjdXJbaV1dKVxyXG4gICAgICAgICAgICAgICAgICAgICkqLy5tYXAobyA9PiBvIC8gMiksXHJcbiAgICAgICAgICAgICAgICAgIGljb246ICdpY29uLWFpcnBsYW5lJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB0cmFjayBzdGFydCBhbmQgZW5kIGF0IHBvcnRcclxuICAgICAgICAgICAgdHJhY2sudW5zaGlmdChwb3J0UG9pbnRMaXN0WzBdKTtcclxuICAgICAgICAgICAgdHJhY2sucHVzaChwb3J0UG9pbnRMaXN0WzFdKTtcclxuICAgICAgICAgICAgLy8gb24gdGhlIHdheSBvciBmaW5pc2hlZFxyXG4gICAgICAgICAgICBpZiAoW1NoaXBtZW50U3RhdHVzRW51bS5JblRyYW5zaXRUb0Fycml2YWxQb3J0LCBTaGlwbWVudFN0YXR1c0VudW0uQXJyaXZhbFBvcnRdLmluY2x1ZGVzKGRldGFpbC5zdGF0dXMpKSB7XHJcbiAgICAgICAgICAgICAgbGluZXMucHVzaCh0cmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGFzaGVkTGluZXMucHVzaCh0cmFjayk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICAgIGZvcmtKb2luKFxyXG4gICAgICAgICAgICAgICAgZGV0YWlsLnJvdXRlRGV0YWlscy5zaGlwcGVySW5mb3MubWFwKG8gPT4gdGhpcy5hbWFwU2VydmljZS5nb29nbGVHZW8oby5zaGlwcGVyTmV0V29ya0luZm8uc3RyZWV0QWRkcmVzcykpXHJcbiAgICAgICAgICAgICAgKS50b1Byb21pc2UoKSxcclxuICAgICAgICAgICAgICBmb3JrSm9pbihcclxuICAgICAgICAgICAgICAgIGRldGFpbC5yb3V0ZURldGFpbHMuY29uc2lnbmVlSW5mb3MubWFwKG8gPT4gdGhpcy5hbWFwU2VydmljZS5nb29nbGVHZW8oby5jb25zaWduZWVOZXRXb3JrSW5mby5zdHJlZXRBZGRyZXNzKSlcclxuICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpLFxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IFtzaGlwcGVyQWRkcmVzc0xpc3QsIGNvbnNpZ25lZUFkZHJlc3NMaXN0XSA9IGFkZHJlc3MubWFwKG8gPT4gbyA/IG8gOiBbXSk7XHJcbiAgICAgICAgICAgIFtzaGlwcGVyQWRkcmVzc0xpc3QsIGNvbnNpZ25lZUFkZHJlc3NMaXN0XS5mb3JFYWNoKChhZGRyZXNzTGlzdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICBhZGRyZXNzTGlzdC5tYXAoZ2VvID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gW2dlby5nZW9tZXRyeS5sb2NhdGlvbi5sbmcsIGdlby5nZW9tZXRyeS5sb2NhdGlvbi5sYXRdO1xyXG4gICAgICAgICAgICAgICAgaWNvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgIHBvaW50LFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAnaWNvbi13YXJlaG91c2UnLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBkYXNoZWRMaW5lcy5wdXNoKFtwb2ludCwgdHJhY2tbMF1dKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGV0YWlsLnN0YXR1cyA+IFNoaXBtZW50U3RhdHVzRW51bS5JblRyYW5zaXRUb0RlcGFydHVyZVBvcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGxpbmVzLnB1c2goW3BvaW50LCB0cmFja1swXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGV0YWlsLnN0YXR1cyA9PT0gU2hpcG1lbnRTdGF0dXNFbnVtLkluVHJhbnNpdFRvRGVwYXJ0dXJlUG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWNvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50OiBbcG9pbnRbMF0gKyB0cmFja1swXVswXSwgcG9pbnRbMV0gKyB0cmFja1swXVsxXV0ubWFwKG8gPT4gbyAvIDIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnaWNvbi10cnVjaycsXHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBkYXNoZWRMaW5lcy5wdXNoKFt0cmFja1t0cmFjay5sZW5ndGggLSAxXSwgcG9pbnRdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGV0YWlsLnN0YXR1cyA+IFNoaXBtZW50U3RhdHVzRW51bS5JblRyYW5zaXRUb0ZpbmFsRGVzdGluYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGxpbmVzLnB1c2goW3RyYWNrW3RyYWNrLmxlbmd0aCAtIDFdLCBwb2ludF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGV0YWlsLnN0YXR1cyA9PT0gU2hpcG1lbnRTdGF0dXNFbnVtLkluVHJhbnNpdFRvRmluYWxEZXN0aW5hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWNvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50OiBbcG9pbnRbMF0gKyB0cmFja1t0cmFjay5sZW5ndGggLSAxXVswXSwgcG9pbnRbMV0gKyB0cmFja1t0cmFjay5sZW5ndGggLSAxXVsxXV0ubWFwKG8gPT4gbyAvIDIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnaWNvbi10cnVjaycsXHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZSh7aWNvbnMsIGxpbmVzLCBkYXNoZWRMaW5lc30pO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgKS5waXBlKFxyXG4gICAgICBtYXAobyA9PiBvLmZpbHRlcihwID0+IHApKSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzaGlwbWVudCDnirbmgIHngrlcclxuICAgKiBAcGFyYW0gZGV0YWlsc1xyXG4gICAqL1xyXG4gIGdldEljb25MaXN0QnlEZXRhaWxzKGRldGFpbHM6IFNoaXBtZW50RGV0YWlsW10pOiBPYnNlcnZhYmxlPHsgcG9pbnQ6IG51bWJlcltdLCB0ZW1wbGF0ZTogYW55LCBpY29uOiBzdHJpbmcsIGRhdGE/OiBhbnkgfVtdPiB7XHJcbiAgICBjb25zdCBpY29uRmFjdG9yeSA9IChwLCBpY29uLCBkZXRhaWwpID0+ICh7XHJcbiAgICAgIHBvaW50OiBbXHJcbiAgICAgICAgcC5nZW9tZXRyeS5sb2NhdGlvbi5sbmcgKyBNYXRoLnJhbmRvbSgpICogMC4wMDggLSAwLjAwNCwgLy8gcHJldmVudCBtdWx0aXBsZSBwb2ludHMgb24gb25lIGNvb3JcclxuICAgICAgICBwLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCArIE1hdGgucmFuZG9tKCkgKiAwLjAwOCAtIDAuMDA0LFxyXG4gICAgICBdLFxyXG4gICAgICB0ZW1wbGF0ZTogdGhpcy5jb21wb25lbnRUb0h0bWxTZXJ2aWNlLmdldFNoaXBtZW50VGVtcGxhdGUoZGV0YWlsKSxcclxuICAgICAgaWNvbixcclxuICAgICAgZGF0YTogZGV0YWlsLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcG9ydEljb25GYWN0b3J5ID0gKHBvcnQsIGRldGFpbDogU2hpcG1lbnREZXRhaWwpID0+XHJcbiAgICAgIHRoaXMuYW1hcFNlcnZpY2UuZ29vZ2xlR2VvKGAke3BvcnQubmFtZX0gJHtwb3J0LmZ1bGxOYW1lfWApXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAobyA9PiBpY29uRmFjdG9yeShvLCAgZGV0YWlsLmZyZWlnaHRNZXRob2RUeXBlID09PSBGcmVpZ2h0TWV0aG9kVHlwZS5PY2VhbiA/ICdpY29uLXNoaXAtcm91bmQnIDogJ2ljb24tYWlycGxhbmUnLCBkZXRhaWwpKVxyXG4gICAgICAgICkudG9Qcm9taXNlKCk7XHJcblxyXG4gICAgY29uc3QgYWlyRnJlaWdodFR5cGVJY29uRmFjdG9yeSA9IGFzeW5jIChkZXRhaWwpID0+IHtcclxuICAgICAgY29uc3QgcG9ydEFkZHJlc3MgPVxyXG4gICAgICAgIFtkZXRhaWwucm91dGVEZXRhaWxzLm9yaWdpblBvcnQsIGRldGFpbC5yb3V0ZURldGFpbHMuZGVzdGluYXRpb25Qb3J0XS5tYXAocG9ydCA9PiBgJHtwb3J0Lm5hbWV9LCR7cG9ydC5mdWxsTmFtZX1gKTtcclxuICAgICAgY29uc3QgdHJhY2sgPSAoYXdhaXQgZm9ya0pvaW4ocG9ydEFkZHJlc3MubWFwKG8gPT4gdGhpcy5hbWFwU2VydmljZS5nb29nbGVHZW8obykpKS50b1Byb21pc2UoKSlcclxuICAgICAgICAubWFwKG8gPT4gW28uZ2VvbWV0cnkubG9jYXRpb24ubG5nLCBvLmdlb21ldHJ5LmxvY2F0aW9uLmxhdF0pO1xyXG4gICAgICBjb25zdCBpY29ucyA9IHtcclxuICAgICAgICBwb2ludDpcclxuICAgICAgICAgIHRyYWNrLnJlZHVjZShcclxuICAgICAgICAgICAgKGFjYzogW251bWJlciwgbnVtYmVyXSwgY3VyOiBbbnVtYmVyLCBudW1iZXJdKSA9PiBhY2MubWFwKCh2YWwsIGkpID0+IHZhbCArIGN1cltpXSlcclxuICAgICAgICAgICkubWFwKG8gPT4gbyAvIDIpLFxyXG4gICAgICAgIGljb246ICdpY29uLWFpcnBsYW5lJyxcclxuICAgICAgICB0ZW1wbGF0ZTogdGhpcy5jb21wb25lbnRUb0h0bWxTZXJ2aWNlLmdldFNoaXBtZW50VGVtcGxhdGUoZGV0YWlsKSxcclxuICAgICAgICBkYXRhOiBkZXRhaWxcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIGljb25zO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCB0cnVja0ljb25GYWN0b3J5ID0gYXN5bmMgKHJlcG9MaXN0OiBhbnlbXSwgcG9ydCwgZGV0YWlsKSA9PiB7XHJcbiAgICAgIGNvbnN0IGdlb0xpc3QgPSBhd2FpdCBmb3JrSm9pbihcclxuICAgICAgICByZXBvTGlzdC5tYXAobyA9PiB0aGlzLmFtYXBTZXJ2aWNlLmdvb2dsZUdlbyhvLnNoaXBwZXJOZXRXb3JrSW5mby5zdHJlZXRBZGRyZXNzKSlcclxuICAgICAgKS50b1Byb21pc2UoKVxyXG4gICAgICBjb25zdCBwb3J0R2VvID0gYXdhaXQgdGhpcy5hbWFwU2VydmljZS5nb29nbGVHZW8oYCR7cG9ydC5uYW1lfSwke3BvcnQuZnVsbG5hbWV9YCkudG9Qcm9taXNlKCk7XHJcbiAgICAgIHJldHVybiBnZW9MaXN0Lm1hcChnZW8gPT4ge1xyXG4gICAgICAgIGdlby5nZW9tZXRyeS5sb2NhdGlvbi5sbmcgPSAoZ2VvLmdlb21ldHJ5LmxvY2F0aW9uLmxuZyArIHBvcnRHZW8uZ2VvbWV0cnkubG9jYXRpb24ubG5nKSAvIDI7XHJcbiAgICAgICAgZ2VvLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCA9IChnZW8uZ2VvbWV0cnkubG9jYXRpb24ubGF0ICsgcG9ydEdlby5nZW9tZXRyeS5sb2NhdGlvbi5sYXQpIC8gMjtcclxuICAgICAgICByZXR1cm4gaWNvbkZhY3RvcnkoZ2VvLCAnaWNvbi10cnVjaycsIGRldGFpbClcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9ya0pvaW4oXHJcbiAgICAgIC8vIG1hcCB0byBpY29uIGFycmF5XHJcbiAgICAgIGRldGFpbHMubWFwKGFzeW5jIGRldGFpbCA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IG9yaWdpblBvcnQgPSBkZXRhaWwucm91dGVEZXRhaWxzLm9yaWdpblBvcnQ7XHJcbiAgICAgICAgICBjb25zdCBkZXN0aW5hdGlvblBvcnQgPSBkZXRhaWwucm91dGVEZXRhaWxzLmRlc3RpbmF0aW9uUG9ydDtcclxuXHJcbiAgICAgICAgICAvLyBhc3NlbWJsZSBpY29uc1xyXG4gICAgICAgICAgc3dpdGNoIChkZXRhaWwuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU2hpcG1lbnRTdGF0dXNFbnVtLlNlbGxlckxvY2F0aW9uOlxyXG4gICAgICAgICAgICBjYXNlIFNoaXBtZW50U3RhdHVzRW51bS5PcmlnaW5TdG9wT2ZmOlxyXG4gICAgICAgICAgICBjYXNlIFNoaXBtZW50U3RhdHVzRW51bS5JblRyYW5zaXRUb0RlcGFydHVyZVBvcnQ6XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcmtKb2luKFxyXG4gICAgICAgICAgICAgICAgZGV0YWlsLnJvdXRlRGV0YWlscy5zaGlwcGVySW5mb3MubWFwKG8gPT4gdGhpcy5hbWFwU2VydmljZS5nb29nbGVHZW8oby5zaGlwcGVyTmV0V29ya0luZm8uc3RyZWV0QWRkcmVzcykpXHJcbiAgICAgICAgICAgICAgKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKG8gPT5cclxuICAgICAgICAgICAgICAgICAgby5tYXAoXHJcbiAgICAgICAgICAgICAgICAgICAgcCA9PiBpY29uRmFjdG9yeShwLCAnaWNvbi13YXJlaG91c2Utcm91bmQnLCBkZXRhaWwpXHJcbiAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpO1xyXG4gICAgICAgICAgICBjYXNlIFNoaXBtZW50U3RhdHVzRW51bS5EZXBhcnR1cmVQb3J0OlxyXG4gICAgICAgICAgICAgIHJldHVybiBwb3J0SWNvbkZhY3RvcnkoZGV0YWlsLnJvdXRlRGV0YWlscy5vcmlnaW5Qb3J0LCBkZXRhaWwpO1xyXG4gICAgICAgICAgICBjYXNlIFNoaXBtZW50U3RhdHVzRW51bS5JblRyYW5zaXRUb0Fycml2YWxQb3J0OlxyXG4gICAgICAgICAgICAgIC8vIHNoaXA6IGlmIGhhcyB0cmFjayBkYXRhIGRpc3BsYXkgbGFzdCBwb2ludCwgZWxzZSBpbiBwb3J0XHJcbiAgICAgICAgICAgICAgLy8gYWlyOiBkaXNwbGF5IGluIHdheVxyXG4gICAgICAgICAgICAgIHJldHVybiBkZXRhaWwuZnJlaWdodE1ldGhvZFR5cGUgPT09IEZyZWlnaHRNZXRob2RUeXBlLk9jZWFuID9cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2hpcG1lbnRUcmFja0J5UmVzKGRldGFpbClcclxuICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgbWFwKG8gPT4gby5sZW5ndGggPyBpY29uRmFjdG9yeSh7IGdlb21ldHJ5OiB7bG9jYXRpb246IHsgbG5nOiBvW2xlbmd0aC0xXS5wb2ludFswXSwgbGF0OiBvW2xlbmd0aC0xXS5wb2ludFsxXSB9fX0sICdpY29uLXNoaXAtcm91bmQnLCBkZXRhaWwpIDogcG9ydEljb25GYWN0b3J5KGRldGFpbC5yb3V0ZURldGFpbHMub3JpZ2luUG9ydCwgZGV0YWlsKSlcclxuICAgICAgICAgICAgICAgICAgKS50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgOiBhaXJGcmVpZ2h0VHlwZUljb25GYWN0b3J5KGRldGFpbCk7XHJcbiAgICAgICAgICAgIGNhc2UgU2hpcG1lbnRTdGF0dXNFbnVtLkFycml2YWxQb3J0OlxyXG4gICAgICAgICAgICAgIHJldHVybiBwb3J0SWNvbkZhY3RvcnkoZGV0YWlsLnJvdXRlRGV0YWlscy5kZXN0aW5hdGlvblBvcnQsIGRldGFpbClcclxuICAgICAgICAgICAgY2FzZSBTaGlwbWVudFN0YXR1c0VudW0uSW5UcmFuc2l0VG9GaW5hbERlc3RpbmF0aW9uOlxyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVja0ljb25GYWN0b3J5KGRldGFpbC5yb3V0ZURldGFpbHMuY29uc2lnbmVlSW5mb3MsIGRldGFpbC5yb3V0ZURldGFpbHMuZGVzdGluYXRpb25Qb3J0LCBkZXRhaWwpO1xyXG4gICAgICAgICAgICBjYXNlIFNoaXBtZW50U3RhdHVzRW51bS5GaW5hbERlc3RpbmF0aW9uOlxyXG4gICAgICAgICAgICAgIHJldHVybiBmb3JrSm9pbihcclxuICAgICAgICAgICAgICAgIGRldGFpbC5yb3V0ZURldGFpbHMuY29uc2lnbmVlSW5mb3MubWFwKG8gPT4gdGhpcy5hbWFwU2VydmljZS5nb29nbGVHZW8oby5jb25zaWduZWVOZXRXb3JrSW5mby5zdHJlZXRBZGRyZXNzKSlcclxuICAgICAgICAgICAgICApLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAobyA9PlxyXG4gICAgICAgICAgICAgICAgICBvLm1hcChcclxuICAgICAgICAgICAgICAgICAgICBwID0+IGljb25GYWN0b3J5KHAsICdpY29uLXdhcmVob3VzZS1yb3VuZCcsIGRldGFpbClcclxuICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICkudG9Qcm9taXNlKCk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgKS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKChlKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICByZXR1cm4gb2YoW10pXHJcbiAgICAgIH0pLFxyXG4gICAgICBtYXAobyA9PiBmbGF0dGVuKG8pKSxcclxuICAgIClcclxuICB9XHJcbn1cclxuIl19