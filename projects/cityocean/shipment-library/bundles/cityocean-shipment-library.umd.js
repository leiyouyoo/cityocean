(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@cityocean/common-library'), require('rxjs/operators'), require('rxjs'), require('lodash'), require('@cityocean/basicdata-library'), require('@cityocean/amap-library')) :
    typeof define === 'function' && define.amd ? define('@cityocean/shipment-library', ['exports', '@angular/core', '@cityocean/common-library', 'rxjs/operators', 'rxjs', 'lodash', '@cityocean/basicdata-library', '@cityocean/amap-library'], factory) :
    (global = global || self, factory((global.cityocean = global.cityocean || {}, global.cityocean['shipment-library'] = {}), global.ng.core, global.commonLibrary, global.rxjs.operators, global.rxjs, global.lodash, global.basicdataLibrary, global.amapLibrary));
}(this, (function (exports, core, commonLibrary, operators, rxjs, lodash, basicdataLibrary, amapLibrary) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

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
            { type: core.Pipe, args: [{
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
                .pipe(operators.map((/**
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
                    s.transportType = s.freightMethodType === basicdataLibrary.FreightMethodType.Ocean ? 'ship' : 'air';
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
                .pipe(operators.map((/**
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
            return rxjs.forkJoin(details.map((/**
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
                                return [4 /*yield*/, rxjs.forkJoin(portAddress.map((/**
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
                                if (!(detail.freightMethodType === basicdataLibrary.FreightMethodType.Ocean)) return [3 /*break*/, 3];
                                // port icon
                                icons_1.push({
                                    point: portPointList[0],
                                    icon: 'icon-port',
                                }, { point: portPointList[1], icon: 'icon-port' });
                                return [4 /*yield*/, (this.getShipmentTrackByRes(detail)
                                        .pipe(operators.map((/**
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
                                        rxjs.forkJoin(detail.routeDetails.shipperInfos.map((/**
                                         * @param {?} o
                                         * @return {?}
                                         */
                                        function (o) { return _this.amapService.googleGeo(o.shipperNetWorkInfo.streetAddress); }))).toPromise(),
                                        rxjs.forkJoin(detail.routeDetails.consigneeInfos.map((/**
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
            }))).pipe(operators.map((/**
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
                    .pipe(operators.map((/**
                 * @param {?} o
                 * @return {?}
                 */
                function (o) { return iconFactory(o, detail.freightMethodType === basicdataLibrary.FreightMethodType.Ocean ? 'icon-ship-round' : 'icon-airplane', detail); }))).toPromise();
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
                            return [4 /*yield*/, rxjs.forkJoin(portAddress.map((/**
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
                        case 0: return [4 /*yield*/, rxjs.forkJoin(repoList.map((/**
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
            return rxjs.forkJoin(
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
                                return [2 /*return*/, rxjs.forkJoin(detail.routeDetails.shipperInfos.map((/**
                                     * @param {?} o
                                     * @return {?}
                                     */
                                    function (o) { return _this.amapService.googleGeo(o.shipperNetWorkInfo.streetAddress); }))).pipe(operators.map((/**
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
                                return [2 /*return*/, detail.freightMethodType === basicdataLibrary.FreightMethodType.Ocean ?
                                        this.getShipmentTrackByRes(detail)
                                            .pipe(operators.map((/**
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
                                return [2 /*return*/, rxjs.forkJoin(detail.routeDetails.consigneeInfos.map((/**
                                     * @param {?} o
                                     * @return {?}
                                     */
                                    function (o) { return _this.amapService.googleGeo(o.consigneeNetWorkInfo.streetAddress); }))).pipe(operators.map((/**
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
            }); }))).pipe(operators.catchError((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                console.error(e);
                return rxjs.of([]);
            })), operators.map((/**
             * @param {?} o
             * @return {?}
             */
            function (o) { return lodash.flatten(o); })));
        };
        ShipmentService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ShipmentService.ctorParameters = function () { return [
            { type: commonLibrary.HttpService },
            { type: amapLibrary.AmapService },
            { type: amapLibrary.ComponentToHtmlService }
        ]; };
        /** @nocollapse */ ShipmentService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function ShipmentService_Factory() { return new ShipmentService(core.ɵɵinject(commonLibrary.HttpService), core.ɵɵinject(amapLibrary.AmapService), core.ɵɵinject(amapLibrary.ComponentToHtmlService)); }, token: ShipmentService, providedIn: "root" });
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
            { type: core.NgModule, args: [{
                        declarations: __spread(pipes),
                        imports: [],
                        exports: __spread(pipes)
                    },] }
        ];
        return ShipmentLibraryModule;
    }());

    exports.ShipmentLibraryModule = ShipmentLibraryModule;
    exports.ShipmentService = ShipmentService;
    exports.ShipmentStatusEnum = ShipmentStatusEnum;
    exports.shipmentStatus = shipmentStatus;
    exports.ɵa = ShipmentStatusPipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cityocean-shipment-library.umd.js.map
