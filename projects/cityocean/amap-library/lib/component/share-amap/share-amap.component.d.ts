import { OnInit, ElementRef, Renderer2, EventEmitter, NgZone, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { AmapHttpService } from '../../services/amap-http.service';
import { AmapService } from '../../services/amap.service';
interface Marker {
    img?: string;
    point: Array<any>;
}
declare type Lines = [number, number][][];
interface Icon {
    img?: string;
    icon?: string;
    point: Array<any>;
    template?: {
        title?: string;
        body?: string;
    };
    data?: any;
}
export declare class ShareAmapComponent implements OnInit {
    private renderer;
    private el;
    private zone;
    private _componentFactoryResolver;
    private http;
    private amapHttpService;
    private amapService;
    height: number;
    width?: number;
    private _markers;
    markers: Marker[];
    markerClick: EventEmitter<any>;
    private _icons;
    icons: Icon[];
    iconClick: EventEmitter<any>;
    private _lines;
    lines: Lines;
    private _dashedLines;
    dashedLines: Lines;
    private _locationList;
    locationList: any[];
    ceshiMap: ElementRef<any>;
    private _showTemplate;
    setTemplate: any;
    mapUi: ElementRef;
    private map;
    templateCompile: ViewContainerRef;
    constructor(renderer: Renderer2, el: ElementRef, zone: NgZone, _componentFactoryResolver: ComponentFactoryResolver, http: HttpService, amapHttpService: AmapHttpService, amapService: AmapService);
    ngOnInit(): void;
    private addMarker;
    drawMarkers(markers: Marker[]): void;
    private drawIcons;
    private drawIcon;
    private drawLine;
    private getDOMFromComponent;
    initRoute(PathSimplifier: any): void;
    getAddressPointAndDraw(): void;
}
export declare class showTemplate {
    title?: string;
    body?: ElementRef<any> | string;
}
export {};
