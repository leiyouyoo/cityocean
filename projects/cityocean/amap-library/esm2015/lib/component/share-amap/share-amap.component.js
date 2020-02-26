/**
 * @fileoverview added by tsickle
 * Generated from: lib/component/share-amap/share-amap.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class ShareAmapComponent {
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
export class showTemplate {
}
if (false) {
    /** @type {?} */
    showTemplate.prototype.title;
    /** @type {?} */
    showTemplate.prototype.body;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtYW1hcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2l0eW9jZWFuL2FtYXAtbGlicmFyeS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvc2hhcmUtYW1hcC9zaGFyZS1hbWFwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEVBQ1QsS0FBSyxFQUVMLE1BQU0sRUFDTixZQUFZLEVBQ1osTUFBTSxFQUFFLHdCQUF3QixFQUFFLGdCQUFnQixHQUNuRCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7OztBQUkxRCxxQkFBb0Q7OztJQUFqQyxxQkFBYTs7SUFBQyx1QkFBaUI7Ozs7O0FBSWxELG1CQU1DOzs7SUFMQyxtQkFBYTs7SUFDYixvQkFBYzs7SUFDZCxxQkFBa0I7O0lBQ2xCLHdCQUE2Qzs7SUFDN0Msb0JBQVc7O0FBUWIsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7Ozs7OztJQXFFN0IsWUFDVSxRQUFtQixFQUNuQixFQUFjLEVBQ2QsSUFBWSxFQUNaLHlCQUFtRCxFQUNuRCxJQUFpQixFQUNqQixlQUFnQyxFQUNoQyxXQUF3QjtRQU54QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEwQjtRQUNuRCxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2pCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQTNFekIsV0FBTSxHQUFHLEdBQUcsQ0FBQzs7UUFJZCxhQUFRLEdBQWEsRUFBRSxDQUFDO1FBUXRCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7UUFHbkMsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQVFsQixjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7UUFHakMsV0FBTSxHQUFVLEVBQUUsQ0FBQzs7UUFXbkIsaUJBQVksR0FBVSxFQUFFLENBQUM7UUFVekIsa0JBQWEsR0FBRyxFQUFFLENBQUM7SUE4QjNCLENBQUM7Ozs7O0lBeEVELElBQWEsT0FBTyxDQUFDLEtBQWU7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7OztJQUNELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7OztJQUtELElBQWEsS0FBSyxDQUFDLEtBQWE7UUFDOUIsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuQixDQUFDLEVBQUMsQ0FBQTtJQUNKLENBQUM7Ozs7O0lBS0QsSUFBYSxLQUFLLENBQUMsUUFBZTtRQUNoQyxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU87UUFDdEIsUUFBUTtRQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3ZCLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUMsRUFBQyxDQUFBO0lBQ0osQ0FBQzs7Ozs7SUFJRCxJQUFhLFdBQVcsQ0FBQyxHQUFVO1FBQ2pDLElBQUksQ0FBQyxHQUFHO1lBQUUsT0FBTztRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUN4QixVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQzNFLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUNELElBQUksV0FBVyxLQUFLLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQSxDQUFDLENBQUM7Ozs7O0lBRzlDLElBQWEsWUFBWSxDQUFDLEtBQVk7UUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQzs7OztJQUNELElBQUksWUFBWSxLQUFLLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBS2pELElBQWEsV0FBVyxDQUFDLFFBQWE7UUFDcEMsSUFBSSxRQUFRLENBQUMsSUFBSSxZQUFZLFVBQVUsRUFBRTtZQUN2QyxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsbUJBQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtTQUNuRTtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFpQkQsUUFBUTtRQUNOLHNCQUFzQjtRQUMxQjs7O2tCQUdVO1FBQ04sVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsT0FBUTtZQUNSLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDNUQsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDO29CQUNwQyxDQUFDLFVBQVUsRUFBQyxTQUFTLENBQUM7b0JBQ3RCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQztvQkFDdEIsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQztvQkFDakQsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDO29CQUN2QixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUM7b0JBQ3RCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsZ0NBQWdDLEVBQUUsS0FBSyxFQUFFLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsZ0NBQWdDLEVBQUUsS0FBSyxFQUFFLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBLFFBQVE7WUFDOUssSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLDJCQUEyQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsMkJBQTJCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUEsUUFBUTtRQUV4TCxDQUFDLEdBQUUsSUFBSSxDQUFDLENBQUM7O1lBQ0wsRUFBRSxHQUFXLElBQUksQ0FBQyxPQUFPLEVBQUU7O2NBQ3pCLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWE7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztTQUNqRTtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCOzs7UUFBQyxHQUFHLEVBQUU7WUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFO2dCQUMxQixnQkFBZ0IsRUFBRSxTQUFTOztnQkFDM0IsSUFBSSxFQUFFLEVBQUU7O2dCQUNSLFlBQVksRUFBRSxJQUFJOztnQkFFbEIsUUFBUSxFQUFFLElBQUksQ0FBQSxRQUFRO2FBQ3ZCLENBQUMsQ0FBQztZQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQXNCUztRQUNYLENBQUMsRUFBQyxDQUFDO1FBQ0gsY0FBYztRQUNkLDZHQUE2RztRQUM3RyxzQ0FBc0M7UUFDdEMsa0NBQWtDO1FBQ2xDLDhDQUE4QztRQUM5QyxzQ0FBc0M7UUFDdEMsdUJBQXVCO1FBQ3ZCLHdCQUF3QjtRQUN4QixzQ0FBc0M7UUFDdEMsd0JBQXdCO1FBQ3hCLE1BQU07UUFDTiwyREFBMkQ7UUFDM0QsdUNBQXVDO1FBRXZDLGdFQUFnRTtRQUNoRSxtQ0FBbUM7UUFDbkMsNkRBQTZEO1FBQzdELHVDQUF1QztRQUN2QyxtQ0FBbUM7UUFDbkMsU0FBUztRQUNULDREQUE0RDtRQUM1RCw2QkFBNkI7UUFDN0IsMkRBQTJEO1FBQzNELHVDQUF1QztRQUN2QyxTQUFTO1FBQ1QsT0FBTztRQUVQLHVCQUF1QjtRQUN2QixtQ0FBbUM7UUFDbkMsdUZBQXVGO1FBQ3ZGLGtCQUFrQjtRQUNsQixRQUFRO1FBQ1Isa0JBQWtCO1FBQ2xCLCtCQUErQjtRQUMvQiw4QkFBOEI7UUFDOUIsTUFBTTtRQUVOLGlEQUFpRDtRQUNqRCw4R0FBOEc7UUFDOUcsd0JBQXdCO1FBQ3hCLHNCQUFzQjtRQUN0Qiw2RUFBNkU7UUFDN0Usa0JBQWtCO1FBQ2xCLHdEQUF3RDtRQUN4RCxtQkFBbUI7UUFDbkIsaUJBQWlCO1FBQ2pCLCtCQUErQjtRQUMvQixVQUFVO1FBQ1YsU0FBUztRQUNULHVDQUF1QztRQUN2QyxvQkFBb0I7UUFDcEIscUJBQXFCO1FBQ3JCLHFDQUFxQztRQUNyQyxRQUFRO1FBQ1IsdUJBQXVCO1FBQ3ZCLG1DQUFtQztRQUNuQyw4RUFBOEU7UUFDOUUsc0JBQXNCO1FBQ3RCLFFBQVE7UUFFUixrQkFBa0I7UUFDbEIsK0JBQStCO1FBQy9CLDhCQUE4QjtRQUU5QixtQkFBbUI7UUFDbkIsb0RBQW9EO1FBQ3BELDhDQUE4QztRQUM5Qyw0QkFBNEI7UUFDNUIsbUNBQW1DO1FBQ25DLDBCQUEwQjtRQUMxQix1Q0FBdUM7UUFDdkMsVUFBVTtRQUNWLGlCQUFpQjtRQUNqQix1REFBdUQ7UUFDdkQsUUFBUTtRQUVSLE1BQU07UUFFTixrREFBa0Q7UUFDbEQsZ0VBQWdFO1FBQ2hFLHlDQUF5QztRQUN6QyxnQ0FBZ0M7UUFDaEMsY0FBYztRQUNkLE1BQU07UUFDTixXQUFXO1FBQ1gscUNBQXFDO1FBQ3JDLE1BQU07UUFDTixZQUFZO1FBQ1osVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsQ0FBQyxHQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7Ozs7Ozs7SUFHTyxTQUFTLENBQUMsU0FBd0IsRUFBRSxHQUFXOztjQUMvQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdCLFFBQVEsRUFBRSxTQUFTO1lBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRzs7WUFFYixNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ2pDLENBQUM7UUFDRiwyQkFBMkI7UUFDM0IsZUFBZTtRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFpQjtRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFBRSxPQUFPO1FBQ3BDLE9BQU8sQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQyxDQUFDLE9BQU87Ozs7UUFBQyxNQUFNLENBQUMsRUFBRTtZQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxFQUFDLENBQUE7SUFDSixDQUFDOzs7Ozs7O0lBRU8sU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTTtRQUNuQyxLQUFLLENBQUMsT0FBTzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7OztJQUNPLFFBQVEsQ0FBQyxPQUFPOztjQUNkLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSzs7Y0FDekIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJOztjQUNuQixRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVE7O2NBQzNCLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRztRQUN2QixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsc0JBQXNCLEVBQUUsMEJBQTBCLENBQUM7Ozs7O1FBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRTs7Z0JBQ2pHLE9BQU8sR0FBRztnQkFDWixHQUFHLEVBQUUsR0FBRztnQkFDUixLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLE1BQU07b0JBQ2IsTUFBTSxFQUFFLE1BQU07aUJBQ2Y7YUFDRjs7a0JBQ08sWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDO2dCQUNwQyxTQUFTLEVBQUUsRUFBRTtnQkFDYixTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxpQ0FBaUMsR0FBRyxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxPQUFPOztnQkFFbkYsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDaEMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO2dCQUNiLGlCQUFpQixFQUFFLElBQUk7Z0JBQ3ZCLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixNQUFNLEVBQUUsR0FBRzthQUNaLENBQUM7WUFDSixZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU87OztZQUFFLEdBQUcsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLENBQUMsRUFBQyxDQUFBO1lBQ0YsZUFBZTtZQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFdEIsSUFBSSxRQUFRLEVBQUU7O3NCQUNOLFVBQVUsR0FBRyxJQUFJLGdCQUFnQixDQUFDO29CQUN0QyxTQUFTLEVBQUUsVUFBVSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsV0FBVztvQkFDcEQsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2lCQUN4QixDQUFDO2dCQUNGLFNBQVM7Z0JBQ1Qsd0NBQXdDO2dCQUN4QyxjQUFjO2dCQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxXQUFXOzs7Z0JBQUUsR0FBRyxFQUFFO29CQUNyRCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUMsRUFBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxVQUFVOzs7Z0JBQUUsR0FBRyxFQUFFO29CQUNwRCxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBQ3BCLENBQUMsRUFBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7Ozs7O0lBR08sUUFBUSxDQUFDLEtBQVksRUFBRSxPQUFPLEdBQUcsRUFBRTtRQUN6QyxTQUFTO1FBQ1QsTUFBTTtRQUNOLFlBQVk7UUFDWixLQUFLLENBQUMsT0FBTzs7OztRQUFDLFNBQVMsQ0FBQyxFQUFFOztrQkFDbEIsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsaUJBQ2hDLElBQUksRUFBRSxTQUFTLEVBQ2YsU0FBUyxFQUFFLElBQUksRUFDZixZQUFZLEVBQUUsU0FBUyxFQUN2QixZQUFZLEVBQUUsQ0FBQyxFQUNmLFdBQVcsRUFBRSxTQUFTLEVBQ3RCLGFBQWEsRUFBRSxDQUFDLEVBQ2hCLFlBQVksRUFBRSxDQUFDLEVBRWYsV0FBVyxFQUFFLE9BQU8sRUFFcEIsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUN6QixRQUFRLEVBQUUsT0FBTyxFQUNqQixPQUFPLEVBQUUsT0FBTyxFQUNoQixNQUFNLEVBQUUsRUFBRSxJQUNQLE9BQU8sRUFDVjtZQUNGLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLGVBQWU7WUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBRU8sbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUk7O2NBQ25DLElBQUksR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDO1FBQzlFLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7O2NBQ3ZCLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7UUFBQyxHQUFHLEVBQUU7UUFDbkIsQ0FBQyxFQUFDLENBQUM7O2NBQ0csRUFBRSxHQUFHLENBQUMsbUJBQUEsQ0FBQyxtQkFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBZSxDQUFDLENBQUMsVUFBVSxFQUEyQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUNsSCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRzs7O1FBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFDLENBQUM7UUFDekIsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxjQUFjOzs7WUFFbEIsaUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQUM7WUFDekMsTUFBTSxFQUFFLEdBQUc7WUFDWCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7O1lBQ2IsT0FBTzs7Ozs7WUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsRUFBRTtnQkFDL0IsK0VBQStFO2dCQUMvRSxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDdkIsQ0FBQyxDQUFBO1lBQ0QsYUFBYTs7Ozs7O1lBQUUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxFQUFFO2dCQUNqRCxjQUFjO2dCQUNkLElBQUksVUFBVSxJQUFJLENBQUMsRUFBRTtvQkFDbkIsY0FBYztvQkFDZCxPQUFPLFFBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7aUJBQ3hFO2dCQUNELGVBQWU7Z0JBQ2YsT0FBTyxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2RCxDQUFDLENBQUE7WUFDRCxhQUFhLEVBQUU7O2dCQUViLGFBQWEsRUFBRTtvQkFDYixXQUFXLEVBQUUsS0FBSztvQkFDbEIsU0FBUyxFQUFFLENBQUM7b0JBQ1osYUFBYSxFQUFFLElBQUk7aUJBQ3BCO2FBQ0Y7U0FDRixDQUFDO1FBRUYsa0JBQWtCO1FBQ2xCLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN6QixJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUU7b0JBQ0osQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDO29CQUN2QixDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUM7b0JBQ3ZCLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQztvQkFDdkIsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDO2lCQUN4QjthQUNGLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLEtBQUs7O2dCQUVYLElBQUksRUFBRSxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxFQUFFLEdBQUcsQ0FBQzthQUMxRixDQUFDLENBQUMsQ0FBQzs7O1lBR0EsS0FBSyxHQUFHLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxTQUFTO1FBQzlEO1lBQ0UsSUFBSSxFQUFFLElBQUk7O1lBQ1YsS0FBSyxFQUFFLE1BQU07U0FDZCxDQUFDO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hCLENBQUM7Ozs7SUFFRCxzQkFBc0I7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQ3hELFNBQVM7Ozs7UUFBQyxJQUFJLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsRUFBQyxDQUFBO0lBQ04sQ0FBQzs7O1lBdlpGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsZ0lBQTBDOzthQUUzQzs7OztZQTdCQyxTQUFTO1lBRFQsVUFBVTtZQU1WLE1BQU07WUFBRSx3QkFBd0I7WUFFekIsV0FBVztZQUNYLGVBQWU7WUFDZixXQUFXOzs7cUJBc0JqQixLQUFLO29CQUNMLEtBQUs7c0JBSUwsS0FBSzswQkFPTCxNQUFNO29CQUlOLEtBQUs7d0JBT0wsTUFBTTtvQkFJTixLQUFLOzBCQVdMLEtBQUs7MkJBVUwsS0FBSzt1QkFNTCxTQUFTLFNBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTswQkFHdEMsS0FBSztvQkFPTCxTQUFTLFNBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs4QkFFbkMsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFOzs7O0lBbEU5RCxvQ0FBc0I7O0lBQ3RCLG1DQUF3Qjs7Ozs7SUFHeEIsc0NBQWdDOztJQVFoQyx5Q0FBMkM7Ozs7O0lBRzNDLG9DQUE0Qjs7SUFRNUIsdUNBQXlDOzs7OztJQUd6QyxvQ0FBMkI7Ozs7O0lBVzNCLDBDQUFpQzs7Ozs7SUFVakMsMkNBQTJCOztJQU8zQixzQ0FBbUU7Ozs7O0lBRW5FLDJDQUFvQzs7SUFRcEMsbUNBQXdEOzs7OztJQUN4RCxpQ0FBaUI7O0lBQ2pCLDZDQUFrRzs7Ozs7SUFHaEcsc0NBQTJCOzs7OztJQUMzQixnQ0FBc0I7Ozs7O0lBQ3RCLGtDQUFvQjs7Ozs7SUFDcEIsdURBQTJEOzs7OztJQUMzRCxrQ0FBeUI7Ozs7O0lBQ3pCLDZDQUF3Qzs7Ozs7SUFDeEMseUNBQWdDOztBQXlVcEMsTUFBTSxJQUFJOzs7O0lBQ1IsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPLHNDQUFzQyxDQUFDLE9BQU8sQ0FBQyxPQUFPOzs7O1FBQUUsVUFBVSxDQUFDOztnQkFDcEUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQzs7Z0JBQzVCLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDcEMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBQ0QsTUFBTSxPQUFPLFlBQVk7Q0FJeEI7OztJQUZDLDZCQUFlOztJQUNmLDRCQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIFJlbmRlcmVyMixcbiAgSW5wdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgTmdab25lLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICdAY2l0eW9jZWFuL2NvbW1vbi1saWJyYXJ5JztcbmltcG9ydCB7IEFtYXBIdHRwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FtYXAtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IEFtYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW1hcC5zZXJ2aWNlJztcbmRlY2xhcmUgbGV0IEFNYXA6IGFueTtcbmRlY2xhcmUgbGV0IEFNYXBVSTogYW55O1xuXG5pbnRlcmZhY2UgTWFya2VyIHsgaW1nPzogc3RyaW5nLCBwb2ludDogQXJyYXk8YW55PiB9XG5cbnR5cGUgTGluZXMgPSBbbnVtYmVyLCBudW1iZXJdW11bXTtcblxuaW50ZXJmYWNlIEljb24ge1xuICBpbWc/OiBzdHJpbmcsXG4gIGljb24/OiBzdHJpbmcsXG4gIHBvaW50OiBBcnJheTxhbnk+LFxuICB0ZW1wbGF0ZT86IHsgdGl0bGU/OiBzdHJpbmcsIGJvZHk/OiBzdHJpbmcgfSxcbiAgZGF0YT86IGFueSxcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2hhcmUtYW1hcCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaGFyZS1hbWFwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2hhcmUtYW1hcC5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJlQW1hcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGhlaWdodCA9IDgwMDtcbiAgQElucHV0KCkgd2lkdGg/OiBudW1iZXI7XG5cbiAgLy/pu5jorqTngrnmoIforrBcbiAgcHJpdmF0ZSBfbWFya2VyczogTWFya2VyW10gPSBbXTtcbiAgQElucHV0KCkgc2V0IG1hcmtlcnModmFsdWU6IE1hcmtlcltdKSB7XG4gICAgdGhpcy5fbWFya2VycyA9IHZhbHVlO1xuICAgIHRoaXMuZHJhd01hcmtlcnModGhpcy5tYXJrZXJzKTtcbiAgfVxuICBnZXQgbWFya2VycygpOiBNYXJrZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX21hcmtlcnM7XG4gIH1cbiAgQE91dHB1dCgpIG1hcmtlckNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8v5Zu+5qCHXG4gIHByaXZhdGUgX2ljb25zOiBJY29uW10gPSBbXTtcbiAgQElucHV0KCkgc2V0IGljb25zKHZhbHVlOiBJY29uW10pIHtcbiAgICBpZiAoIXZhbHVlKSByZXR1cm47XG4gICAgdGhpcy5faWNvbnMgPSB2YWx1ZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZHJhd0ljb25zKCk7XG4gICAgfSlcbiAgfVxuICBAT3V0cHV0KCkgaWNvbkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8v57q/6ZuG5ZCIXG4gIHByaXZhdGUgX2xpbmVzOiBMaW5lcyA9IFtdO1xuICBASW5wdXQoKSBzZXQgbGluZXMobGluZUxpc3Q6IExpbmVzKSB7XG4gICAgaWYgKCFsaW5lTGlzdCkgcmV0dXJuO1xuICAgIC8v5rWL6K+V5Y+C5pWw6LWL5YC8XG4gICAgdGhpcy5fbGluZXMgPSBsaW5lTGlzdDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZHJhd0xpbmUodGhpcy5fbGluZXMpO1xuICAgIH0pXG4gIH1cblxuICAvLyDomZrnur9cbiAgcHJpdmF0ZSBfZGFzaGVkTGluZXM6IExpbmVzID0gW107XG4gIEBJbnB1dCgpIHNldCBkYXNoZWRMaW5lcyh2YWw6IExpbmVzKSB7XG4gICAgaWYgKCF2YWwpIHJldHVybjtcbiAgICB0aGlzLl9kYXNoZWRMaW5lcyA9IHZhbDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZHJhd0xpbmUodGhpcy5fZGFzaGVkTGluZXMsIHsgekluZGV4OiA0MCwgc3Ryb2tlU3R5bGU6ICdkYXNoZWQnLCB9KTtcbiAgICB9KTtcbiAgfVxuICBnZXQgZGFzaGVkTGluZXMoKSB7IHJldHVybiB0aGlzLl9kYXNoZWRMaW5lcyB9XG5cbiAgcHJpdmF0ZSBfbG9jYXRpb25MaXN0ID0gW107XG4gIEBJbnB1dCgpIHNldCBsb2NhdGlvbkxpc3QodmFsdWU6IGFueVtdKSB7XG4gICAgdGhpcy5fbG9jYXRpb25MaXN0ID0gdmFsdWU7XG4gICAgdGhpcy5nZXRBZGRyZXNzUG9pbnRBbmREcmF3KCk7XG4gIH1cbiAgZ2V0IGxvY2F0aW9uTGlzdCgpIHsgcmV0dXJuIHRoaXMuX2xvY2F0aW9uTGlzdDsgfVxuXG4gIEBWaWV3Q2hpbGQoJ2Nlc2hpTWFwJywgeyBzdGF0aWM6IHRydWUgfSkgY2VzaGlNYXA6IEVsZW1lbnRSZWY8YW55PjtcbiAgLy/nqpfkvZPmmL7npLrkv6Hmga9cbiAgcHJpdmF0ZSBfc2hvd1RlbXBsYXRlOiBzaG93VGVtcGxhdGU7XG4gIEBJbnB1dCgpIHNldCBzZXRUZW1wbGF0ZShzaG93SW5mbzogYW55KSB7XG4gICAgaWYgKHNob3dJbmZvLmJvZHkgaW5zdGFuY2VvZiBFbGVtZW50UmVmKSB7XG4gICAgICBzaG93SW5mby5ib2R5ID0gKHNob3dJbmZvLmJvZHkubmF0aXZlRWxlbWVudCBhcyBFbGVtZW50KS5pbm5lckhUTUxcbiAgICB9XG4gICAgdGhpcy5fc2hvd1RlbXBsYXRlID0gc2hvd0luZm87XG4gIH1cblxuICBAVmlld0NoaWxkKFwibWFwVWlcIiwgeyBzdGF0aWM6IHRydWUgfSkgbWFwVWk6IEVsZW1lbnRSZWY7XG4gIHByaXZhdGUgbWFwOiBhbnk7XG4gIEBWaWV3Q2hpbGQoJ2NvbXBpbGUnLCB7IHN0YXRpYzogdHJ1ZSwgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSB0ZW1wbGF0ZUNvbXBpbGU6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwU2VydmljZSxcbiAgICBwcml2YXRlIGFtYXBIdHRwU2VydmljZTogQW1hcEh0dHBTZXJ2aWNlLFxuICAgIHByaXZhdGUgYW1hcFNlcnZpY2U6IEFtYXBTZXJ2aWNlLFxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIGdvb2dsZSBnZW9jb2Rpbmcg5rWL6K+VXG4vKiAgICB0aGlzLmFtYXBTZXJ2aWNlLmdvb2dsZUdlbygnTmV3IHlvcmsnKVxuICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9KSovXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByZXR1cm4gO1xuICAgICAgdGhpcy5zZXRUZW1wbGF0ZSA9IHsgdGl0bGU6IFwi5rWL6K+V5L+h5oGv56qX5L2TXCIsIGJvZHk6IHRoaXMuY2VzaGlNYXAgfTtcbiAgICAgIHRoaXMubGluZXM9W1tbMTE2LjM2MjIwOSwgMzkuODg3NDg3XSxcbiAgICAgIFsxMjAuNDIyODk3LDUwLjg3ODAwMl0sXG4gICAgICBbMTI1LjM3MjEwNSwgNjAuOTA2NTFdLFxuICAgICAgWzEyOC40Mjg5NDUsIDQwLjg5NjYzXV0sIFtbMTMwLjM2MjIwOSwgNDEuODg3NDg3XSxcbiAgICAgIFsxMjkuNDIyODk3LCA0NS44NzgwMDJdLFxuICAgICAgWzEzMC4zNzIxMDUsIDQ2LjkwNjUxXSxcbiAgICAgIFsxMzUuNDI4OTQ1LCA1MC44OTY2M11dXTtcbiAgICAgIHRoaXMubWFya2VycyA9IFt7IGltZzogXCIvYXNzZXRzL2ltYWdlcy9pY29uX3dlaXhpbi5wbmdcIiwgcG9pbnQ6IFsxMDYuNDA2MzE1LCA0MS45MDg3NzVdIH0sIHsgaW1nOiBcIi9hc3NldHMvaW1hZ2VzL2ljb25fd2VpeGluLnBuZ1wiLCBwb2ludDogWzExNi40MDYzMTUsIDM5LjkyODc3NV0gfV07Ly/mtYvor5Xlj4LmlbDotYvlgLxcbiAgICAgIHRoaXMuaWNvbnMgPSBbeyBpbWc6IFwiL2Fzc2V0cy9pbWFnZXMvYXZhdGFyLnBuZ1wiLCBpY29uOiBcIlwiLCBwb2ludDogWzEwNi40MDYzMTUsIDQxLjkwODc3NV0gfSwgeyBpbWc6IFwiL2Fzc2V0cy9pbWFnZXMvYXZhdGFyLnBuZ1wiLCBpY29uOiBcIlwiLCBwb2ludDogWzExNi40MDYzMTUsIDM5LjkyODc3NV0gfV07Ly/mtYvor5Xlj4LmlbDotYvlgLxcblxuICAgIH0sIDEwMDApO1xuICAgIGxldCBpZDogc3RyaW5nID0gR3VpZC5uZXdHdWlkKCk7XG4gICAgY29uc3QgZGl2ID0gdGhpcy5tYXBVaS5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGRpdiwgJ2lkJywgaWQpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZGl2LCAnaGVpZ2h0JywgdGhpcy5oZWlnaHQgKyAncHgnKTtcbiAgICBpZiAodGhpcy53aWR0aCkge1xuICAgICAgZGl2LnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgdGhpcy53aWR0aCArICdweCcpO1xuICAgIH1cbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXAgPSBuZXcgQU1hcC5NYXAoaWQsIHtcbiAgICAgICAgdmVjdG9yTWFwRm9yZWlnbjogJ0VuZ2xpc2gnLC8v5Yqg6L295rW35aSW55+i6YeP5Zyw5Zu+5bm25pi+56S65Li65Lit5paHIEVuZ2xpc2ggLyBMb2NhbCAvIENoaW5lc2VfU2ltcGxpZmllZFxuICAgICAgICB6b29tOiAxMSwvL+e6p+WIq1xuICAgICAgICByZXNpemVFbmFibGU6IHRydWUsXG4gICAgICAgIC8vY2VudGVyOiBbMTE2LjM5NzQyOCwgMzkuOTA5MjNdLC8v5Lit5b+D54K55Z2Q5qCHXG4gICAgICAgIHZpZXdNb2RlOiAnMkQnLy/kvb/nlKgzROinhuWbvlxuICAgICAgfSk7XG5cbiAgICAgIC8qc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYW1hcEh0dHBTZXJ2aWNlLmdldChgaHR0cHM6Ly9yZXN0YXBpLmFtYXAuY29tL3YzL2dlb2NvZGUvZ2VvYCwge1xuICAgICAgICAgIGtleTogYDA2ZjNkZjg3MTFlNzU2NTE4YmE2MDQ2OWJlMGNiZjE0YCxcbiAgICAgICAgICBhZGRyZXNzOiBgU0tPUEpFYCxcbiAgICAgICAgICBjb3VudHJ5OiBgTUFLRURPTklKQWAsXG4gICAgICAgIH0pXG4gICAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgIH0pXG4gICAgICAgIC8v5p6E6YCg6Lev57q/5a+86Iiq57G7XG4gICAgICAgIHZhciBkcml2aW5nID0gbmV3IEFNYXAuRHJpdmluZyh7XG4gICAgICAgICAgbWFwOiB0aGlzLm1hcCxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOagueaNrui1t+e7iOeCuee7j+e6rOW6puinhOWIkumpvui9puWvvOiIqui3r+e6v1xuICAgICAgICBkcml2aW5nLnNlYXJjaChuZXcgQU1hcC5MbmdMYXQoLTIuMDQzNDU3LCA1Mi4zNjU1MzgpLCBuZXcgQU1hcC5MbmdMYXQoLTEuMTk5Njk4LCA1MS44NzkwMzgpLCBmdW5jdGlvbihzdGF0dXMsIHJlc3VsdCkge1xuICAgICAgICAgIC8vIHJlc3VsdCDljbPmmK/lr7nlupTnmoTpqb7ovablr7zoiKrkv6Hmga/vvIznm7jlhbPmlbDmja7nu5PmnoTmlofmoaPor7flj4LogIMgIGh0dHBzOi8vbGJzLmFtYXAuY29tL2FwaS9qYXZhc2NyaXB0LWFwaS9yZWZlcmVuY2Uvcm91dGUtc2VhcmNoI21fRHJpdmluZ1Jlc3VsdFxuICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnu5jliLbpqb7ovabot6/nur/lrozmiJAnKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W6am+6L2m5pWw5o2u5aSx6LSl77yaJyArIHJlc3VsdClcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSwgM2UzKSovXG4gICAgfSk7XG4gICAgLy8jcmVnaW9uICAg5rOo6YeKXG4gICAgLy8gQU1hcC5wbHVnaW4oW1wiQU1hcC5Ub29sQmFyXCIsIFwiQU1hcC5HZW9sb2NhdGlvblwiLCBcIkFNYXAuQXV0b2NvbXBsZXRlXCIsIFwiQU1hcC5QbGFjZVNlYXJjaFwiXSwgKCkgPT4gey8v5byC5q2l5Yqg6L295o+S5Lu2XG4gICAgLy8gICBsZXQgdG9vbGJhciA9IG5ldyBBTWFwLlRvb2xCYXIoKTtcbiAgICAvLyAgIHRoaXMubWFwLmFkZENvbnRyb2wodG9vbGJhcik7XG4gICAgLy8gICBsZXQgZ2VvbG9jYXRpb24gPSBuZXcgQU1hcC5HZW9sb2NhdGlvbigpO1xuICAgIC8vICAgdGhpcy5tYXAuYWRkQ29udHJvbChnZW9sb2NhdGlvbik7XG4gICAgLy8gICAvLyDlrp7kvovljJZBdXRvY29tcGxldGVcbiAgICAvLyAgIGxldCBhdXRvT3B0aW9ucyA9IHtcbiAgICAvLyAgICAgLy8gaW5wdXQg5Li657uR5a6a6L6T5YWl5o+Q56S65Yqf6IO955qEaW5wdXTnmoRET00gSURcbiAgICAvLyAgICAgaW5wdXQ6ICdpbnB1dF9pZCdcbiAgICAvLyAgIH1cbiAgICAvLyAgIGxldCBhdXRvY29tcGxldGUgPSBuZXcgQU1hcC5BdXRvY29tcGxldGUoYXV0b09wdGlvbnMpO1xuICAgIC8vICAgdGhpcy5tYXAuYWRkQ29udHJvbChhdXRvY29tcGxldGUpO1xuXG4gICAgLy8gICBsZXQgcGxhY2VTZWFyY2ggPSBuZXcgQU1hcC5QbGFjZVNlYXJjaCh7IGNpdHk6IFwiOTAwMDAwXCIgfSk7XG4gICAgLy8gICAvL21hcC5hZGRDb250cm9sKHBsYWNlU2VhcmNoKTtcbiAgICAvLyAgIC8vcGxhY2VTZWFyY2guc2VhcmNoKCfljJfkuqzlpKflraYnLCBmdW5jdGlvbiAoc3RhdHVzLCByZXN1bHQpIHtcbiAgICAvLyAgIC8vICBhbGVydChKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcbiAgICAvLyAgIC8vICAvLyDmn6Xor6LmiJDlip/ml7bvvIxyZXN1bHTljbPlr7nlupTljLnphY3nmoRQT0nkv6Hmga9cbiAgICAvLyAgIC8vfSlcbiAgICAvLyAgIEFNYXAuZXZlbnQuYWRkTGlzdGVuZXIoYXV0b2NvbXBsZXRlLCAnc2VsZWN0JywgKGUpID0+IHtcbiAgICAvLyAgICAgLy9UT0RPIOmSiOWvuemAieS4reeahHBvaeWunueOsOiHquW3seeahOWKn+iDvVxuICAgIC8vICAgICBwbGFjZVNlYXJjaC5zZWFyY2goZS5wb2kubmFtZSwgKHN0YXR1cywgcmVzdWx0KSA9PiB7XG4gICAgLy8gICAgICAgYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XG4gICAgLy8gICAgIH0pXG4gICAgLy8gICB9KVxuXG4gICAgLy8gICAvLyDliJvlu7rkuIDkuKogTWFya2VyIOWunuS+i++8mlxuICAgIC8vICAgbGV0IG1hcmtlciA9IG5ldyBBTWFwLk1hcmtlcih7XG4gICAgLy8gICAgIHBvc2l0aW9uOiBuZXcgQU1hcC5MbmdMYXQoMTE2LjM5LCAzOS45KSwgICAvLyDnu4/nuqzluqblr7nosaHvvIzkuZ/lj6/ku6XmmK/nu4/nuqzluqbmnoTmiJDnmoTkuIDnu7TmlbDnu4RbMTE2LjM5LCAzOS45XVxuICAgIC8vICAgICB0aXRsZTogJ+WMl+S6rCdcbiAgICAvLyAgIH0pO1xuICAgIC8vICAgLy8g5aSa5Liq54K55a6e5L6L57uE5oiQ55qE5pWw57uEXG4gICAgLy8gICBsZXQgbWFya2VyTGlzdCA9IFttYXJrZXJdO1xuICAgIC8vICAgdGhpcy5tYXAuYWRkKG1hcmtlckxpc3QpO1xuICAgIC8vIH0pO1xuXG4gICAgLy8gLy/liqDovb1Bd2Vzb21lTWFya2Vy77yMbG9hZFVJ55qE6Lev5b6E5Y+C5pWw5Li65qih5Z2X5ZCN5LitICd1aS8nIOS5i+WQjueahOmDqOWIhlxuICAgIC8vIEFNYXBVSS5sb2FkVUkoWydvdmVybGF5L0F3ZXNvbWVNYXJrZXInLCAnb3ZlcmxheS9TaW1wbGVJbmZvV2luZG93J10sIChBd2Vzb21lTWFya2VyLCBTaW1wbGVJbmZvV2luZG93KSA9PiB7XG4gICAgLy8gICBuZXcgQXdlc29tZU1hcmtlcih7XG4gICAgLy8gICAgIC8v6K6+572uYXdlc29tZUljb25cbiAgICAvLyAgICAgYXdlc29tZUljb246ICdzdHJlZXQtdmlldycsIC8v5Y+v55So55qEaWNvbnPlj4Lop4HvvJogaHR0cDovL2ZvbnRhd2Vzb21lLmlvL2ljb25zL1xuICAgIC8vICAgICAvL+S4i+WIl+WPguaVsOe7p+aJv+iHqueItuexu1xuICAgIC8vICAgICAvL2ljb25MYWJlbOS4reS4jeiDveWMheWQq2lubmVySFRNTOWxnuaAp++8iOWGhemDqOS8muWIqeeUqGF3ZXNvbWVJY29u6Ieq5Yqo5p6E5bu677yJXG4gICAgLy8gICAgIGljb25MYWJlbDoge1xuICAgIC8vICAgICAgIHN0eWxlOiB7XG4gICAgLy8gICAgICAgICBjb2xvcjogJyNmZmYnIC8v6K6+572u6aKc6ImyXG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9LFxuICAgIC8vICAgICBpY29uU3R5bGU6ICdsaWdodGJsdWUnLCAvL+iuvue9ruWbvuagh+agt+W8j1xuICAgIC8vICAgICAvL+WfuuehgOeahE1hcmtlcuWPguaVsFxuICAgIC8vICAgICBtYXA6IHRoaXMubWFwLFxuICAgIC8vICAgICBwb3NpdGlvbjogdGhpcy5tYXAuZ2V0Q2VudGVyKClcbiAgICAvLyAgIH0pO1xuICAgIC8vICAgLy8g5Yib5bu65LiA5LiqIE1hcmtlciDlrp7kvovvvJpcbiAgICAvLyAgIGxldCBtYXJrZXIgPSBuZXcgQU1hcC5NYXJrZXIoe1xuICAgIC8vICAgICBwb3NpdGlvbjogdGhpcy5tYXAuZ2V0Q2VudGVyKCksICAgLy8g57uP57qs5bqm5a+56LGh77yM5Lmf5Y+v5Lul5piv57uP57qs5bqm5p6E5oiQ55qE5LiA57u05pWw57uEWzExNi4zOSwgMzkuOV1cbiAgICAvLyAgICAgdGl0bGU6ICdDZW50ZXInXG4gICAgLy8gICB9KTtcblxuICAgIC8vICAgLy8g5aSa5Liq54K55a6e5L6L57uE5oiQ55qE5pWw57uEXG4gICAgLy8gICBsZXQgbWFya2VyTGlzdCA9IFttYXJrZXJdO1xuICAgIC8vICAgdGhpcy5tYXAuYWRkKG1hcmtlckxpc3QpO1xuXG4gICAgLy8gICAvL21hcmtlciDngrnlh7vml7bmiZPlvIBcbiAgICAvLyAgIEFNYXAuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCAoKSA9PiB7XG4gICAgLy8gICAgIGxldCBpbmZvV2luZG93ID0gbmV3IFNpbXBsZUluZm9XaW5kb3coe1xuICAgIC8vICAgICAgIGluZm9UaXRsZTogJ+i/memHjOaYr+agh+mimCcsXG4gICAgLy8gICAgICAgaW5mb0JvZHk6ICc8cD7ov5nph4zmmK/lhoXlrrnjgII8L3A+JyxcbiAgICAvLyAgICAgICAvL+WfuueCueaMh+WQkW1hcmtlcueahOWktOmDqOS9jee9rlxuICAgIC8vICAgICAgIG9mZnNldDogbmV3IEFNYXAuUGl4ZWwoMCwgLTIxKVxuICAgIC8vICAgICB9KTtcbiAgICAvLyAgICAgLy/mmL7npLrlnKhtYXDkuIoyXG4gICAgLy8gICAgIGluZm9XaW5kb3cub3Blbih0aGlzLm1hcCwgbWFya2VyLmdldFBvc2l0aW9uKCkpO1xuICAgIC8vICAgfSk7XG5cbiAgICAvLyB9KTtcblxuICAgIC8vIC8v5Yqg6L29UGF0aFNpbXBsaWZpZXLvvIxsb2FkVUnnmoTot6/lvoTlj4LmlbDkuLrmqKHlnZflkI3kuK0gJ3VpLycg5LmL5ZCO55qE6YOo5YiGXG4gICAgLy8gQU1hcFVJLmxvYWQoWyd1aS9taXNjL1BhdGhTaW1wbGlmaWVyJ10sIChQYXRoU2ltcGxpZmllcikgPT4ge1xuICAgIC8vICAgaWYgKCFQYXRoU2ltcGxpZmllci5zdXBwb3J0Q2FudmFzKSB7XG4gICAgLy8gICAgIGFsZXJ0KCflvZPliY3njq/looPkuI3mlK/mjIEgQ2FudmFz77yBJyk7XG4gICAgLy8gICAgIHJldHVybjtcbiAgICAvLyAgIH1cbiAgICAvLyAgIC8v5ZCv5Yqo6aG16Z2iXG4gICAgLy8gICAgdGhpcy5pbml0Um91dGUoUGF0aFNpbXBsaWZpZXIpO1xuICAgIC8vIH0pO1xuICAgIC8vI2VuZHJlZ2lvblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5kcmF3TWFya2Vycyh0aGlzLm1hcmtlcnMpO1xuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgLy8g5a6e5L6L5YyW54K55qCH6K6wXG4gIHByaXZhdGUgYWRkTWFya2VyKHBvaW50TGlzdDogQXJyYXk8bnVtYmVyPiwgaW1nOiBzdHJpbmcpIHtcbiAgICBjb25zdCBtYXJrZXIgPSBuZXcgQU1hcC5NYXJrZXIoe1xuICAgICAgcG9zaXRpb246IHBvaW50TGlzdCxcbiAgICAgIG1hcDogdGhpcy5tYXAsXG4gICAgICAvLyB0aXRsZTpcImRkZFwiLFxuICAgICAgb2Zmc2V0OiBuZXcgQU1hcC5QaXhlbCgtMTMsIC0zMClcbiAgICB9KTtcbiAgICAvLyBtYXJrZXIuc2V0TWFwKHRoaXMubWFwKTtcbiAgICAvLyDnvKnmlL7lnLDlm77liLDlkIjpgILnmoTop4bph47nuqfliKtcbiAgICB0aGlzLm1hcC5zZXRGaXRWaWV3KG51bGwsIGZhbHNlKTtcbiAgfVxuXG4gIGRyYXdNYXJrZXJzKG1hcmtlcnM6IE1hcmtlcltdKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG1hcmtlcnMpKSByZXR1cm47XG4gICAgbWFya2Vycy5maWx0ZXIobyA9PiBvLnBvaW50Lmxlbmd0aCkuZm9yRWFjaChtYXJrZXIgPT4ge1xuICAgICAgdGhpcy5hZGRNYXJrZXIobWFya2VyLnBvaW50LCAnJyk7XG4gICAgfSlcbiAgfVxuICAvL+eUu+Wbvuagh1xuICBwcml2YXRlIGRyYXdJY29ucyhpY29ucyA9IHRoaXMuX2ljb25zKSB7XG4gICAgaWNvbnMuZm9yRWFjaChpID0+IHRoaXMuZHJhd0ljb24oaSkpO1xuICB9XG4gIHByaXZhdGUgZHJhd0ljb24oZWxlbWVudCkge1xuICAgICAgY29uc3QgcG9pbnRMaXN0ID0gZWxlbWVudC5wb2ludDtcbiAgICAgIGNvbnN0IGljb24gPSBlbGVtZW50Lmljb247XG4gICAgICBjb25zdCBzaG93SW5mbyA9IGVsZW1lbnQudGVtcGxhdGU7XG4gICAgICBjb25zdCBpbWcgPSBlbGVtZW50LmltZztcbiAgICAgIEFNYXBVSS5sb2FkVUkoWydvdmVybGF5L1NpbXBsZU1hcmtlcicsICdvdmVybGF5L1NpbXBsZUluZm9XaW5kb3cnXSwgKFNpbXBsZU1hcmtlciwgU2ltcGxlSW5mb1dpbmRvdykgPT4ge1xuICAgICAgICBsZXQgaW1nSW5mbyA9IHtcbiAgICAgICAgICBzcmM6IGltZyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgd2lkdGg6ICczMHB4JyxcbiAgICAgICAgICAgIGhlaWdodDogJzMwcHgnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgY29uc3Qgc2ltcGxlTWFya2VyID0gbmV3IFNpbXBsZU1hcmtlcih7XG4gICAgICAgICAgICBpY29uTGFiZWw6ICcnLFxuICAgICAgICAgICAgaWNvblN0eWxlOiBpY29uID8gJzxzcGFuIGNsYXNzPVwiaWNvbmZvbnQgYW1hcGljb24gJyArIGljb24gKyAnXCIgPjwvc3Bhbj4nIDogaW1nSW5mbyxcbiAgICAgICAgICAgIC8v6K6+572u5Z+654K55YGP56e7XG4gICAgICAgICAgICBvZmZzZXQ6IG5ldyBBTWFwLlBpeGVsKC0xNSwgLTE1KSxcbiAgICAgICAgICAgIG1hcDogdGhpcy5tYXAsXG4gICAgICAgICAgICBzaG93UG9zaXRpb25Qb2ludDogdHJ1ZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBwb2ludExpc3QsXG4gICAgICAgICAgICB6SW5kZXg6IDEwMFxuICAgICAgICAgIH0pO1xuICAgICAgICBzaW1wbGVNYXJrZXIub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaWNvbkNsaWNrLmVtaXQoZWxlbWVudC5kYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLy8g57yp5pS+5Zyw5Zu+5Yiw5ZCI6YCC55qE6KeG6YeO57qn5YirXG4gICAgICAgIHRoaXMubWFwLnNldEZpdFZpZXcoKTtcblxuICAgICAgICBpZiAoc2hvd0luZm8pIHtcbiAgICAgICAgICBjb25zdCBpbmZvV2luZG93ID0gbmV3IFNpbXBsZUluZm9XaW5kb3coe1xuICAgICAgICAgICAgaW5mb1RpdGxlOiBcIjxzdHJvbmc+XCIgKyBzaG93SW5mby50aXRsZSArIFwiPC9zdHJvbmc+XCIsXG4gICAgICAgICAgICBpbmZvQm9keTogc2hvd0luZm8uYm9keVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8v5pi+56S65ZyobWFw5LiKXG4gICAgICAgICAgLy8gaW5mb1dpbmRvdy5vcGVuKHRoaXMubWFwLCBwb2ludExpc3QpO1xuICAgICAgICAgIC8vbWFya2VyIOeCueWHu+aXtuaJk+W8gFxuICAgICAgICAgIEFNYXAuZXZlbnQuYWRkTGlzdGVuZXIoc2ltcGxlTWFya2VyLCAnbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgaW5mb1dpbmRvdy5vcGVuKHRoaXMubWFwLCBwb2ludExpc3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIEFNYXAuZXZlbnQuYWRkTGlzdGVuZXIoc2ltcGxlTWFya2VyLCAnbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpbmZvV2luZG93LmNsb3NlKClcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvL+eUu+e6v1xuICBwcml2YXRlIGRyYXdMaW5lKGxpbmVzOiBMaW5lcywgb3B0aW9ucyA9IHt9KSB7XG4gICAgLy8jcmVnaW9uXG4gICAgLy/mtYvor5XkvKDlj4JcbiAgICAvLyNlbmRyZWdpb25cbiAgICBsaW5lcy5mb3JFYWNoKHBvaW50TGlzdCA9PiB7XG4gICAgICBjb25zdCBwb2x5bGluZSA9IG5ldyBBTWFwLlBvbHlsaW5lKHtcbiAgICAgICAgcGF0aDogcG9pbnRMaXN0LFxuICAgICAgICBpc091dGxpbmU6IHRydWUsXG4gICAgICAgIG91dGxpbmVDb2xvcjogJyNmZmVlZmYnLFxuICAgICAgICBib3JkZXJXZWlnaHQ6IDIsXG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiMzMzY2RkZcIixcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogMSxcbiAgICAgICAgc3Ryb2tlV2VpZ2h0OiA0LFxuICAgICAgICAvLyDmipjnur/moLflvI/ov5jmlK/mjIEgJ2Rhc2hlZCdcbiAgICAgICAgc3Ryb2tlU3R5bGU6IFwic29saWRcIixcbiAgICAgICAgLy8gc3Ryb2tlU3R5bGXmmK9kYXNoZWTml7bmnInmlYhcbiAgICAgICAgc3Ryb2tlRGFzaGFycmF5OiBbMTAsIDE1XSxcbiAgICAgICAgbGluZUpvaW46ICdyb3VuZCcsXG4gICAgICAgIGxpbmVDYXA6ICdyb3VuZCcsXG4gICAgICAgIHpJbmRleDogNTAsXG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICB9KVxuICAgICAgcG9seWxpbmUuc2V0TWFwKHRoaXMubWFwKTtcbiAgICAgIC8vIOe8qeaUvuWcsOWbvuWIsOWQiOmAgueahOinhumHjue6p+WIq1xuICAgICAgdGhpcy5tYXAuc2V0Rml0VmlldyhbcG9seWxpbmVdKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RE9NRnJvbUNvbXBvbmVudChjb21wb25lbnQsIGRhdGEpOiBOb2RlIHtcbiAgICBjb25zdCBpY29uID0gdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XG4gICAgKGljb24gYXMgYW55KS5kYXRhID0gZGF0YTtcbiAgICB0aGlzLnRlbXBsYXRlQ29tcGlsZS5jbGVhcigpO1xuICAgIGNvbnN0IHZpZXcgPSB0aGlzLnRlbXBsYXRlQ29tcGlsZS5jcmVhdGVDb21wb25lbnQoaWNvbik7XG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgfSk7XG4gICAgY29uc3QgZWwgPSAoKHZpZXcubG9jYXRpb24ubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2hpbGROb2RlcyBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PilbMF0uY2xvbmVOb2RlKHRydWUpO1xuICAgIHRoaXMudGVtcGxhdGVDb21waWxlLmNsZWFyKCk7XG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7IH0pO1xuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIGluaXRSb3V0ZShQYXRoU2ltcGxpZmllcikge1xuICAgIC8v5Yib5bu657uE5Lu25a6e5L6LXG4gICAgbGV0IHBhdGhTaW1wbGlmaWVySW5zID0gbmV3IFBhdGhTaW1wbGlmaWVyKHtcbiAgICAgIHpJbmRleDogMTAwLFxuICAgICAgbWFwOiB0aGlzLm1hcCwgLy/miYDlsZ7nmoTlnLDlm77lrp7kvotcbiAgICAgIGdldFBhdGg6IChwYXRoRGF0YSwgcGF0aEluZGV4KSA9PiB7XG4gICAgICAgIC8v6L+U5Zue6L2o6L+55pWw5o2u5Lit55qE6IqC54K55Z2Q5qCH5L+h5oGv77yMW0FNYXAuTG5nTGF0LCBBTWFwLkxuZ0xhdC4uLl0g5oiW6ICFIFtbbG5nfG51bWJlcixsYXR8bnVtYmVyXSwuLi5dXG4gICAgICAgIHJldHVybiBwYXRoRGF0YS5wYXRoO1xuICAgICAgfSxcbiAgICAgIGdldEhvdmVyVGl0bGU6IChwYXRoRGF0YSwgcGF0aEluZGV4LCBwb2ludEluZGV4KSA9PiB7XG4gICAgICAgIC8v6L+U5Zue6byg5qCH5oKs5YGc5pe25pi+56S655qE5L+h5oGvXG4gICAgICAgIGlmIChwb2ludEluZGV4ID49IDApIHtcbiAgICAgICAgICAvL+m8oOagh+aCrOWBnOWcqOafkOS4qui9qOi/ueiKgueCueS4ilxuICAgICAgICAgIHJldHVybiBwYXRoRGF0YS5uYW1lICsgJ++8jOeCuTonICsgcG9pbnRJbmRleCArICcvJyArIHBhdGhEYXRhLnBhdGgubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIC8v6byg5qCH5oKs5YGc5Zyo6IqC54K55LmL6Ze055qE6L+e57q/5LiKXG4gICAgICAgIHJldHVybiBwYXRoRGF0YS5uYW1lICsgJ++8jOeCueaVsOmHjycgKyBwYXRoRGF0YS5wYXRoLmxlbmd0aDtcbiAgICAgIH0sXG4gICAgICByZW5kZXJPcHRpb25zOiB7XG4gICAgICAgIC8v6L2o6L+557q/55qE5qC35byPXG4gICAgICAgIHBhdGhMaW5lU3R5bGU6IHtcbiAgICAgICAgICBzdHJva2VTdHlsZTogJ3JlZCcsXG4gICAgICAgICAgbGluZVdpZHRoOiA2LFxuICAgICAgICAgIGRpckFycm93U3R5bGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy/ov5nph4zmnoTlu7rkuKTmnaHnroDljZXnmoTovajov7nvvIzku4XkvZznpLrkvotcbiAgICBwYXRoU2ltcGxpZmllcklucy5zZXREYXRhKFt7XG4gICAgICBuYW1lOiAn6L2o6L+5MCcsXG4gICAgICBwYXRoOiBbXG4gICAgICAgIFsxMDAuMzQwNDE3LCAyNy4zNzY5OTRdLFxuICAgICAgICBbMTA4LjQyNjM1NCwgMzcuODI3NDUyXSxcbiAgICAgICAgWzExMy4zOTIxNzQsIDMxLjIwODQzOV0sXG4gICAgICAgIFsxMjQuOTA1ODQ2LCA0Mi4yMzI4NzZdXG4gICAgICBdXG4gICAgfSwge1xuICAgICAgbmFtZTogJ+Wkp+WcsOe6vycsXG4gICAgICAvL+WIm+W7uuS4gOadoeWMheaLrDUwMOS4quaPkuWAvOeCueeahOWkp+WcsOe6v1xuICAgICAgcGF0aDogUGF0aFNpbXBsaWZpZXIuZ2V0R2VvZGVzaWNQYXRoKFsxMTYuNDA1Mjg5LCAzOS45MDQ5ODddLCBbODcuNjE3OTIsIDQzLjc5MzMwOF0sIDUwMClcbiAgICB9XSk7XG5cbiAgICAvL+WIm+W7uuS4gOS4quW3oeiIquWZqFxuICAgIGxldCBuYXZnMCA9IHBhdGhTaW1wbGlmaWVySW5zLmNyZWF0ZVBhdGhOYXZpZ2F0b3IoMC4yLCAvL+WFs+iBlOesrDHmnaHovajov7lcbiAgICAgIHtcbiAgICAgICAgbG9vcDogdHJ1ZSwgLy/lvqrnjq/mkq3mlL5cbiAgICAgICAgc3BlZWQ6IDEwMDAwMFxuICAgICAgfSk7XG4gICAgbmF2ZzAuc3RhcnQoKTtcbiAgfVxuXG4gIGdldEFkZHJlc3NQb2ludEFuZERyYXcoKSB7XG4gICAgdGhpcy5hbWFwU2VydmljZS5nZXRNYXJrZXJCeUxvY2F0aW9uTGlzdCh0aGlzLmxvY2F0aW9uTGlzdClcbiAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMuZHJhd0ljb25zKGRhdGEpO1xuICAgICAgfSlcbiAgfVxufVxuXG5jbGFzcyBHdWlkIHtcbiAgc3RhdGljIG5ld0d1aWQoKSB7XG4gICAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24gKGMpIHtcbiAgICAgIGxldCByID0gTWF0aC5yYW5kb20oKSAqIDE2IHwgMCxcbiAgICAgICAgdiA9IGMgPT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KTtcbiAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcbiAgICB9KTtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIHNob3dUZW1wbGF0ZSB7XG5cbiAgdGl0bGU/OiBzdHJpbmc7XG4gIGJvZHk/OiBFbGVtZW50UmVmPGFueT4gfCBzdHJpbmc7XG59XG4iXX0=