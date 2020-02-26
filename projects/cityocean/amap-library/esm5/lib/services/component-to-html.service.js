/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/component-to-html.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { TemplateOnlyComponent } from '../component/template-only/template-only.component';
import * as i0 from "@angular/core";
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ComponentToHtmlService.ctorParameters = function () { return [
        { type: ApplicationRef },
        { type: ComponentFactoryResolver },
        { type: Injector }
    ]; };
    /** @nocollapse */ ComponentToHtmlService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ComponentToHtmlService_Factory() { return new ComponentToHtmlService(i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.INJECTOR)); }, token: ComponentToHtmlService, providedIn: "root" });
    return ComponentToHtmlService;
}());
export { ComponentToHtmlService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXRvLWh0bWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjaXR5b2NlYW4vYW1hcC1saWJyYXJ5LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbXBvbmVudC10by1odG1sLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLHdCQUF3QixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0YsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7O0FBRTNGO0lBS0UsZ0NBQW9CLGNBQThCLEVBQzlCLHdCQUFrRCxFQUNsRCxRQUFrQjtRQUZsQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBRXRDLENBQUM7Ozs7O0lBRUQsb0RBQW1COzs7O0lBQW5CLFVBQW9CLElBQUk7O1lBQ2hCLE9BQU8sR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMscUJBQXFCLENBQUM7O1lBQ3RGLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDbEQsWUFBWSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQzFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNyRCxZQUFZLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDOUMsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVTtZQUN0QixJQUFJLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVM7U0FDL0QsQ0FBQztJQUNKLENBQUM7O2dCQXJCRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQUxRLGNBQWM7Z0JBQUUsd0JBQXdCO2dCQUFjLFFBQVE7OztpQ0FBdkU7Q0F5QkMsQUF0QkQsSUFzQkM7U0FuQlksc0JBQXNCOzs7Ozs7SUFFckIsZ0RBQXNDOzs7OztJQUN0QywwREFBMEQ7Ozs7O0lBQzFELDBDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUZW1wbGF0ZU9ubHlDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnQvdGVtcGxhdGUtb25seS90ZW1wbGF0ZS1vbmx5LmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvbmVudFRvSHRtbFNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgKSB7XG4gIH1cblxuICBnZXRTaGlwbWVudFRlbXBsYXRlKGRhdGEpIHtcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoVGVtcGxhdGVPbmx5Q29tcG9uZW50KTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSBmYWN0b3J5LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcbiAgICBjb21wb25lbnRSZWYuaW5zdGFuY2Uuc2hpcG1lbnREYXRhID0gZGF0YTtcbiAgICB0aGlzLmFwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KVxuICAgIGNvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IGRhdGEuc2hpcG1lbnRObyxcbiAgICAgIGJvZHk6IGNvbXBvbmVudFJlZi5pbnN0YW5jZS5zaGlwbWVudEVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MXG4gICAgfTtcbiAgfVxufVxuIl19