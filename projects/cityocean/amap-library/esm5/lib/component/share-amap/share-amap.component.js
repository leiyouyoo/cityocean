/**
 * @fileoverview added by tsickle
 * Generated from: lib/component/share-amap/share-amap.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef, Renderer2, Input, Output, EventEmitter, NgZone, ComponentFactoryResolver, ViewContainerRef, } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { AmapHttpService } from '../../services/amap-http.service';
import { AmapService } from '../../services/amap.service';
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
            if (showInfo.body instanceof ElementRef) {
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
            var polyline = new AMap.Polyline(tslib_1.__assign({ path: pointList, isOutline: true, outlineColor: '#ffeeff', borderWeight: 2, strokeColor: "#3366FF", strokeOpacity: 1, strokeWeight: 4, strokeStyle: "solid", strokeDasharray: [10, 15], lineJoin: 'round', lineCap: 'round', zIndex: 50 }, options));
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
        { type: Component, args: [{
                    selector: 'share-amap',
                    template: "\r\n\r\n<div #mapUi></div>\r\n<ng-template #compile></ng-template>\r\n<!-- <app-search-map></app-search-map> -->\r\n",
                    styles: ["#panel{position:absolute;background-color:#ff0;max-height:90%;overflow-y:auto;top:10px;right:10px;width:280px;min-height:100px}"]
                }] }
    ];
    /** @nocollapse */
    ShareAmapComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: NgZone },
        { type: ComponentFactoryResolver },
        { type: HttpService },
        { type: AmapHttpService },
        { type: AmapService }
    ]; };
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
    return ShareAmapComponent;
}());
export { ShareAmapComponent };
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
export { showTemplate };
if (false) {
    /** @type {?} */
    showTemplate.prototype.title;
    /** @type {?} */
    showTemplate.prototype.body;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtYW1hcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2l0eW9jZWFuL2FtYXAtbGlicmFyeS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvc2hhcmUtYW1hcC9zaGFyZS1hbWFwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxFQUNaLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxnQkFBZ0IsR0FDbkQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7QUFJMUQscUJBQW9EOzs7SUFBakMscUJBQWE7O0lBQUMsdUJBQWlCOzs7OztBQUlsRCxtQkFNQzs7O0lBTEMsbUJBQWE7O0lBQ2Isb0JBQWM7O0lBQ2QscUJBQWtCOztJQUNsQix3QkFBNkM7O0lBQzdDLG9CQUFXOztBQUdiO0lBMEVFLDRCQUNVLFFBQW1CLEVBQ25CLEVBQWMsRUFDZCxJQUFZLEVBQ1oseUJBQW1ELEVBQ25ELElBQWlCLEVBQ2pCLGVBQWdDLEVBQ2hDLFdBQXdCO1FBTnhCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWiw4QkFBeUIsR0FBekIseUJBQXlCLENBQTBCO1FBQ25ELFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBM0V6QixXQUFNLEdBQUcsR0FBRyxDQUFDOztRQUlkLGFBQVEsR0FBYSxFQUFF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Q0FBQyxPQUFPLENBQUMsT0FBTzs7OztRQUFFLFVBQVUsQ0FBQzs7Z0JBQ3BFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7O2dCQUM1QixDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFDRDtJQUFBO0lBSUEsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7Ozs7SUFGQyw2QkFBZTs7SUFDZiw0QkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBSZW5kZXJlcjIsXG4gIElucHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE5nWm9uZSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnQGNpdHlvY2Vhbi9jb21tb24tbGlicmFyeSc7XG5pbXBvcnQgeyBBbWFwSHR0cFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbWFwLWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBBbWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FtYXAuc2VydmljZSc7XG5kZWNsYXJlIGxldCBBTWFwOiBhbnk7XG5kZWNsYXJlIGxldCBBTWFwVUk6IGFueTtcblxuaW50ZXJmYWNlIE1hcmtlciB7IGltZz86IHN0cmluZywgcG9pbnQ6IEFycmF5PGFueT4gfVxuXG50eXBlIExpbmVzID0gW251bWJlciwgbnVtYmVyXVtdW107XG5cbmludGVyZmFjZSBJY29uIHtcbiAgaW1nPzogc3RyaW5nLFxuICBpY29uPzogc3RyaW5nLFxuICBwb2ludDogQXJyYXk8YW55PixcbiAgdGVtcGxhdGU/OiB7IHRpdGxlPzogc3RyaW5nLCBib2R5Pzogc3RyaW5nIH0sXG4gIGRhdGE/OiBhbnksXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NoYXJlLWFtYXAnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2hhcmUtYW1hcC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NoYXJlLWFtYXAuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZUFtYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBoZWlnaHQgPSA4MDA7XG4gIEBJbnB1dCgpIHdpZHRoPzogbnVtYmVyO1xuXG4gIC8v6buY6K6k54K55qCH6K6wXG4gIHByaXZhdGUgX21hcmtlcnM6IE1hcmtlcltdID0gW107XG4gIEBJbnB1dCgpIHNldCBtYXJrZXJzKHZhbHVlOiBNYXJrZXJbXSkge1xuICAgIHRoaXMuX21hcmtlcnMgPSB2YWx1ZTtcbiAgICB0aGlzLmRyYXdNYXJrZXJzKHRoaXMubWFya2Vycyk7XG4gIH1cbiAgZ2V0IG1hcmtlcnMoKTogTWFya2VyW10ge1xuICAgIHJldHVybiB0aGlzLl9tYXJrZXJzO1xuICB9XG4gIEBPdXRwdXQoKSBtYXJrZXJDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvL+Wbvuagh1xuICBwcml2YXRlIF9pY29uczogSWNvbltdID0gW107XG4gIEBJbnB1dCgpIHNldCBpY29ucyh2YWx1ZTogSWNvbltdKSB7XG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuICAgIHRoaXMuX2ljb25zID0gdmFsdWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRyYXdJY29ucygpO1xuICAgIH0pXG4gIH1cbiAgQE91dHB1dCgpIGljb25DbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvL+e6v+mbhuWQiFxuICBwcml2YXRlIF9saW5lczogTGluZXMgPSBbXTtcbiAgQElucHV0KCkgc2V0IGxpbmVzKGxpbmVMaXN0OiBMaW5lcykge1xuICAgIGlmICghbGluZUxpc3QpIHJldHVybjtcbiAgICAvL+a1i+ivleWPguaVsOi1i+WAvFxuICAgIHRoaXMuX2xpbmVzID0gbGluZUxpc3Q7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRyYXdMaW5lKHRoaXMuX2xpbmVzKTtcbiAgICB9KVxuICB9XG5cbiAgLy8g6Jma57q/XG4gIHByaXZhdGUgX2Rhc2hlZExpbmVzOiBMaW5lcyA9IFtdO1xuICBASW5wdXQoKSBzZXQgZGFzaGVkTGluZXModmFsOiBMaW5lcykge1xuICAgIGlmICghdmFsKSByZXR1cm47XG4gICAgdGhpcy5fZGFzaGVkTGluZXMgPSB2YWw7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRyYXdMaW5lKHRoaXMuX2Rhc2hlZExpbmVzLCB7IHpJbmRleDogNDAsIHN0cm9rZVN0eWxlOiAnZGFzaGVkJywgfSk7XG4gICAgfSk7XG4gIH1cbiAgZ2V0IGRhc2hlZExpbmVzKCkgeyByZXR1cm4gdGhpcy5fZGFzaGVkTGluZXMgfVxuXG4gIHByaXZhdGUgX2xvY2F0aW9uTGlzdCA9IFtdO1xuICBASW5wdXQoKSBzZXQgbG9jYXRpb25MaXN0KHZhbHVlOiBhbnlbXSkge1xuICAgIHRoaXMuX2xvY2F0aW9uTGlzdCA9IHZhbHVlO1xuICAgIHRoaXMuZ2V0QWRkcmVzc1BvaW50QW5kRHJhdygpO1xuICB9XG4gIGdldCBsb2NhdGlvbkxpc3QoKSB7IHJldHVybiB0aGlzLl9sb2NhdGlvbkxpc3Q7IH1cblxuICBAVmlld0NoaWxkKCdjZXNoaU1hcCcsIHsgc3RhdGljOiB0cnVlIH0pIGNlc2hpTWFwOiBFbGVtZW50UmVmPGFueT47XG4gIC8v56qX5L2T5pi+56S65L+h5oGvXG4gIHByaXZhdGUgX3Nob3dUZW1wbGF0ZTogc2hvd1RlbXBsYXRlO1xuICBASW5wdXQoKSBzZXQgc2V0VGVtcGxhdGUoc2hvd0luZm86IGFueSkge1xuICAgIGlmIChzaG93SW5mby5ib2R5IGluc3RhbmNlb2YgRWxlbWVudFJlZikge1xuICAgICAgc2hvd0luZm8uYm9keSA9IChzaG93SW5mby5ib2R5Lm5hdGl2ZUVsZW1lbnQgYXMgRWxlbWVudCkuaW5uZXJIVE1MXG4gICAgfVxuICAgIHRoaXMuX3Nob3dUZW1wbGF0ZSA9IHNob3dJbmZvO1xuICB9XG5cbiAgQFZpZXdDaGlsZChcIm1hcFVpXCIsIHsgc3RhdGljOiB0cnVlIH0pIG1hcFVpOiBFbGVtZW50UmVmO1xuICBwcml2YXRlIG1hcDogYW55O1xuICBAVmlld0NoaWxkKCdjb21waWxlJywgeyBzdGF0aWM6IHRydWUsIHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgdGVtcGxhdGVDb21waWxlOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgaHR0cDogSHR0cFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhbWFwSHR0cFNlcnZpY2U6IEFtYXBIdHRwU2VydmljZSxcbiAgICBwcml2YXRlIGFtYXBTZXJ2aWNlOiBBbWFwU2VydmljZSxcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBnb29nbGUgZ2VvY29kaW5nIOa1i+ivlVxuLyogICAgdGhpcy5hbWFwU2VydmljZS5nb29nbGVHZW8oJ05ldyB5b3JrJylcbiAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfSkqL1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmV0dXJuIDtcbiAgICAgIHRoaXMuc2V0VGVtcGxhdGUgPSB7IHRpdGxlOiBcIua1i+ivleS/oeaBr+eql+S9k1wiLCBib2R5OiB0aGlzLmNlc2hpTWFwIH07XG4gICAgICB0aGlzLmxpbmVzPVtbWzExNi4zNjIyMDksIDM5Ljg4NzQ4N10sXG4gICAgICBbMTIwLjQyMjg5Nyw1MC44NzgwMDJdLFxuICAgICAgWzEyNS4zNzIxMDUsIDYwLjkwNjUxXSxcbiAgICAgIFsxMjguNDI4OTQ1LCA0MC44OTY2M11dLCBbWzEzMC4zNjIyMDksIDQxLjg4NzQ4N10sXG4gICAgICBbMTI5LjQyMjg5NywgNDUuODc4MDAyXSxcbiAgICAgIFsxMzAuMzcyMTA1LCA0Ni45MDY1MV0sXG4gICAgICBbMTM1LjQyODk0NSwgNTAuODk2NjNdXV07XG4gICAgICB0aGlzLm1hcmtlcnMgPSBbeyBpbWc6IFwiL2Fzc2V0cy9pbWFnZXMvaWNvbl93ZWl4aW4ucG5nXCIsIHBvaW50OiBbMTA2LjQwNjMxNSwgNDEuOTA4Nzc1XSB9LCB7IGltZzogXCIvYXNzZXRzL2ltYWdlcy9pY29uX3dlaXhpbi5wbmdcIiwgcG9pbnQ6IFsxMTYuNDA2MzE1LCAzOS45Mjg3NzVdIH1dOy8v5rWL6K+V5Y+C5pWw6LWL5YC8XG4gICAgICB0aGlzLmljb25zID0gW3sgaW1nOiBcIi9hc3NldHMvaW1hZ2VzL2F2YXRhci5wbmdcIiwgaWNvbjogXCJcIiwgcG9pbnQ6IFsxMDYuNDA2MzE1LCA0MS45MDg3NzVdIH0sIHsgaW1nOiBcIi9hc3NldHMvaW1hZ2VzL2F2YXRhci5wbmdcIiwgaWNvbjogXCJcIiwgcG9pbnQ6IFsxMTYuNDA2MzE1LCAzOS45Mjg3NzVdIH1dOy8v5rWL6K+V5Y+C5pWw6LWL5YC8XG5cbiAgICB9LCAxMDAwKTtcbiAgICBsZXQgaWQ6IHN0cmluZyA9IEd1aWQubmV3R3VpZCgpO1xuICAgIGNvbnN0IGRpdiA9IHRoaXMubWFwVWkubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShkaXYsICdpZCcsIGlkKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGRpdiwgJ2hlaWdodCcsIHRoaXMuaGVpZ2h0ICsgJ3B4Jyk7XG4gICAgaWYgKHRoaXMud2lkdGgpIHtcbiAgICAgIGRpdi5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHRoaXMud2lkdGggKyAncHgnKTtcbiAgICB9XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwID0gbmV3IEFNYXAuTWFwKGlkLCB7XG4gICAgICAgIHZlY3Rvck1hcEZvcmVpZ246ICdFbmdsaXNoJywvL+WKoOi9vea1t+WkluefoumHj+WcsOWbvuW5tuaYvuekuuS4uuS4reaWhyBFbmdsaXNoIC8gTG9jYWwgLyBDaGluZXNlX1NpbXBsaWZpZWRcbiAgICAgICAgem9vbTogMTEsLy/nuqfliKtcbiAgICAgICAgcmVzaXplRW5hYmxlOiB0cnVlLFxuICAgICAgICAvL2NlbnRlcjogWzExNi4zOTc0MjgsIDM5LjkwOTIzXSwvL+S4reW/g+eCueWdkOagh1xuICAgICAgICB2aWV3TW9kZTogJzJEJy8v5L2/55SoM0Top4blm75cbiAgICAgIH0pO1xuXG4gICAgICAvKnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFtYXBIdHRwU2VydmljZS5nZXQoYGh0dHBzOi8vcmVzdGFwaS5hbWFwLmNvbS92My9nZW9jb2RlL2dlb2AsIHtcbiAgICAgICAgICBrZXk6IGAwNmYzZGY4NzExZTc1NjUxOGJhNjA0NjliZTBjYmYxNGAsXG4gICAgICAgICAgYWRkcmVzczogYFNLT1BKRWAsXG4gICAgICAgICAgY291bnRyeTogYE1BS0VET05JSkFgLFxuICAgICAgICB9KVxuICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICB9KVxuICAgICAgICAvL+aehOmAoOi3r+e6v+WvvOiIquexu1xuICAgICAgICB2YXIgZHJpdmluZyA9IG5ldyBBTWFwLkRyaXZpbmcoe1xuICAgICAgICAgIG1hcDogdGhpcy5tYXAsXG4gICAgICAgIH0pO1xuICAgICAgICAvLyDmoLnmja7otbfnu4jngrnnu4/nuqzluqbop4TliJLpqb7ovablr7zoiKrot6/nur9cbiAgICAgICAgZHJpdmluZy5zZWFyY2gobmV3IEFNYXAuTG5nTGF0KC0yLjA0MzQ1NywgNTIuMzY1NTM4KSwgbmV3IEFNYXAuTG5nTGF0KC0xLjE5OTY5OCwgNTEuODc5MDM4KSwgZnVuY3Rpb24oc3RhdHVzLCByZXN1bHQpIHtcbiAgICAgICAgICAvLyByZXN1bHQg5Y2z5piv5a+55bqU55qE6am+6L2m5a+86Iiq5L+h5oGv77yM55u45YWz5pWw5o2u57uT5p6E5paH5qGj6K+35Y+C6ICDICBodHRwczovL2xicy5hbWFwLmNvbS9hcGkvamF2YXNjcmlwdC1hcGkvcmVmZXJlbmNlL3JvdXRlLXNlYXJjaCNtX0RyaXZpbmdSZXN1bHRcbiAgICAgICAgICBpZiAoc3RhdHVzID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn57uY5Yi26am+6L2m6Lev57q/5a6M5oiQJylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPlumpvui9puaVsOaNruWksei0pe+8micgKyByZXN1bHQpXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sIDNlMykqL1xuICAgIH0pO1xuICAgIC8vI3JlZ2lvbiAgIOazqOmHilxuICAgIC8vIEFNYXAucGx1Z2luKFtcIkFNYXAuVG9vbEJhclwiLCBcIkFNYXAuR2VvbG9jYXRpb25cIiwgXCJBTWFwLkF1dG9jb21wbGV0ZVwiLCBcIkFNYXAuUGxhY2VTZWFyY2hcIl0sICgpID0+IHsvL+W8guatpeWKoOi9veaPkuS7tlxuICAgIC8vICAgbGV0IHRvb2xiYXIgPSBuZXcgQU1hcC5Ub29sQmFyKCk7XG4gICAgLy8gICB0aGlzLm1hcC5hZGRDb250cm9sKHRvb2xiYXIpO1xuICAgIC8vICAgbGV0IGdlb2xvY2F0aW9uID0gbmV3IEFNYXAuR2VvbG9jYXRpb24oKTtcbiAgICAvLyAgIHRoaXMubWFwLmFkZENvbnRyb2woZ2VvbG9jYXRpb24pO1xuICAgIC8vICAgLy8g5a6e5L6L5YyWQXV0b2NvbXBsZXRlXG4gICAgLy8gICBsZXQgYXV0b09wdGlvbnMgPSB7XG4gICAgLy8gICAgIC8vIGlucHV0IOS4uue7keWumui+k+WFpeaPkOekuuWKn+iDveeahGlucHV055qERE9NIElEXG4gICAgLy8gICAgIGlucHV0OiAnaW5wdXRfaWQnXG4gICAgLy8gICB9XG4gICAgLy8gICBsZXQgYXV0b2NvbXBsZXRlID0gbmV3IEFNYXAuQXV0b2NvbXBsZXRlKGF1dG9PcHRpb25zKTtcbiAgICAvLyAgIHRoaXMubWFwLmFkZENvbnRyb2woYXV0b2NvbXBsZXRlKTtcblxuICAgIC8vICAgbGV0IHBsYWNlU2VhcmNoID0gbmV3IEFNYXAuUGxhY2VTZWFyY2goeyBjaXR5OiBcIjkwMDAwMFwiIH0pO1xuICAgIC8vICAgLy9tYXAuYWRkQ29udHJvbChwbGFjZVNlYXJjaCk7XG4gICAgLy8gICAvL3BsYWNlU2VhcmNoLnNlYXJjaCgn5YyX5Lqs5aSn5a2mJywgZnVuY3Rpb24gKHN0YXR1cywgcmVzdWx0KSB7XG4gICAgLy8gICAvLyAgYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XG4gICAgLy8gICAvLyAgLy8g5p+l6K+i5oiQ5Yqf5pe277yMcmVzdWx05Y2z5a+55bqU5Yy56YWN55qEUE9J5L+h5oGvXG4gICAgLy8gICAvL30pXG4gICAgLy8gICBBTWFwLmV2ZW50LmFkZExpc3RlbmVyKGF1dG9jb21wbGV0ZSwgJ3NlbGVjdCcsIChlKSA9PiB7XG4gICAgLy8gICAgIC8vVE9ETyDpkojlr7npgInkuK3nmoRwb2nlrp7njrDoh6rlt7HnmoTlip/og71cbiAgICAvLyAgICAgcGxhY2VTZWFyY2guc2VhcmNoKGUucG9pLm5hbWUsIChzdGF0dXMsIHJlc3VsdCkgPT4ge1xuICAgIC8vICAgICAgIGFsZXJ0KEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xuICAgIC8vICAgICB9KVxuICAgIC8vICAgfSlcblxuICAgIC8vICAgLy8g5Yib5bu65LiA5LiqIE1hcmtlciDlrp7kvovvvJpcbiAgICAvLyAgIGxldCBtYXJrZXIgPSBuZXcgQU1hcC5NYXJrZXIoe1xuICAgIC8vICAgICBwb3NpdGlvbjogbmV3IEFNYXAuTG5nTGF0KDExNi4zOSwgMzkuOSksICAgLy8g57uP57qs5bqm5a+56LGh77yM5Lmf5Y+v5Lul5piv57uP57qs5bqm5p6E5oiQ55qE5LiA57u05pWw57uEWzExNi4zOSwgMzkuOV1cbiAgICAvLyAgICAgdGl0bGU6ICfljJfkuqwnXG4gICAgLy8gICB9KTtcbiAgICAvLyAgIC8vIOWkmuS4queCueWunuS+i+e7hOaIkOeahOaVsOe7hFxuICAgIC8vICAgbGV0IG1hcmtlckxpc3QgPSBbbWFya2VyXTtcbiAgICAvLyAgIHRoaXMubWFwLmFkZChtYXJrZXJMaXN0KTtcbiAgICAvLyB9KTtcblxuICAgIC8vIC8v5Yqg6L29QXdlc29tZU1hcmtlcu+8jGxvYWRVSeeahOi3r+W+hOWPguaVsOS4uuaooeWdl+WQjeS4rSAndWkvJyDkuYvlkI7nmoTpg6jliIZcbiAgICAvLyBBTWFwVUkubG9hZFVJKFsnb3ZlcmxheS9Bd2Vzb21lTWFya2VyJywgJ292ZXJsYXkvU2ltcGxlSW5mb1dpbmRvdyddLCAoQXdlc29tZU1hcmtlciwgU2ltcGxlSW5mb1dpbmRvdykgPT4ge1xuICAgIC8vICAgbmV3IEF3ZXNvbWVNYXJrZXIoe1xuICAgIC8vICAgICAvL+iuvue9rmF3ZXNvbWVJY29uXG4gICAgLy8gICAgIGF3ZXNvbWVJY29uOiAnc3RyZWV0LXZpZXcnLCAvL+WPr+eUqOeahGljb25z5Y+C6KeB77yaIGh0dHA6Ly9mb250YXdlc29tZS5pby9pY29ucy9cbiAgICAvLyAgICAgLy/kuIvliJflj4LmlbDnu6fmib/oh6rniLbnsbtcbiAgICAvLyAgICAgLy9pY29uTGFiZWzkuK3kuI3og73ljIXlkKtpbm5lckhUTUzlsZ7mgKfvvIjlhoXpg6jkvJrliKnnlKhhd2Vzb21lSWNvbuiHquWKqOaehOW7uu+8iVxuICAgIC8vICAgICBpY29uTGFiZWw6IHtcbiAgICAvLyAgICAgICBzdHlsZToge1xuICAgIC8vICAgICAgICAgY29sb3I6ICcjZmZmJyAvL+iuvue9ruminOiJslxuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgaWNvblN0eWxlOiAnbGlnaHRibHVlJywgLy/orr7nva7lm77moIfmoLflvI9cbiAgICAvLyAgICAgLy/ln7rnoYDnmoRNYXJrZXLlj4LmlbBcbiAgICAvLyAgICAgbWFwOiB0aGlzLm1hcCxcbiAgICAvLyAgICAgcG9zaXRpb246IHRoaXMubWFwLmdldENlbnRlcigpXG4gICAgLy8gICB9KTtcbiAgICAvLyAgIC8vIOWIm+W7uuS4gOS4qiBNYXJrZXIg5a6e5L6L77yaXG4gICAgLy8gICBsZXQgbWFya2VyID0gbmV3IEFNYXAuTWFya2VyKHtcbiAgICAvLyAgICAgcG9zaXRpb246IHRoaXMubWFwLmdldENlbnRlcigpLCAgIC8vIOe7j+e6rOW6puWvueixoe+8jOS5n+WPr+S7peaYr+e7j+e6rOW6puaehOaIkOeahOS4gOe7tOaVsOe7hFsxMTYuMzksIDM5LjldXG4gICAgLy8gICAgIHRpdGxlOiAnQ2VudGVyJ1xuICAgIC8vICAgfSk7XG5cbiAgICAvLyAgIC8vIOWkmuS4queCueWunuS+i+e7hOaIkOeahOaVsOe7hFxuICAgIC8vICAgbGV0IG1hcmtlckxpc3QgPSBbbWFya2VyXTtcbiAgICAvLyAgIHRoaXMubWFwLmFkZChtYXJrZXJMaXN0KTtcblxuICAgIC8vICAgLy9tYXJrZXIg54K55Ye75pe25omT5byAXG4gICAgLy8gICBBTWFwLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2NsaWNrJywgKCkgPT4ge1xuICAgIC8vICAgICBsZXQgaW5mb1dpbmRvdyA9IG5ldyBTaW1wbGVJbmZvV2luZG93KHtcbiAgICAvLyAgICAgICBpbmZvVGl0bGU6ICfov5nph4zmmK/moIfpopgnLFxuICAgIC8vICAgICAgIGluZm9Cb2R5OiAnPHA+6L+Z6YeM5piv5YaF5a6544CCPC9wPicsXG4gICAgLy8gICAgICAgLy/ln7rngrnmjIflkJFtYXJrZXLnmoTlpLTpg6jkvY3nva5cbiAgICAvLyAgICAgICBvZmZzZXQ6IG5ldyBBTWFwLlBpeGVsKDAsIC0yMSlcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICAgIC8v5pi+56S65ZyobWFw5LiKMlxuICAgIC8vICAgICBpbmZvV2luZG93Lm9wZW4odGhpcy5tYXAsIG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgICAvLyAgIH0pO1xuXG4gICAgLy8gfSk7XG5cbiAgICAvLyAvL+WKoOi9vVBhdGhTaW1wbGlmaWVy77yMbG9hZFVJ55qE6Lev5b6E5Y+C5pWw5Li65qih5Z2X5ZCN5LitICd1aS8nIOS5i+WQjueahOmDqOWIhlxuICAgIC8vIEFNYXBVSS5sb2FkKFsndWkvbWlzYy9QYXRoU2ltcGxpZmllciddLCAoUGF0aFNpbXBsaWZpZXIpID0+IHtcbiAgICAvLyAgIGlmICghUGF0aFNpbXBsaWZpZXIuc3VwcG9ydENhbnZhcykge1xuICAgIC8vICAgICBhbGVydCgn5b2T5YmN546v5aKD5LiN5pSv5oyBIENhbnZhc++8gScpO1xuICAgIC8vICAgICByZXR1cm47XG4gICAgLy8gICB9XG4gICAgLy8gICAvL+WQr+WKqOmhtemdolxuICAgIC8vICAgIHRoaXMuaW5pdFJvdXRlKFBhdGhTaW1wbGlmaWVyKTtcbiAgICAvLyB9KTtcbiAgICAvLyNlbmRyZWdpb25cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZHJhd01hcmtlcnModGhpcy5tYXJrZXJzKTtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIC8vIOWunuS+i+WMlueCueagh+iusFxuICBwcml2YXRlIGFkZE1hcmtlcihwb2ludExpc3Q6IEFycmF5PG51bWJlcj4sIGltZzogc3RyaW5nKSB7XG4gICAgY29uc3QgbWFya2VyID0gbmV3IEFNYXAuTWFya2VyKHtcbiAgICAgIHBvc2l0aW9uOiBwb2ludExpc3QsXG4gICAgICBtYXA6IHRoaXMubWFwLFxuICAgICAgLy8gdGl0bGU6XCJkZGRcIixcbiAgICAgIG9mZnNldDogbmV3IEFNYXAuUGl4ZWwoLTEzLCAtMzApXG4gICAgfSk7XG4gICAgLy8gbWFya2VyLnNldE1hcCh0aGlzLm1hcCk7XG4gICAgLy8g57yp5pS+5Zyw5Zu+5Yiw5ZCI6YCC55qE6KeG6YeO57qn5YirXG4gICAgdGhpcy5tYXAuc2V0Rml0VmlldyhudWxsLCBmYWxzZSk7XG4gIH1cblxuICBkcmF3TWFya2VycyhtYXJrZXJzOiBNYXJrZXJbXSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShtYXJrZXJzKSkgcmV0dXJuO1xuICAgIG1hcmtlcnMuZmlsdGVyKG8gPT4gby5wb2ludC5sZW5ndGgpLmZvckVhY2gobWFya2VyID0+IHtcbiAgICAgIHRoaXMuYWRkTWFya2VyKG1hcmtlci5wb2ludCwgJycpO1xuICAgIH0pXG4gIH1cbiAgLy/nlLvlm77moIdcbiAgcHJpdmF0ZSBkcmF3SWNvbnMoaWNvbnMgPSB0aGlzLl9pY29ucykge1xuICAgIGljb25zLmZvckVhY2goaSA9PiB0aGlzLmRyYXdJY29uKGkpKTtcbiAgfVxuICBwcml2YXRlIGRyYXdJY29uKGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHBvaW50TGlzdCA9IGVsZW1lbnQucG9pbnQ7XG4gICAgICBjb25zdCBpY29uID0gZWxlbWVudC5pY29uO1xuICAgICAgY29uc3Qgc2hvd0luZm8gPSBlbGVtZW50LnRlbXBsYXRlO1xuICAgICAgY29uc3QgaW1nID0gZWxlbWVudC5pbWc7XG4gICAgICBBTWFwVUkubG9hZFVJKFsnb3ZlcmxheS9TaW1wbGVNYXJrZXInLCAnb3ZlcmxheS9TaW1wbGVJbmZvV2luZG93J10sIChTaW1wbGVNYXJrZXIsIFNpbXBsZUluZm9XaW5kb3cpID0+IHtcbiAgICAgICAgbGV0IGltZ0luZm8gPSB7XG4gICAgICAgICAgc3JjOiBpbWcsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIHdpZHRoOiAnMzBweCcsXG4gICAgICAgICAgICBoZWlnaHQ6ICczMHB4J1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHNpbXBsZU1hcmtlciA9IG5ldyBTaW1wbGVNYXJrZXIoe1xuICAgICAgICAgICAgaWNvbkxhYmVsOiAnJyxcbiAgICAgICAgICAgIGljb25TdHlsZTogaWNvbiA/ICc8c3BhbiBjbGFzcz1cImljb25mb250IGFtYXBpY29uICcgKyBpY29uICsgJ1wiID48L3NwYW4+JyA6IGltZ0luZm8sXG4gICAgICAgICAgICAvL+iuvue9ruWfuueCueWBj+enu1xuICAgICAgICAgICAgb2Zmc2V0OiBuZXcgQU1hcC5QaXhlbCgtMTUsIC0xNSksXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwLFxuICAgICAgICAgICAgc2hvd1Bvc2l0aW9uUG9pbnQ6IHRydWUsXG4gICAgICAgICAgICBwb3NpdGlvbjogcG9pbnRMaXN0LFxuICAgICAgICAgICAgekluZGV4OiAxMDBcbiAgICAgICAgICB9KTtcbiAgICAgICAgc2ltcGxlTWFya2VyLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICB0aGlzLmljb25DbGljay5lbWl0KGVsZW1lbnQuZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC8vIOe8qeaUvuWcsOWbvuWIsOWQiOmAgueahOinhumHjue6p+WIq1xuICAgICAgICB0aGlzLm1hcC5zZXRGaXRWaWV3KCk7XG5cbiAgICAgICAgaWYgKHNob3dJbmZvKSB7XG4gICAgICAgICAgY29uc3QgaW5mb1dpbmRvdyA9IG5ldyBTaW1wbGVJbmZvV2luZG93KHtcbiAgICAgICAgICAgIGluZm9UaXRsZTogXCI8c3Ryb25nPlwiICsgc2hvd0luZm8udGl0bGUgKyBcIjwvc3Ryb25nPlwiLFxuICAgICAgICAgICAgaW5mb0JvZHk6IHNob3dJbmZvLmJvZHlcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvL+aYvuekuuWcqG1hcOS4ilxuICAgICAgICAgIC8vIGluZm9XaW5kb3cub3Blbih0aGlzLm1hcCwgcG9pbnRMaXN0KTtcbiAgICAgICAgICAvL21hcmtlciDngrnlh7vml7bmiZPlvIBcbiAgICAgICAgICBBTWFwLmV2ZW50LmFkZExpc3RlbmVyKHNpbXBsZU1hcmtlciwgJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgICAgIGluZm9XaW5kb3cub3Blbih0aGlzLm1hcCwgcG9pbnRMaXN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBBTWFwLmV2ZW50LmFkZExpc3RlbmVyKHNpbXBsZU1hcmtlciwgJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICAgICAgaW5mb1dpbmRvdy5jbG9zZSgpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLy/nlLvnur9cbiAgcHJpdmF0ZSBkcmF3TGluZShsaW5lczogTGluZXMsIG9wdGlvbnMgPSB7fSkge1xuICAgIC8vI3JlZ2lvblxuICAgIC8v5rWL6K+V5Lyg5Y+CXG4gICAgLy8jZW5kcmVnaW9uXG4gICAgbGluZXMuZm9yRWFjaChwb2ludExpc3QgPT4ge1xuICAgICAgY29uc3QgcG9seWxpbmUgPSBuZXcgQU1hcC5Qb2x5bGluZSh7XG4gICAgICAgIHBhdGg6IHBvaW50TGlzdCxcbiAgICAgICAgaXNPdXRsaW5lOiB0cnVlLFxuICAgICAgICBvdXRsaW5lQ29sb3I6ICcjZmZlZWZmJyxcbiAgICAgICAgYm9yZGVyV2VpZ2h0OiAyLFxuICAgICAgICBzdHJva2VDb2xvcjogXCIjMzM2NkZGXCIsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXG4gICAgICAgIHN0cm9rZVdlaWdodDogNCxcbiAgICAgICAgLy8g5oqY57q/5qC35byP6L+Y5pSv5oyBICdkYXNoZWQnXG4gICAgICAgIHN0cm9rZVN0eWxlOiBcInNvbGlkXCIsXG4gICAgICAgIC8vIHN0cm9rZVN0eWxl5pivZGFzaGVk5pe25pyJ5pWIXG4gICAgICAgIHN0cm9rZURhc2hhcnJheTogWzEwLCAxNV0sXG4gICAgICAgIGxpbmVKb2luOiAncm91bmQnLFxuICAgICAgICBsaW5lQ2FwOiAncm91bmQnLFxuICAgICAgICB6SW5kZXg6IDUwLFxuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgfSlcbiAgICAgIHBvbHlsaW5lLnNldE1hcCh0aGlzLm1hcCk7XG4gICAgICAvLyDnvKnmlL7lnLDlm77liLDlkIjpgILnmoTop4bph47nuqfliKtcbiAgICAgIHRoaXMubWFwLnNldEZpdFZpZXcoW3BvbHlsaW5lXSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldERPTUZyb21Db21wb25lbnQoY29tcG9uZW50LCBkYXRhKTogTm9kZSB7XG4gICAgY29uc3QgaWNvbiA9IHRoaXMuX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuICAgIChpY29uIGFzIGFueSkuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy50ZW1wbGF0ZUNvbXBpbGUuY2xlYXIoKTtcbiAgICBjb25zdCB2aWV3ID0gdGhpcy50ZW1wbGF0ZUNvbXBpbGUuY3JlYXRlQ29tcG9uZW50KGljb24pO1xuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgIH0pO1xuICAgIGNvbnN0IGVsID0gKCh2aWV3LmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNoaWxkTm9kZXMgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4pWzBdLmNsb25lTm9kZSh0cnVlKTtcbiAgICB0aGlzLnRlbXBsYXRlQ29tcGlsZS5jbGVhcigpO1xuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4geyB9KTtcbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICBpbml0Um91dGUoUGF0aFNpbXBsaWZpZXIpIHtcbiAgICAvL+WIm+W7uue7hOS7tuWunuS+i1xuICAgIGxldCBwYXRoU2ltcGxpZmllcklucyA9IG5ldyBQYXRoU2ltcGxpZmllcih7XG4gICAgICB6SW5kZXg6IDEwMCxcbiAgICAgIG1hcDogdGhpcy5tYXAsIC8v5omA5bGe55qE5Zyw5Zu+5a6e5L6LXG4gICAgICBnZXRQYXRoOiAocGF0aERhdGEsIHBhdGhJbmRleCkgPT4ge1xuICAgICAgICAvL+i/lOWbnui9qOi/ueaVsOaNruS4reeahOiKgueCueWdkOagh+S/oeaBr++8jFtBTWFwLkxuZ0xhdCwgQU1hcC5MbmdMYXQuLi5dIOaIluiAhSBbW2xuZ3xudW1iZXIsbGF0fG51bWJlcl0sLi4uXVxuICAgICAgICByZXR1cm4gcGF0aERhdGEucGF0aDtcbiAgICAgIH0sXG4gICAgICBnZXRIb3ZlclRpdGxlOiAocGF0aERhdGEsIHBhdGhJbmRleCwgcG9pbnRJbmRleCkgPT4ge1xuICAgICAgICAvL+i/lOWbnum8oOagh+aCrOWBnOaXtuaYvuekuueahOS/oeaBr1xuICAgICAgICBpZiAocG9pbnRJbmRleCA+PSAwKSB7XG4gICAgICAgICAgLy/pvKDmoIfmgqzlgZzlnKjmn5DkuKrovajov7noioLngrnkuIpcbiAgICAgICAgICByZXR1cm4gcGF0aERhdGEubmFtZSArICfvvIzngrk6JyArIHBvaW50SW5kZXggKyAnLycgKyBwYXRoRGF0YS5wYXRoLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICAvL+m8oOagh+aCrOWBnOWcqOiKgueCueS5i+mXtOeahOi/nue6v+S4ilxuICAgICAgICByZXR1cm4gcGF0aERhdGEubmFtZSArICfvvIzngrnmlbDph48nICsgcGF0aERhdGEucGF0aC5sZW5ndGg7XG4gICAgICB9LFxuICAgICAgcmVuZGVyT3B0aW9uczoge1xuICAgICAgICAvL+i9qOi/uee6v+eahOagt+W8j1xuICAgICAgICBwYXRoTGluZVN0eWxlOiB7XG4gICAgICAgICAgc3Ryb2tlU3R5bGU6ICdyZWQnLFxuICAgICAgICAgIGxpbmVXaWR0aDogNixcbiAgICAgICAgICBkaXJBcnJvd1N0eWxlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8v6L+Z6YeM5p6E5bu65Lik5p2h566A5Y2V55qE6L2o6L+577yM5LuF5L2c56S65L6LXG4gICAgcGF0aFNpbXBsaWZpZXJJbnMuc2V0RGF0YShbe1xuICAgICAgbmFtZTogJ+i9qOi/uTAnLFxuICAgICAgcGF0aDogW1xuICAgICAgICBbMTAwLjM0MDQxNywgMjcuMzc2OTk0XSxcbiAgICAgICAgWzEwOC40MjYzNTQsIDM3LjgyNzQ1Ml0sXG4gICAgICAgIFsxMTMuMzkyMTc0LCAzMS4yMDg0MzldLFxuICAgICAgICBbMTI0LjkwNTg0NiwgNDIuMjMyODc2XVxuICAgICAgXVxuICAgIH0sIHtcbiAgICAgIG5hbWU6ICflpKflnLDnur8nLFxuICAgICAgLy/liJvlu7rkuIDmnaHljIXmi6w1MDDkuKrmj5LlgLzngrnnmoTlpKflnLDnur9cbiAgICAgIHBhdGg6IFBhdGhTaW1wbGlmaWVyLmdldEdlb2Rlc2ljUGF0aChbMTE2LjQwNTI4OSwgMzkuOTA0OTg3XSwgWzg3LjYxNzkyLCA0My43OTMzMDhdLCA1MDApXG4gICAgfV0pO1xuXG4gICAgLy/liJvlu7rkuIDkuKrlt6HoiKrlmahcbiAgICBsZXQgbmF2ZzAgPSBwYXRoU2ltcGxpZmllcklucy5jcmVhdGVQYXRoTmF2aWdhdG9yKDAuMiwgLy/lhbPogZTnrKwx5p2h6L2o6L+5XG4gICAgICB7XG4gICAgICAgIGxvb3A6IHRydWUsIC8v5b6q546v5pKt5pS+XG4gICAgICAgIHNwZWVkOiAxMDAwMDBcbiAgICAgIH0pO1xuICAgIG5hdmcwLnN0YXJ0KCk7XG4gIH1cblxuICBnZXRBZGRyZXNzUG9pbnRBbmREcmF3KCkge1xuICAgIHRoaXMuYW1hcFNlcnZpY2UuZ2V0TWFya2VyQnlMb2NhdGlvbkxpc3QodGhpcy5sb2NhdGlvbkxpc3QpXG4gICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLmRyYXdJY29ucyhkYXRhKTtcbiAgICAgIH0pXG4gIH1cbn1cblxuY2xhc3MgR3VpZCB7XG4gIHN0YXRpYyBuZXdHdWlkKCkge1xuICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgICBsZXQgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDAsXG4gICAgICAgIHYgPSBjID09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCk7XG4gICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XG4gICAgfSk7XG4gIH1cbn1cbmV4cG9ydCBjbGFzcyBzaG93VGVtcGxhdGUge1xuXG4gIHRpdGxlPzogc3RyaW5nO1xuICBib2R5PzogRWxlbWVudFJlZjxhbnk+IHwgc3RyaW5nO1xufVxuIl19