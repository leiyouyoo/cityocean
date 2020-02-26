(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@cityocean/common-library'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@cityocean/amap-library', ['exports', '@angular/core', '@cityocean/common-library', '@angular/common/http', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (global = global || self, factory((global.cityocean = global.cityocean || {}, global.cityocean['amap-library'] = {}), global.ng.core, global.commonLibrary, global.ng.common.http, global.rxjs, global.rxjs.operators, global.ng.common));
}(this, (function (exports, core, commonLibrary, http, rxjs, operators, common) { 'use strict';

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
     * Generated from: lib/services/amap-http.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AmapHttpService = /** @class */ (function () {
        function AmapHttpService(handler) {
            this.handler = handler;
            this.http = new http.HttpClient(this.handler);
        }
        /**
         * @param {?} url
         * @param {?=} params
         * @param {?=} headers
         * @return {?}
         */
        AmapHttpService.prototype.get = /**
         * @param {?} url
         * @param {?=} params
         * @param {?=} headers
         * @return {?}
         */
        function (url, params, headers) {
            return this.http.get(url, { params: params });
        };
        AmapHttpService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        AmapHttpService.ctorParameters = function () { return [
            { type: http.HttpBackend }
        ]; };
        /** @nocollapse */ AmapHttpService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function AmapHttpService_Factory() { return new AmapHttpService(core.ɵɵinject(http.HttpBackend)); }, token: AmapHttpService, providedIn: "root" });
        return AmapHttpService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AmapHttpService.prototype.http;
        /**
         * @type {?}
         * @private
         */
        AmapHttpService.prototype.handler;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/services/amap.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function GeoResult() { }
    if (false) {
        /** @type {?} */
        GeoResult.prototype.address_components;
        /** @type {?} */
        GeoResult.prototype.formatted_address;
        /** @type {?} */
        GeoResult.prototype.geometry;
        /** @type {?} */
        GeoResult.prototype.place_id;
        /** @type {?} */
        GeoResult.prototype.types;
    }
    /**
     * @record
     */
    function AddressComponent() { }
    if (false) {
        /** @type {?} */
        AddressComponent.prototype.long_name;
        /** @type {?} */
        AddressComponent.prototype.short_name;
        /** @type {?} */
        AddressComponent.prototype.types;
    }
    /**
     * @record
     */
    function Geometry() { }
    if (false) {
        /** @type {?} */
        Geometry.prototype.bounds;
        /** @type {?} */
        Geometry.prototype.location;
        /** @type {?} */
        Geometry.prototype.location_type;
        /** @type {?} */
        Geometry.prototype.viewport;
    }
    /**
     * @record
     */
    function Bounds() { }
    if (false) {
        /** @type {?} */
        Bounds.prototype.northeast;
        /** @type {?} */
        Bounds.prototype.southwest;
    }
    /**
     * @record
     */
    function Location() { }
    if (false) {
        /** @type {?} */
        Location.prototype.lat;
        /** @type {?} */
        Location.prototype.lng;
    }
    /**
     * @record
     */
    function NetworkLocation() { }
    if (false) {
        /** @type {?} */
        NetworkLocation.prototype.streetAddress;
        /** @type {?|undefined} */
        NetworkLocation.prototype.tenantName;
        /** @type {?|undefined} */
        NetworkLocation.prototype.province;
        /** @type {?|undefined} */
        NetworkLocation.prototype.country;
        /** @type {?|undefined} */
        NetworkLocation.prototype.city;
        /* Skipping unhandled member: [PROP_NAME: string]: any;*/
    }
    var AmapService = /** @class */ (function () {
        function AmapService(amapHttp) {
            this.amapHttp = amapHttp;
            this.googleKey = 'AIzaSyAEdT5BA0MmANhrmcnR4QrXu08gLtgvhqI';
        }
        /**
         * @param {?} addressList
         * @param {?=} city
         * @return {?}
         */
        AmapService.prototype.getMarkerByAddressListAMap = /**
         * @param {?} addressList
         * @param {?=} city
         * @return {?}
         */
        function (addressList, city) {
            /** @type {?} */
            var option = {};
            if (city)
                option.city = city;
            /** @type {?} */
            var geocoder = new AMap.Geocoder({});
            return new rxjs.Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                rxjs.forkJoin(addressList.map((/**
                 * @param {?} address
                 * @return {?}
                 */
                function (address) {
                    return new rxjs.Observable((/**
                     * @param {?} ob
                     * @return {?}
                     */
                    function (ob) {
                        geocoder.getLocation(address, (/**
                         * @param {?} status
                         * @param {?} res
                         * @return {?}
                         */
                        function (status, res) {
                            /** @type {?} */
                            var point;
                            if (status !== 'complete') {
                                point = [];
                            }
                            else {
                                /** @type {?} */
                                var first = res.geocodes[0];
                                point = [first.location.lng, first.location.lat];
                            }
                            ob.next({ point: point });
                            ob.complete();
                        }));
                    }));
                })))
                    .subscribe((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    observer.next(res);
                    observer.complete();
                }));
            }));
        };
        /**
         * @param {?} locationList
         * @return {?}
         */
        AmapService.prototype.getMarkerByLocationList = /**
         * @param {?} locationList
         * @return {?}
         */
        function (locationList) {
            var _this = this;
            /** @type {?} */
            var option = {};
            return new rxjs.Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                rxjs.forkJoin(locationList.map((/**
                 * @param {?} location
                 * @return {?}
                 */
                function (location) {
                    return _this.googleGeo(location.streetAddress)
                        .pipe(operators.catchError((/**
                     * @param {?} o
                     * @return {?}
                     */
                    function (o) { return null; })));
                })))
                    .subscribe((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    /** @type {?} */
                    var results = res.map((/**
                     * @param {?} result
                     * @param {?} i
                     * @return {?}
                     */
                    function (result, i) {
                        /** @type {?} */
                        var point = [];
                        if (result) {
                            point = [result.geometry.location.lng, result.geometry.location.lat];
                        }
                        /** @type {?} */
                        var location = locationList[i];
                        return {
                            point: point,
                            icon: 'icon-dingwei',
                            data: location,
                            template: {
                                title: location.tenantName,
                                body: "" + [location.streetAddress, location.city, location.province, location.country].filter((/**
                                 * @param {?} o
                                 * @return {?}
                                 */
                                function (o) { return o; })).join(', ')
                            },
                        };
                    }));
                    observer.next(results);
                    observer.complete();
                }));
            }));
        };
        /**
         * @return {?}
         */
        AmapService.prototype.poi = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var placeSearch = new AMap.PlaceSearch({
                city: "New York"
            });
            placeSearch.search('New York', (/**
             * @param {?} status
             * @param {?} result
             * @return {?}
             */
            function (status, result) {
                // 搜索成功时，result即是对应的匹配数据
            }));
        };
        //地图搜索地址
        //地图搜索地址
        /**
         * @param {?} input
         * @return {?}
         */
        AmapService.prototype.mapSearch = 
        //地图搜索地址
        /**
         * @param {?} input
         * @return {?}
         */
        function (input) {
            /** @type {?} */
            var url = "http://47.254.45.110:11045/place/maps/api/place/autocomplete/json";
            /** @type {?} */
            var params = {
                input: input,
                key: "AIzaSyAEdT5BA0MmANhrmcnR4QrXu08gLtgvhqI",
                language: 'en'
            };
            return this.amapHttp.get(url, params);
        };
        /**
         * @param {?} address
         * @return {?}
         */
        AmapService.prototype.googleGeo = /**
         * @param {?} address
         * @return {?}
         */
        function (address) {
            var _this = this;
            // const url = `https://maps.googleapis.com/maps/api/js/GeocodeService.Search?4ssichuan2&7sUS&9szh-CN&callback=_xdc_._s18ps3&key=AIzaSyDIJ9XX2ZvRKCJcFRrl-lRanEtFUow4piM&token=28858`
            /** @type {?} */
            var url = "http://47.254.45.110:11045/geo/maps/api/geocode/json?address=" + address + "&key=" + this.googleKey;
            return new rxjs.Observable((/**
             * @param {?} ob
             * @return {?}
             */
            function (ob) {
                _this.amapHttp.get(url)
                    .subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    if (data.status === 'OK') {
                        ob.next(data.results[0]);
                        ob.complete();
                    }
                    else {
                        ob.error('Empty Geo');
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    ob.error(error);
                }));
            }));
        };
        AmapService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        AmapService.ctorParameters = function () { return [
            { type: AmapHttpService }
        ]; };
        /** @nocollapse */ AmapService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function AmapService_Factory() { return new AmapService(core.ɵɵinject(AmapHttpService)); }, token: AmapService, providedIn: "root" });
        return AmapService;
    }());
    if (false) {
        /** @type {?} */
        AmapService.prototype.googleKey;
        /**
         * @type {?}
         * @private
         */
        AmapService.prototype.amapHttp;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/component/share-amap/share-amap.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function Marker() { }
    if (false) {
        /** @type {?|undefined} */
        Marker.prototype.img;
        /** @type {?} */
        Marker.prototype.point;
    }
    /**
     * @record
     */
    function Icon() { }
    if (false) {
        /** @type {?|undefined} */
        Icon.prototype.img;
        /** @type {?|undefined} */
        Icon.prototype.icon;
        /** @type {?} */
        Icon.prototype.point;
        /** @type {?|undefined} */
        Icon.prototype.template;
        /** @type {?|undefined} */
        Icon.prototype.data;
    }
    var ShareAmapComponent = /** @class */ (function () {
        function ShareAmapComponent(renderer, el, zone, _componentFactoryResolver, http, amapHttpService, amapService) {
            this.renderer = renderer;
            this.el = el;
            this.zone = zone;
            this._componentFactoryResolver = _componentFactoryResolver;
            this.http = http;
            this.amapHttpService = amapHttpService;
            this.amapService = amapService;
            this.height = 800;
            //默认点标记
            this._markers = [];
            this.markerClick = new core.EventEmitter();
            //图标
            this._icons = [];
            this.iconClick = new core.EventEmitter();
            //线集合
            this._lines = [];
            // 虚线
            this._dashedLines = [];
            this._locationList = [];
        }
        Object.defineProperty(ShareAmapComponent.prototype, "markers", {
            get: /**
             * @return {?}
             */
            function () {
                return this._markers;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._markers = value;
                this.drawMarkers(this.markers);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShareAmapComponent.prototype, "icons", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _this = this;
                if (!value)
                    return;
                this._icons = value;
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.drawIcons();
                }));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShareAmapComponent.prototype, "lines", {
            set: /**
             * @param {?} lineList
             * @return {?}
             */
            function (lineList) {
                var _this = this;
                if (!lineList)
                    return;
                //测试参数赋值
                this._lines = lineList;
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.drawLine(_this._lines);
                }));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShareAmapComponent.prototype, "dashedLines", {
            get: /**
             * @return {?}
             */
            function () { return this._dashedLines; },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                var _this = this;
                if (!val)
                    return;
                this._dashedLines = val;
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.drawLine(_this._dashedLines, { zIndex: 40, strokeStyle: 'dashed', });
                }));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShareAmapComponent.prototype, "locationList", {
            get: /**
             * @return {?}
             */
            function () { return this._locationList; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._locationList = value;
                this.getAddressPointAndDraw();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShareAmapComponent.prototype, "setTemplate", {
            set: /**
             * @param {?} showInfo
             * @return {?}
             */
            function (showInfo) {
                if (showInfo.body instanceof core.ElementRef) {
                    showInfo.body = ((/** @type {?} */ (showInfo.body.nativeElement))).innerHTML;
                }
                this._showTemplate = showInfo;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        ShareAmapComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            // google geocoding 测试
            /*    this.amapService.googleGeo('New york')
                  .subscribe(data => {
                    console.log(data);
                  })*/
            setTimeout((/**
             * @return {?}
             */
            function () {
                return;
                _this.setTemplate = { title: "测试信息窗体", body: _this.ceshiMap };
                _this.lines = [[[116.362209, 39.887487],
                        [120.422897, 50.878002],
                        [125.372105, 60.90651],
                        [128.428945, 40.89663]], [[130.362209, 41.887487],
                        [129.422897, 45.878002],
                        [130.372105, 46.90651],
                        [135.428945, 50.89663]]];
                _this.markers = [{ img: "/assets/images/icon_weixin.png", point: [106.406315, 41.908775] }, { img: "/assets/images/icon_weixin.png", point: [116.406315, 39.928775] }]; //测试参数赋值
                _this.icons = [{ img: "/assets/images/avatar.png", icon: "", point: [106.406315, 41.908775] }, { img: "/assets/images/avatar.png", icon: "", point: [116.406315, 39.928775] }]; //测试参数赋值
            }), 1000);
            /** @type {?} */
            var id = Guid.newGuid();
            /** @type {?} */
            var div = this.mapUi.nativeElement;
            this.renderer.setAttribute(div, 'id', id);
            this.renderer.setStyle(div, 'height', this.height + 'px');
            if (this.width) {
                div.setStyle(this.el.nativeElement, 'width', this.width + 'px');
            }
            this.zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this.map = new AMap.Map(id, {
                    vectorMapForeign: 'English',
                    //加载海外矢量地图并显示为中文 English / Local / Chinese_Simplified
                    zoom: 11,
                    //级别
                    resizeEnable: true,
                    //center: [116.397428, 39.90923],//中心点坐标
                    viewMode: '2D' //使用3D视图
                });
                /*setTimeout(() => {
                  this.amapHttpService.get(`https://restapi.amap.com/v3/geocode/geo`, {
                    key: `06f3df8711e756518ba60469be0cbf14`,
                    address: `SKOPJE`,
                    country: `MAKEDONIJA`,
                  })
                    .subscribe(data => {
                      console.log(data);
                    })
                  //构造路线导航类
                  var driving = new AMap.Driving({
                    map: this.map,
                  });
                  // 根据起终点经纬度规划驾车导航路线
                  driving.search(new AMap.LngLat(-2.043457, 52.365538), new AMap.LngLat(-1.199698, 51.879038), function(status, result) {
                    // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                    if (status === 'complete') {
                      console.log('绘制驾车路线完成')
                    } else {
                      console.log('获取驾车数据失败：' + result)
                    }
                  });
                }, 3e3)*/
            }));
            //#region   注释
            // AMap.plugin(["AMap.ToolBar", "AMap.Geolocation", "AMap.Autocomplete", "AMap.PlaceSearch"], () => {//异步加载插件
            //   let toolbar = new AMap.ToolBar();
            //   this.map.addControl(toolbar);
            //   let geolocation = new AMap.Geolocation();
            //   this.map.addControl(geolocation);
            //   // 实例化Autocomplete
            //   let autoOptions = {
            //     // input 为绑定输入提示功能的input的DOM ID
            //     input: 'input_id'
            //   }
            //   let autocomplete = new AMap.Autocomplete(autoOptions);
            //   this.map.addControl(autocomplete);
            //   let placeSearch = new AMap.PlaceSearch({ city: "900000" });
            //   //map.addControl(placeSearch);
            //   //placeSearch.search('北京大学', function (status, result) {
            //   //  alert(JSON.stringify(result));
            //   //  // 查询成功时，result即对应匹配的POI信息
            //   //})
            //   AMap.event.addListener(autocomplete, 'select', (e) => {
            //     //TODO 针对选中的poi实现自己的功能
            //     placeSearch.search(e.poi.name, (status, result) => {
            //       alert(JSON.stringify(result));
            //     })
            //   })
            //   // 创建一个 Marker 实例：
            //   let marker = new AMap.Marker({
            //     position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            //     title: '北京'
            //   });
            //   // 多个点实例组成的数组
            //   let markerList = [marker];
            //   this.map.add(markerList);
            // });
            // //加载AwesomeMarker，loadUI的路径参数为模块名中 'ui/' 之后的部分
            // AMapUI.loadUI(['overlay/AwesomeMarker', 'overlay/SimpleInfoWindow'], (AwesomeMarker, SimpleInfoWindow) => {
            //   new AwesomeMarker({
            //     //设置awesomeIcon
            //     awesomeIcon: 'street-view', //可用的icons参见： http://fontawesome.io/icons/
            //     //下列参数继承自父类
            //     //iconLabel中不能包含innerHTML属性（内部会利用awesomeIcon自动构建）
            //     iconLabel: {
            //       style: {
            //         color: '#fff' //设置颜色
            //       }
            //     },
            //     iconStyle: 'lightblue', //设置图标样式
            //     //基础的Marker参数
            //     map: this.map,
            //     position: this.map.getCenter()
            //   });
            //   // 创建一个 Marker 实例：
            //   let marker = new AMap.Marker({
            //     position: this.map.getCenter(),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            //     title: 'Center'
            //   });
            //   // 多个点实例组成的数组
            //   let markerList = [marker];
            //   this.map.add(markerList);
            //   //marker 点击时打开
            //   AMap.event.addListener(marker, 'click', () => {
            //     let infoWindow = new SimpleInfoWindow({
            //       infoTitle: '这里是标题',
            //       infoBody: '<p>这里是内容。</p>',
            //       //基点指向marker的头部位置
            //       offset: new AMap.Pixel(0, -21)
            //     });
            //     //显示在map上2
            //     infoWindow.open(this.map, marker.getPosition());
            //   });
            // });
            // //加载PathSimplifier，loadUI的路径参数为模块名中 'ui/' 之后的部分
            // AMapUI.load(['ui/misc/PathSimplifier'], (PathSimplifier) => {
            //   if (!PathSimplifier.supportCanvas) {
            //     alert('当前环境不支持 Canvas！');
            //     return;
            //   }
            //   //启动页面
            //    this.initRoute(PathSimplifier);
            // });
            //#endregion
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.drawMarkers(_this.markers);
            }), 1000);
        };
        // 实例化点标记
        // 实例化点标记
        /**
         * @private
         * @param {?} pointList
         * @param {?} img
         * @return {?}
         */
        ShareAmapComponent.prototype.addMarker = 
        // 实例化点标记
        /**
         * @private
         * @param {?} pointList
         * @param {?} img
         * @return {?}
         */
        function (pointList, img) {
            /** @type {?} */
            var marker = new AMap.Marker({
                position: pointList,
                map: this.map,
                // title:"ddd",
                offset: new AMap.Pixel(-13, -30)
            });
            // marker.setMap(this.map);
            // 缩放地图到合适的视野级别
            this.map.setFitView(null, false);
        };
        /**
         * @param {?} markers
         * @return {?}
         */
        ShareAmapComponent.prototype.drawMarkers = /**
         * @param {?} markers
         * @return {?}
         */
        function (markers) {
            var _this = this;
            if (!Array.isArray(markers))
                return;
            markers.filter((/**
             * @param {?} o
             * @return {?}
             */
            function (o) { return o.point.length; })).forEach((/**
             * @param {?} marker
             * @return {?}
             */
            function (marker) {
                _this.addMarker(marker.point, '');
            }));
        };
        //画图标
        //画图标
        /**
         * @private
         * @param {?=} icons
         * @return {?}
         */
        ShareAmapComponent.prototype.drawIcons = 
        //画图标
        /**
         * @private
         * @param {?=} icons
         * @return {?}
         */
        function (icons) {
            var _this = this;
            if (icons === void 0) { icons = this._icons; }
            icons.forEach((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return _this.drawIcon(i); }));
        };
        /**
         * @private
         * @param {?} element
         * @return {?}
         */
        ShareAmapComponent.prototype.drawIcon = /**
         * @private
         * @param {?} element
         * @return {?}
         */
        function (element) {
            var _this = this;
            /** @type {?} */
            var pointList = element.point;
            /** @type {?} */
            var icon = element.icon;
            /** @type {?} */
            var showInfo = element.template;
            /** @type {?} */
            var img = element.img;
            AMapUI.loadUI(['overlay/SimpleMarker', 'overlay/SimpleInfoWindow'], (/**
             * @param {?} SimpleMarker
             * @param {?} SimpleInfoWindow
             * @return {?}
             */
            function (SimpleMarker, SimpleInfoWindow) {
                /** @type {?} */
                var imgInfo = {
                    src: img,
                    style: {
                        width: '30px',
                        height: '30px'
                    }
                };
                /** @type {?} */
                var simpleMarker = new SimpleMarker({
                    iconLabel: '',
                    iconStyle: icon ? '<span class="iconfont amapicon ' + icon + '" ></span>' : imgInfo,
                    //设置基点偏移
                    offset: new AMap.Pixel(-15, -15),
                    map: _this.map,
                    showPositionPoint: true,
                    position: pointList,
                    zIndex: 100
                });
                simpleMarker.on('click', (/**
                 * @return {?}
                 */
                function () {
                    _this.iconClick.emit(element.data);
                }));
                // 缩放地图到合适的视野级别
                _this.map.setFitView();
                if (showInfo) {
                    /** @type {?} */
                    var infoWindow_1 = new SimpleInfoWindow({
                        infoTitle: "<strong>" + showInfo.title + "</strong>",
                        infoBody: showInfo.body
                    });
                    //显示在map上
                    // infoWindow.open(this.map, pointList);
                    //marker 点击时打开
                    AMap.event.addListener(simpleMarker, 'mouseover', (/**
                     * @return {?}
                     */
                    function () {
                        infoWindow_1.open(_this.map, pointList);
                    }));
                    AMap.event.addListener(simpleMarker, 'mouseout', (/**
                     * @return {?}
                     */
                    function () {
                        infoWindow_1.close();
                    }));
                }
            }));
        };
        //画线
        //画线
        /**
         * @private
         * @param {?} lines
         * @param {?=} options
         * @return {?}
         */
        ShareAmapComponent.prototype.drawLine = 
        //画线
        /**
         * @private
         * @param {?} lines
         * @param {?=} options
         * @return {?}
         */
        function (lines, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            //#region
            //测试传参
            //#endregion
            lines.forEach((/**
             * @param {?} pointList
             * @return {?}
             */
            function (pointList) {
                /** @type {?} */
                var polyline = new AMap.Polyline(__assign({ path: pointList, isOutline: true, outlineColor: '#ffeeff', borderWeight: 2, strokeColor: "#3366FF", strokeOpacity: 1, strokeWeight: 4, strokeStyle: "solid", strokeDasharray: [10, 15], lineJoin: 'round', lineCap: 'round', zIndex: 50 }, options));
                polyline.setMap(_this.map);
                // 缩放地图到合适的视野级别
                _this.map.setFitView([polyline]);
            }));
        };
        /**
         * @private
         * @param {?} component
         * @param {?} data
         * @return {?}
         */
        ShareAmapComponent.prototype.getDOMFromComponent = /**
         * @private
         * @param {?} component
         * @param {?} data
         * @return {?}
         */
        function (component, data) {
            /** @type {?} */
            var icon = this._componentFactoryResolver.resolveComponentFactory(component);
            ((/** @type {?} */ (icon))).data = data;
            this.templateCompile.clear();
            /** @type {?} */
            var view = this.templateCompile.createComponent(icon);
            this.zone.run((/**
             * @return {?}
             */
            function () {
            }));
            /** @type {?} */
            var el = ((/** @type {?} */ (((/** @type {?} */ (view.location.nativeElement))).childNodes)))[0].cloneNode(true);
            this.templateCompile.clear();
            this.zone.run((/**
             * @return {?}
             */
            function () { }));
            return el;
        };
        /**
         * @param {?} PathSimplifier
         * @return {?}
         */
        ShareAmapComponent.prototype.initRoute = /**
         * @param {?} PathSimplifier
         * @return {?}
         */
        function (PathSimplifier) {
            //创建组件实例
            /** @type {?} */
            var pathSimplifierIns = new PathSimplifier({
                zIndex: 100,
                map: this.map,
                //所属的地图实例
                getPath: (/**
                 * @param {?} pathData
                 * @param {?} pathIndex
                 * @return {?}
                 */
                function (pathData, pathIndex) {
                    //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
                    return pathData.path;
                }),
                getHoverTitle: (/**
                 * @param {?} pathData
                 * @param {?} pathIndex
                 * @param {?} pointIndex
                 * @return {?}
                 */
                function (pathData, pathIndex, pointIndex) {
                    //返回鼠标悬停时显示的信息
                    if (pointIndex >= 0) {
                        //鼠标悬停在某个轨迹节点上
                        return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
                    }
                    //鼠标悬停在节点之间的连线上
                    return pathData.name + '，点数量' + pathData.path.length;
                }),
                renderOptions: {
                    //轨迹线的样式
                    pathLineStyle: {
                        strokeStyle: 'red',
                        lineWidth: 6,
                        dirArrowStyle: true
                    }
                }
            });
            //这里构建两条简单的轨迹，仅作示例
            pathSimplifierIns.setData([{
                    name: '轨迹0',
                    path: [
                        [100.340417, 27.376994],
                        [108.426354, 37.827452],
                        [113.392174, 31.208439],
                        [124.905846, 42.232876]
                    ]
                }, {
                    name: '大地线',
                    //创建一条包括500个插值点的大地线
                    path: PathSimplifier.getGeodesicPath([116.405289, 39.904987], [87.61792, 43.793308], 500)
                }]);
            //创建一个巡航器
            /** @type {?} */
            var navg0 = pathSimplifierIns.createPathNavigator(0.2, //关联第1条轨迹
            {
                loop: true,
                //循环播放
                speed: 100000
            });
            navg0.start();
        };
        /**
         * @return {?}
         */
        ShareAmapComponent.prototype.getAddressPointAndDraw = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.amapService.getMarkerByLocationList(this.locationList)
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.drawIcons(data);
            }));
        };
        ShareAmapComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'share-amap',
                        template: "\r\n\r\n<div #mapUi></div>\r\n<ng-template #compile></ng-template>\r\n<!-- <app-search-map></app-search-map> -->\r\n",
                        styles: ["#panel{position:absolute;background-color:#ff0;max-height:90%;overflow-y:auto;top:10px;right:10px;width:280px;min-height:100px}"]
                    }] }
        ];
        /** @nocollapse */
        ShareAmapComponent.ctorParameters = function () { return [
            { type: core.Renderer2 },
            { type: core.ElementRef },
            { type: core.NgZone },
            { type: core.ComponentFactoryResolver },
            { type: commonLibrary.HttpService },
            { type: AmapHttpService },
            { type: AmapService }
        ]; };
        ShareAmapComponent.propDecorators = {
            height: [{ type: core.Input }],
            width: [{ type: core.Input }],
            markers: [{ type: core.Input }],
            markerClick: [{ type: core.Output }],
            icons: [{ type: core.Input }],
            iconClick: [{ type: core.Output }],
            lines: [{ type: core.Input }],
            dashedLines: [{ type: core.Input }],
            locationList: [{ type: core.Input }],
            ceshiMap: [{ type: core.ViewChild, args: ['ceshiMap', { static: true },] }],
            setTemplate: [{ type: core.Input }],
            mapUi: [{ type: core.ViewChild, args: ["mapUi", { static: true },] }],
            templateCompile: [{ type: core.ViewChild, args: ['compile', { static: true, read: core.ViewContainerRef },] }]
        };
        return ShareAmapComponent;
    }());
    if (false) {
        /** @type {?} */
        ShareAmapComponent.prototype.height;
        /** @type {?} */
        ShareAmapComponent.prototype.width;
        /**
         * @type {?}
         * @private
         */
        ShareAmapComponent.prototype._markers;
        /** @type {?} */
        ShareAmapComponent.prototype.markerClick;
        /**
         * @type {?}
         * @private
         */
        ShareAmapComponent.prototype._icons;
        /** @type {?} */
        ShareAmapComponent.prototype.iconClick;
        /**
         * @type {?}
         * @private
         */
        ShareAmapComponent.prototype._lines;
        /**
         * @type {?}
         * @private
         */
        ShareAmapComponent.prototype._dashedLines;
        /**
         * @type {?}
         * @private
         */
        ShareAmapComponent.prototype._locationList;
        /** @type {?} */
        ShareAmapComponent.prototype.ceshiMap;
        /**
         * @type {?}
         * @private
         */
        ShareAmapComponent.prototype._showTemplate;
        /** @type {?} */
        ShareAmapComponent.prototype.mapUi;
        /**
         * @type {?}
         * @private
         */
        ShareAmapComponent.prototype.map;
        /** @type {?} */
        ShareAmapComponent.prototype.templateCompile;
        /**
         * @type {?}
         * @private
         */
        ShareAmapComponent.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        ShareAmapComponent.prototype.el;
        /**
         * @type {?}
         * @private
         */
        ShareAmapComponent.prototype.zone;
        /**
         * @type {?}
         * @private
         */
        ShareAmapComponent.prototype._componentFactoryResolver;
        /**
         * @type {?}
         * @private
         */
        ShareAmapComponent.prototype.http;
        /**
         * @type {?}
         * @private
         */
        ShareAmapComponent.prototype.amapHttpService;
        /**
         * @type {?}
         * @private
         */
        ShareAmapComponent.prototype.amapService;
    }
    var Guid = /** @class */ (function () {
        function Guid() {
        }
        /**
         * @return {?}
         */
        Guid.newGuid = /**
         * @return {?}
         */
        function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (/**
             * @param {?} c
             * @return {?}
             */
            function (c) {
                /** @type {?} */
                var r = Math.random() * 16 | 0;
                /** @type {?} */
                var v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }));
        };
        return Guid;
    }());
    var showTemplate = /** @class */ (function () {
        function showTemplate() {
        }
        return showTemplate;
    }());
    if (false) {
        /** @type {?} */
        showTemplate.prototype.title;
        /** @type {?} */
        showTemplate.prototype.body;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/component/template-only/template-only.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var shipmentStatus = {
        0: 'Seller \'s Location / Booked',
        1: 'In Transit to Departure Port',
        2: 'In Transit to Departure Port',
        3: 'Departure Port',
        4: 'In Transit to Arrival Port',
        5: 'Arrival  port',
        6: 'In Transit to Final Destination',
        7: 'Final destination',
        8: 'Final destination',
    };
    var TemplateOnlyComponent = /** @class */ (function () {
        function TemplateOnlyComponent() {
            this.shipmentStatus = shipmentStatus;
            this.shipmentData = {};
        }
        /**
         * @return {?}
         */
        TemplateOnlyComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
        };
        TemplateOnlyComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'lib-template-only',
                        template: "<div #shipment>\n  <div>{{shipmentStatus[shipmentData.status]}}</div>\n  <div>Arrival: {{shipmentData.mainESTTruckDeliveryDate | date: 'yyyy-MM-dd'}}</div>\n</div>\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        TemplateOnlyComponent.ctorParameters = function () { return []; };
        TemplateOnlyComponent.propDecorators = {
            shipmentEl: [{ type: core.ViewChild, args: ['shipment', { static: true },] }]
        };
        return TemplateOnlyComponent;
    }());
    if (false) {
        /** @type {?} */
        TemplateOnlyComponent.prototype.shipmentEl;
        /** @type {?} */
        TemplateOnlyComponent.prototype.shipmentStatus;
        /** @type {?} */
        TemplateOnlyComponent.prototype.shipmentData;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/amap-library.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var component = [
        ShareAmapComponent,
        TemplateOnlyComponent,
    ];
    var AmapLibraryModule = /** @class */ (function () {
        function AmapLibraryModule() {
        }
        AmapLibraryModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: __spread(component),
                        imports: [
                            common.CommonModule,
                        ],
                        exports: __spread(component),
                        entryComponents: [TemplateOnlyComponent],
                    },] }
        ];
        return AmapLibraryModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/services/component-to-html.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ComponentToHtmlService = /** @class */ (function () {
        function ComponentToHtmlService(applicationRef, componentFactoryResolver, injector) {
            this.applicationRef = applicationRef;
            this.componentFactoryResolver = componentFactoryResolver;
            this.injector = injector;
        }
        /**
         * @param {?} data
         * @return {?}
         */
        ComponentToHtmlService.prototype.getShipmentTemplate = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var factory = this.componentFactoryResolver.resolveComponentFactory(TemplateOnlyComponent);
            /** @type {?} */
            var componentRef = factory.create(this.injector);
            componentRef.instance.shipmentData = data;
            this.applicationRef.attachView(componentRef.hostView);
            componentRef.changeDetectorRef.detectChanges();
            return {
                title: data.shipmentNo,
                body: componentRef.instance.shipmentEl.nativeElement.innerHTML
            };
        };
        ComponentToHtmlService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ComponentToHtmlService.ctorParameters = function () { return [
            { type: core.ApplicationRef },
            { type: core.ComponentFactoryResolver },
            { type: core.Injector }
        ]; };
        /** @nocollapse */ ComponentToHtmlService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function ComponentToHtmlService_Factory() { return new ComponentToHtmlService(core.ɵɵinject(core.ApplicationRef), core.ɵɵinject(core.ComponentFactoryResolver), core.ɵɵinject(core.INJECTOR)); }, token: ComponentToHtmlService, providedIn: "root" });
        return ComponentToHtmlService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ComponentToHtmlService.prototype.applicationRef;
        /**
         * @type {?}
         * @private
         */
        ComponentToHtmlService.prototype.componentFactoryResolver;
        /**
         * @type {?}
         * @private
         */
        ComponentToHtmlService.prototype.injector;
    }

    exports.AmapHttpService = AmapHttpService;
    exports.AmapLibraryModule = AmapLibraryModule;
    exports.AmapService = AmapService;
    exports.ComponentToHtmlService = ComponentToHtmlService;
    exports.ɵa = ShareAmapComponent;
    exports.ɵb = AmapHttpService;
    exports.ɵc = AmapService;
    exports.ɵd = TemplateOnlyComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cityocean-amap-library.umd.js.map
