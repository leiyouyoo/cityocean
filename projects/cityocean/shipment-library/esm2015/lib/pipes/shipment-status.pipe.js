/**
 * @fileoverview added by tsickle
 * Generated from: lib/pipes/shipment-status.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { ShipmentStatusEnum } from '../entities/shipmentStatus';
export class ShipmentStatusPipe {
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    transform(value, ...args) {
        switch (value) {
            case ShipmentStatusEnum.SellerLocation:
                return `Seller 's Location / Booked`;
            case ShipmentStatusEnum.InTransitToDeparturePort:
                return `In Transit to Departure Port`;
            case ShipmentStatusEnum.DeparturePort:
                return `Departure Port`;
            case ShipmentStatusEnum.InTransitToArrivalPort:
                return `In Transit to Arrival Port`;
            case ShipmentStatusEnum.ArrivalPort:
                return `Arrival  port`;
            case ShipmentStatusEnum.InTransitToFinalDestination:
                return `In Transit to Final Destination`;
            case ShipmentStatusEnum.FinalDestination:
                return `Final destination`;
            default:
                return '';
        }
    }
}
ShipmentStatusPipe.decorators = [
    { type: Pipe, args: [{
                name: 'shipmentStatus'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcG1lbnQtc3RhdHVzLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2l0eW9jZWFuL3NoaXBtZW50LWxpYnJhcnkvIiwic291cmNlcyI6WyJsaWIvcGlwZXMvc2hpcG1lbnQtc3RhdHVzLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUtoRSxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7SUFFN0IsU0FBUyxDQUFDLEtBQXlCLEVBQUUsR0FBRyxJQUFXO1FBQ2pELFFBQVEsS0FBSyxFQUFFO1lBQ2IsS0FBSyxrQkFBa0IsQ0FBQyxjQUFjO2dCQUNwQyxPQUFPLDZCQUE2QixDQUFDO1lBQ3ZDLEtBQUssa0JBQWtCLENBQUMsd0JBQXdCO2dCQUM5QyxPQUFPLDhCQUE4QixDQUFDO1lBQ3hDLEtBQUssa0JBQWtCLENBQUMsYUFBYTtnQkFDbkMsT0FBTyxnQkFBZ0IsQ0FBQztZQUMxQixLQUFLLGtCQUFrQixDQUFDLHNCQUFzQjtnQkFDNUMsT0FBTyw0QkFBNEIsQ0FBQztZQUN0QyxLQUFLLGtCQUFrQixDQUFDLFdBQVc7Z0JBQ2pDLE9BQU8sZUFBZSxDQUFDO1lBQ3pCLEtBQUssa0JBQWtCLENBQUMsMkJBQTJCO2dCQUNqRCxPQUFPLGlDQUFpQyxDQUFDO1lBQzNDLEtBQUssa0JBQWtCLENBQUMsZ0JBQWdCO2dCQUN0QyxPQUFPLG1CQUFtQixDQUFDO1lBQzdCO2dCQUNFLE9BQU8sRUFBRSxDQUFDO1NBQ2I7SUFDSCxDQUFDOzs7WUF4QkYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxnQkFBZ0I7YUFDdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaGlwbWVudFN0YXR1c0VudW0gfSBmcm9tICcuLi9lbnRpdGllcy9zaGlwbWVudFN0YXR1cyc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3NoaXBtZW50U3RhdHVzJ1xufSlcbmV4cG9ydCBjbGFzcyBTaGlwbWVudFN0YXR1c1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICB0cmFuc2Zvcm0odmFsdWU6IFNoaXBtZW50U3RhdHVzRW51bSwgLi4uYXJnczogYW55W10pOiBhbnkge1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIGNhc2UgU2hpcG1lbnRTdGF0dXNFbnVtLlNlbGxlckxvY2F0aW9uOlxuICAgICAgICByZXR1cm4gYFNlbGxlciAncyBMb2NhdGlvbiAvIEJvb2tlZGA7XG4gICAgICBjYXNlIFNoaXBtZW50U3RhdHVzRW51bS5JblRyYW5zaXRUb0RlcGFydHVyZVBvcnQ6XG4gICAgICAgIHJldHVybiBgSW4gVHJhbnNpdCB0byBEZXBhcnR1cmUgUG9ydGA7XG4gICAgICBjYXNlIFNoaXBtZW50U3RhdHVzRW51bS5EZXBhcnR1cmVQb3J0OlxuICAgICAgICByZXR1cm4gYERlcGFydHVyZSBQb3J0YDtcbiAgICAgIGNhc2UgU2hpcG1lbnRTdGF0dXNFbnVtLkluVHJhbnNpdFRvQXJyaXZhbFBvcnQ6XG4gICAgICAgIHJldHVybiBgSW4gVHJhbnNpdCB0byBBcnJpdmFsIFBvcnRgO1xuICAgICAgY2FzZSBTaGlwbWVudFN0YXR1c0VudW0uQXJyaXZhbFBvcnQ6XG4gICAgICAgIHJldHVybiBgQXJyaXZhbCAgcG9ydGA7XG4gICAgICBjYXNlIFNoaXBtZW50U3RhdHVzRW51bS5JblRyYW5zaXRUb0ZpbmFsRGVzdGluYXRpb246XG4gICAgICAgIHJldHVybiBgSW4gVHJhbnNpdCB0byBGaW5hbCBEZXN0aW5hdGlvbmA7XG4gICAgICBjYXNlIFNoaXBtZW50U3RhdHVzRW51bS5GaW5hbERlc3RpbmF0aW9uOlxuICAgICAgICByZXR1cm4gYEZpbmFsIGRlc3RpbmF0aW9uYDtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxufVxuIl19