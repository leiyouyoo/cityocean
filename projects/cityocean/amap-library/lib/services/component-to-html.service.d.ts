import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
export declare class ComponentToHtmlService {
    private applicationRef;
    private componentFactoryResolver;
    private injector;
    constructor(applicationRef: ApplicationRef, componentFactoryResolver: ComponentFactoryResolver, injector: Injector);
    getShipmentTemplate(data: any): {
        title: any;
        body: any;
    };
}
