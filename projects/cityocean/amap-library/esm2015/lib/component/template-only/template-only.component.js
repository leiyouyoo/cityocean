/**
 * @fileoverview added by tsickle
 * Generated from: lib/component/template-only/template-only.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewChild } from '@angular/core';
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
export class TemplateOnlyComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtb25seS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2l0eW9jZWFuL2FtYXAtbGlicmFyeS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvdGVtcGxhdGUtb25seS90ZW1wbGF0ZS1vbmx5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFVLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7TUFFbkUsY0FBYyxHQUFHO0lBQ3JCLENBQUMsRUFBRSw4QkFBOEI7SUFDakMsQ0FBQyxFQUFFLDhCQUE4QjtJQUNqQyxDQUFDLEVBQUUsOEJBQThCO0lBQ2pDLENBQUMsRUFBRSxnQkFBZ0I7SUFDbkIsQ0FBQyxFQUFFLDRCQUE0QjtJQUMvQixDQUFDLEVBQUUsZUFBZTtJQUNsQixDQUFDLEVBQUUsaUNBQWlDO0lBQ3BDLENBQUMsRUFBRSxtQkFBbUI7SUFDdEIsQ0FBQyxFQUFFLG1CQUFtQjtDQUN2QjtBQU9ELE1BQU0sT0FBTyxxQkFBcUI7SUFLaEM7UUFIUyxtQkFBYyxHQUFHLGNBQWMsQ0FBQztRQUN6QyxpQkFBWSxHQUFRLEVBQUUsQ0FBQztJQUVQLENBQUM7Ozs7SUFFakIsUUFBUTtJQUNSLENBQUM7OztZQWJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixpTEFBNkM7O2FBRTlDOzs7Ozt5QkFFRSxTQUFTLFNBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7OztJQUF2QywyQ0FBZ0U7O0lBQ2hFLCtDQUF5Qzs7SUFDekMsNkNBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBzaGlwbWVudFN0YXR1cyA9IHtcbiAgMDogJ1NlbGxlciBcXCdzIExvY2F0aW9uIC8gQm9va2VkJyxcbiAgMTogJ0luIFRyYW5zaXQgdG8gRGVwYXJ0dXJlIFBvcnQnLFxuICAyOiAnSW4gVHJhbnNpdCB0byBEZXBhcnR1cmUgUG9ydCcsXG4gIDM6ICdEZXBhcnR1cmUgUG9ydCcsXG4gIDQ6ICdJbiBUcmFuc2l0IHRvIEFycml2YWwgUG9ydCcsXG4gIDU6ICdBcnJpdmFsICBwb3J0JyxcbiAgNjogJ0luIFRyYW5zaXQgdG8gRmluYWwgRGVzdGluYXRpb24nLFxuICA3OiAnRmluYWwgZGVzdGluYXRpb24nLFxuICA4OiAnRmluYWwgZGVzdGluYXRpb24nLFxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItdGVtcGxhdGUtb25seScsXG4gIHRlbXBsYXRlVXJsOiAnLi90ZW1wbGF0ZS1vbmx5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGVtcGxhdGUtb25seS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVPbmx5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgnc2hpcG1lbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzaGlwbWVudEVsOiBFbGVtZW50UmVmO1xuICByZWFkb25seSBzaGlwbWVudFN0YXR1cyA9IHNoaXBtZW50U3RhdHVzO1xuICBzaGlwbWVudERhdGE6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIl19