import { Injectable, ɵɵdefineInjectable, ɵɵinject, EventEmitter, ElementRef, Component, Renderer2, NgZone, ComponentFactoryResolver, Input, Output, ViewChild, ViewContainerRef, NgModule, ApplicationRef, Injector, INJECTOR } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/amap-http.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AmapHttpService {
    /**
     * @param {?} handler
     */
    constructor(handler) {
        this.handler = handler;
        this.http = new HttpClient(this.handler);
    }
    /**
     * @param {?} url
     * @param {?=} params
     * @param {?=} headers
     * @return {?}
     */
    get(url, params, headers) {
        return this.http.get(url, { params });
    }
}
AmapHttpService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AmapHttpService.ctorParameters = () => [
    { type: HttpBackend }
];
/** @nocollapse */ AmapHttpService.ngInjectableDef = ɵɵdefineInjectable({ factory: function AmapHttpService_Factory() { return new AmapHttpService(ɵɵinject(HttpBackend)); }, token: AmapHttpService, providedIn: "root" });
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
class AmapService {
    /**
     * @param {?} amapHttp
     */
    constructor(amapHttp) {
        this.amapHttp = amapHttp;
        this.googleKey = 'AIzaSyAEdT5BA0MmANhrmcnR4QrXu08gLtgvhqI';
    }
    /**
     * @param {?} addressList
     * @param {?=} city
     * @return {?}
     */
    getMarkerByAddressListAMap(addressList, city) {
        /** @type {?} */
        const option = {};
        if (city)
            option.city = city;
        /** @type {?} */
        const geocoder = new AMap.Geocoder({});
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        observer => {
            forkJoin(addressList.map((/**
             * @param {?} address
             * @return {?}
             */
            address => {
                return new Observable((/**
                 * @param {?} ob
                 * @return {?}
                 */
                ob => {
                    geocoder.getLocation(address, (/**
                     * @param {?} status
                     * @param {?} res
                     * @return {?}
                     */
                    (status, res) => {
                        /** @type {?} */
                        let point;
                        if (status !== 'complete') {
                            point = [];
                        }
                        else {
                            /** @type {?} */
                            const first = res.geocodes[0];
                            point = [first.location.lng, first.location.lat];
                        }
                        ob.next({ point });
                        ob.complete();
                    }));
                }));
            })))
                .subscribe((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                observer.next(res);
                observer.complete();
            }));
        }));
    }
    /**
     * @param {?} locationList
     * @return {?}
     */
    getMarkerByLocationList(locationList) {
        /** @type {?} */
        const option = {};
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        observer => {
            forkJoin(locationList.map((/**
             * @param {?} location
             * @return {?}
             */
            location => {
                return this.googleGeo(location.streetAddress)
                    .pipe(catchError((/**
                 * @param {?} o
                 * @return {?}
                 */
                o => null)));
            })))
                .subscribe((/**
             * @param {?} res
             * @return {?}
             */
            (res) => {
                /** @type {?} */
                const results = res.map((/**
                 * @param {?} result
                 * @param {?} i
                 * @return {?}
                 */
                (result, i) => {
                    /** @type {?} */
                    let point = [];
                    if (result) {
                        point = [result.geometry.location.lng, result.geometry.location.lat];
                    }
                    /** @type {?} */
                    const location = locationList[i];
                    return {
                        point,
                        icon: 'icon-dingwei',
                        data: location,
                        template: {
                            title: location.tenantName,
                            body: `${[location.streetAddress, location.city, location.province, location.country].filter((/**
                             * @param {?} o
                             * @return {?}
                             */
                            o => o)).join(', ')}`
                        },
                    };
                }));
                observer.next(results);
                observer.complete();
            }));
        }));
    }
    /**
     * @return {?}
     */
    poi() {
        /** @type {?} */
        var placeSearch = new AMap.PlaceSearch({
            city: `New York`
        });
        placeSearch.search('New York', (/**
         * @param {?} status
         * @param {?} result
         * @return {?}
         */
        (status, result) => {
            // 搜索成功时，result即是对应的匹配数据
        }));
    }
    //地图搜索地址
    /**
     * @param {?} input
     * @return {?}
     */
    mapSearch(input) {
        /** @type {?} */
        let url = "http://47.254.45.110:11045/place/maps/api/place/autocomplete/json";
        /** @type {?} */
        let params = {
            input,
            key: "AIzaSyAEdT5BA0MmANhrmcnR4QrXu08gLtgvhqI",
            language: 'en'
        };
        return this.amapHttp.get(url, params);
    }
    /**
     * @param {?} address
     * @return {?}
     */
    googleGeo(address) {
        // const url = `https://maps.googleapis.com/maps/api/js/GeocodeService.Search?4ssichuan2&7sUS&9szh-CN&callback=_xdc_._s18ps3&key=AIzaSyDIJ9XX2ZvRKCJcFRrl-lRanEtFUow4piM&token=28858`
        /** @type {?} */
        const url = `http://47.254.45.110:11045/geo/maps/api/geocode/json?address=${address}&key=${this.googleKey}`;
        return new Observable((/**
         * @param {?} ob
         * @return {?}
         */
        ob => {
            this.amapHttp.get(url)
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
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
            error => {
                ob.error(error);
            }));
        }));
    }
}
AmapService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AmapService.ctorParameters = () => [
    { type: AmapHttpService }
];
/** @nocollapse */ AmapService.ngInjectableDef = ɵɵdefineInjectable({ factory: function AmapService_Factory() { return new AmapService(ɵɵinject(AmapHttpService)); }, token: AmapService, providedIn: "root" });
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
class ShareAmapComponent {
    /**
     * @param {?} renderer
     * @param {?} el
     * @param {?} zone
     * @param {?} _componentFactoryResolver
     * @param {?} http
     * @param {?} amapHttpService
     * @param {?} amapService
     */
    constructor(renderer, el, zone, _componentFactoryResolver, http, amapHttpService, amapService) {
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
        this.markerClick = new EventEmitter();
        //图标
        this._icons = [];
        this.iconClick = new EventEmitter();
        //线集合
        this._lines = [];
        // 虚线
        this._dashedLines = [];
        this._locationList = [];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set markers(value) {
        this._markers = value;
        this.drawMarkers(this.markers);
    }
    /**
     * @return {?}
     */
    get markers() {
        return this._markers;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set icons(value) {
        if (!value)
            return;
        this._icons = value;
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.drawIcons();
        }));
    }
    /**
     * @param {?} lineList
     * @return {?}
     */
    set lines(lineList) {
        if (!lineList)
            return;
        //测试参数赋值
        this._lines = lineList;
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.drawLine(this._lines);
        }));
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set dashedLines(val) {
        if (!val)
            return;
        this._dashedLines = val;
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.drawLine(this._dashedLines, { zIndex: 40, strokeStyle: 'dashed', });
        }));
    }
    /**
     * @return {?}
     */
    get dashedLines() { return this._dashedLines; }
    /**
     * @param {?} value
     * @return {?}
     */
    set locationList(value) {
        this._locationList = value;
        this.getAddressPointAndDraw();
    }
    /**
     * @return {?}
     */
    get locationList() { return this._locationList; }
    /**
     * @param {?} showInfo
     * @return {?}
     */
    set setTemplate(showInfo) {
        if (showInfo.body instanceof ElementRef) {
            showInfo.body = ((/** @type {?} */ (showInfo.body.nativeElement))).innerHTML;
        }
        this._showTemplate = showInfo;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // google geocoding 测试
        /*    this.amapService.googleGeo('New york')
              .subscribe(data => {
                console.log(data);
              })*/
        setTimeout((/**
         * @return {?}
         */
        () => {
            return;
            this.setTemplate = { title: "测试信息窗体", body: this.ceshiMap };
            this.lines = [[[116.362209, 39.887487],
                    [120.422897, 50.878002],
                    [125.372105, 60.90651],
                    [128.428945, 40.89663]], [[130.362209, 41.887487],
                    [129.422897, 45.878002],
                    [130.372105, 46.90651],
                    [135.428945, 50.89663]]];
            this.markers = [{ img: "/assets/images/icon_weixin.png", point: [106.406315, 41.908775] }, { img: "/assets/images/icon_weixin.png", point: [116.406315, 39.928775] }]; //测试参数赋值
            this.icons = [{ img: "/assets/images/avatar.png", icon: "", point: [106.406315, 41.908775] }, { img: "/assets/images/avatar.png", icon: "", point: [116.406315, 39.928775] }]; //测试参数赋值
        }), 1000);
        /** @type {?} */
        let id = Guid.newGuid();
        /** @type {?} */
        const div = this.mapUi.nativeElement;
        this.renderer.setAttribute(div, 'id', id);
        this.renderer.setStyle(div, 'height', this.height + 'px');
        if (this.width) {
            div.setStyle(this.el.nativeElement, 'width', this.width + 'px');
        }
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.map = new AMap.Map(id, {
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
        () => {
            this.drawMarkers(this.markers);
        }), 1000);
    }
    // 实例化点标记
    /**
     * @private
     * @param {?} pointList
     * @param {?} img
     * @return {?}
     */
    addMarker(pointList, img) {
        /** @type {?} */
        const marker = new AMap.Marker({
            position: pointList,
            map: this.map,
            // title:"ddd",
            offset: new AMap.Pixel(-13, -30)
        });
        // marker.setMap(this.map);
        // 缩放地图到合适的视野级别
        this.map.setFitView(null, false);
    }
    /**
     * @param {?} markers
     * @return {?}
     */
    drawMarkers(markers) {
        if (!Array.isArray(markers))
            return;
        markers.filter((/**
         * @param {?} o
         * @return {?}
         */
        o => o.point.length)).forEach((/**
         * @param {?} marker
         * @return {?}
         */
        marker => {
            this.addMarker(marker.point, '');
        }));
    }
    //画图标
    /**
     * @private
     * @param {?=} icons
     * @return {?}
     */
    drawIcons(icons = this._icons) {
        icons.forEach((/**
         * @param {?} i
         * @return {?}
         */
        i => this.drawIcon(i)));
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    drawIcon(element) {
        /** @type {?} */
        const pointList = element.point;
        /** @type {?} */
        const icon = element.icon;
        /** @type {?} */
        const showInfo = element.template;
        /** @type {?} */
        const img = element.img;
        AMapUI.loadUI(['overlay/SimpleMarker', 'overlay/SimpleInfoWindow'], (/**
         * @param {?} SimpleMarker
         * @param {?} SimpleInfoWindow
         * @return {?}
         */
        (SimpleMarker, SimpleInfoWindow) => {
            /** @type {?} */
            let imgInfo = {
                src: img,
                style: {
                    width: '30px',
                    height: '30px'
                }
            };
            /** @type {?} */
            const simpleMarker = new SimpleMarker({
                iconLabel: '',
                iconStyle: icon ? '<span class="iconfont amapicon ' + icon + '" ></span>' : imgInfo,
                //设置基点偏移
                offset: new AMap.Pixel(-15, -15),
                map: this.map,
                showPositionPoint: true,
                position: pointList,
                zIndex: 100
            });
            simpleMarker.on('click', (/**
             * @return {?}
             */
            () => {
                this.iconClick.emit(element.data);
            }));
            // 缩放地图到合适的视野级别
            this.map.setFitView();
            if (showInfo) {
                /** @type {?} */
                const infoWindow = new SimpleInfoWindow({
                    infoTitle: "<strong>" + showInfo.title + "</strong>",
                    infoBody: showInfo.body
                });
                //显示在map上
                // infoWindow.open(this.map, pointList);
                //marker 点击时打开
                AMap.event.addListener(simpleMarker, 'mouseover', (/**
                 * @return {?}
                 */
                () => {
                    infoWindow.open(this.map, pointList);
                }));
                AMap.event.addListener(simpleMarker, 'mouseout', (/**
                 * @return {?}
                 */
                () => {
                    infoWindow.close();
                }));
            }
        }));
    }
    //画线
    /**
     * @private
     * @param {?} lines
     * @param {?=} options
     * @return {?}
     */
    drawLine(lines, options = {}) {
        //#region
        //测试传参
        //#endregion
        lines.forEach((/**
         * @param {?} pointList
         * @return {?}
         */
        pointList => {
            /** @type {?} */
            const polyline = new AMap.Polyline(Object.assign({ path: pointList, isOutline: true, outlineColor: '#ffeeff', borderWeight: 2, strokeColor: "#3366FF", strokeOpacity: 1, strokeWeight: 4, strokeStyle: "solid", strokeDasharray: [10, 15], lineJoin: 'round', lineCap: 'round', zIndex: 50 }, options));
            polyline.setMap(this.map);
            // 缩放地图到合适的视野级别
            this.map.setFitView([polyline]);
        }));
    }
    /**
     * @private
     * @param {?} component
     * @param {?} data
     * @return {?}
     */
    getDOMFromComponent(component, data) {
        /** @type {?} */
        const icon = this._componentFactoryResolver.resolveComponentFactory(component);
        ((/** @type {?} */ (icon))).data = data;
        this.templateCompile.clear();
        /** @type {?} */
        const view = this.templateCompile.createComponent(icon);
        this.zone.run((/**
         * @return {?}
         */
        () => {
        }));
        /** @type {?} */
        const el = ((/** @type {?} */ (((/** @type {?} */ (view.location.nativeElement))).childNodes)))[0].cloneNode(true);
        this.templateCompile.clear();
        this.zone.run((/**
         * @return {?}
         */
        () => { }));
        return el;
    }
    /**
     * @param {?} PathSimplifier
     * @return {?}
     */
    initRoute(PathSimplifier) {
        //创建组件实例
        /** @type {?} */
        let pathSimplifierIns = new PathSimplifier({
            zIndex: 100,
            map: this.map,
            //所属的地图实例
            getPath: (/**
             * @param {?} pathData
             * @param {?} pathIndex
             * @return {?}
             */
            (pathData, pathIndex) => {
                //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
                return pathData.path;
            }),
            getHoverTitle: (/**
             * @param {?} pathData
             * @param {?} pathIndex
             * @param {?} pointIndex
             * @return {?}
             */
            (pathData, pathIndex, pointIndex) => {
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
        let navg0 = pathSimplifierIns.createPathNavigator(0.2, //关联第1条轨迹
        {
            loop: true,
            //循环播放
            speed: 100000
        });
        navg0.start();
    }
    /**
     * @return {?}
     */
    getAddressPointAndDraw() {
        this.amapService.getMarkerByLocationList(this.locationList)
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            this.drawIcons(data);
        }));
    }
}
ShareAmapComponent.decorators = [
    { type: Component, args: [{
                selector: 'share-amap',
                template: "\r\n\r\n<div #mapUi></div>\r\n<ng-template #compile></ng-template>\r\n<!-- <app-search-map></app-search-map> -->\r\n",
                styles: ["#panel{position:absolute;background-color:#ff0;max-height:90%;overflow-y:auto;top:10px;right:10px;width:280px;min-height:100px}"]
            }] }
];
/** @nocollapse */
ShareAmapComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: NgZone },
    { type: ComponentFactoryResolver },
    { type: HttpService },
    { type: AmapHttpService },
    { type: AmapService }
];
ShareAmapComponent.propDecorators = {
    height: [{ type: Input }],
    width: [{ type: Input }],
    markers: [{ type: Input }],
    markerClick: [{ type: Output }],
    icons: [{ type: Input }],
    iconClick: [{ type: Output }],
    lines: [{ type: Input }],
    dashedLines: [{ type: Input }],
    locationList: [{ type: Input }],
    ceshiMap: [{ type: ViewChild, args: ['ceshiMap', { static: true },] }],
    setTemplate: [{ type: Input }],
    mapUi: [{ type: ViewChild, args: ["mapUi", { static: true },] }],
    templateCompile: [{ type: ViewChild, args: ['compile', { static: true, read: ViewContainerRef },] }]
};
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
class Guid {
    /**
     * @return {?}
     */
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            /** @type {?} */
            let r = Math.random() * 16 | 0;
            /** @type {?} */
            let v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }));
    }
}
class showTemplate {
}
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
const shipmentStatus = {
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
class TemplateOnlyComponent {
    constructor() {
        this.shipmentStatus = shipmentStatus;
        this.shipmentData = {};
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
TemplateOnlyComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-template-only',
                template: "<div #shipment>\n  <div>{{shipmentStatus[shipmentData.status]}}</div>\n  <div>Arrival: {{shipmentData.mainESTTruckDeliveryDate | date: 'yyyy-MM-dd'}}</div>\n</div>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
TemplateOnlyComponent.ctorParameters = () => [];
TemplateOnlyComponent.propDecorators = {
    shipmentEl: [{ type: ViewChild, args: ['shipment', { static: true },] }]
};
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
const component = [
    ShareAmapComponent,
    TemplateOnlyComponent,
];
class AmapLibraryModule {
}
AmapLibraryModule.decorators = [
    { type: NgModule, args: [{
                declarations: [...component],
                imports: [
                    CommonModule,
                ],
                exports: [...component],
                entryComponents: [TemplateOnlyComponent],
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/component-to-html.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ComponentToHtmlService {
    /**
     * @param {?} applicationRef
     * @param {?} componentFactoryResolver
     * @param {?} injector
     */
    constructor(applicationRef, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    getShipmentTemplate(data) {
        /** @type {?} */
        const factory = this.componentFactoryResolver.resolveComponentFactory(TemplateOnlyComponent);
        /** @type {?} */
        const componentRef = factory.create(this.injector);
        componentRef.instance.shipmentData = data;
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.changeDetectorRef.detectChanges();
        return {
            title: data.shipmentNo,
            body: componentRef.instance.shipmentEl.nativeElement.innerHTML
        };
    }
}
ComponentToHtmlService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ComponentToHtmlService.ctorParameters = () => [
    { type: ApplicationRef },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
/** @nocollapse */ ComponentToHtmlService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ComponentToHtmlService_Factory() { return new ComponentToHtmlService(ɵɵinject(ApplicationRef), ɵɵinject(ComponentFactoryResolver), ɵɵinject(INJECTOR)); }, token: ComponentToHtmlService, providedIn: "root" });
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

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: cityocean-amap-library.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AmapHttpService, AmapLibraryModule, AmapService, ComponentToHtmlService, ShareAmapComponent as ɵa, AmapHttpService as ɵb, AmapService as ɵc, TemplateOnlyComponent as ɵd };
//# sourceMappingURL=cityocean-amap-library.js.map
