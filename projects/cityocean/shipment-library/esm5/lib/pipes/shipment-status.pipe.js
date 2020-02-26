/**
 * @fileoverview added by tsickle
 * Generated from: lib/pipes/shipment-status.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { ShipmentStatusEnum } from '../entities/shipmentStatus';
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
        { type: Pipe, args: [{
                    name: 'shipmentStatus'
                },] }
    ];
    return ShipmentStatusPipe;
}());
export { ShipmentStatusPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcG1lbnQtc3RhdHVzLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2l0eW9jZWFuL3NoaXBtZW50LWxpYnJhcnkvIiwic291cmNlcyI6WyJsaWIvcGlwZXMvc2hpcG1lbnQtc3RhdHVzLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVoRTtJQUFBO0lBMEJBLENBQUM7Ozs7OztJQXJCQyxzQ0FBUzs7Ozs7SUFBVCxVQUFVLEtBQXlCO1FBQUUsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCw2QkFBYzs7UUFDakQsUUFBUSxLQUFLLEVBQUU7WUFDYixLQUFLLGtCQUFrQixDQUFDLGNBQWM7Z0JBQ3BDLE9BQU8sNkJBQTZCLENBQUM7WUFDdkMsS0FBSyxrQkFBa0IsQ0FBQyx3QkFBd0I7Z0JBQzlDLE9BQU8sOEJBQThCLENBQUM7WUFDeEMsS0FBSyxrQkFBa0IsQ0FBQyxhQUFhO2dCQUNuQyxPQUFPLGdCQUFnQixDQUFDO1lBQzFCLEtBQUssa0JBQWtCLENBQUMsc0JBQXNCO2dCQUM1QyxPQUFPLDRCQUE0QixDQUFDO1lBQ3RDLEtBQUssa0JBQWtCLENBQUMsV0FBVztnQkFDakMsT0FBTyxlQUFlLENBQUM7WUFDekIsS0FBSyxrQkFBa0IsQ0FBQywyQkFBMkI7Z0JBQ2pELE9BQU8saUNBQWlDLENBQUM7WUFDM0MsS0FBSyxrQkFBa0IsQ0FBQyxnQkFBZ0I7Z0JBQ3RDLE9BQU8sbUJBQW1CLENBQUM7WUFDN0I7Z0JBQ0UsT0FBTyxFQUFFLENBQUM7U0FDYjtJQUNILENBQUM7O2dCQXhCRixJQUFJLFNBQUM7b0JBQ0osSUFBSSxFQUFFLGdCQUFnQjtpQkFDdkI7O0lBd0JELHlCQUFDO0NBQUEsQUExQkQsSUEwQkM7U0F2Qlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2hpcG1lbnRTdGF0dXNFbnVtIH0gZnJvbSAnLi4vZW50aXRpZXMvc2hpcG1lbnRTdGF0dXMnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdzaGlwbWVudFN0YXR1cydcbn0pXG5leHBvcnQgY2xhc3MgU2hpcG1lbnRTdGF0dXNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgdHJhbnNmb3JtKHZhbHVlOiBTaGlwbWVudFN0YXR1c0VudW0sIC4uLmFyZ3M6IGFueVtdKTogYW55IHtcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICBjYXNlIFNoaXBtZW50U3RhdHVzRW51bS5TZWxsZXJMb2NhdGlvbjpcbiAgICAgICAgcmV0dXJuIGBTZWxsZXIgJ3MgTG9jYXRpb24gLyBCb29rZWRgO1xuICAgICAgY2FzZSBTaGlwbWVudFN0YXR1c0VudW0uSW5UcmFuc2l0VG9EZXBhcnR1cmVQb3J0OlxuICAgICAgICByZXR1cm4gYEluIFRyYW5zaXQgdG8gRGVwYXJ0dXJlIFBvcnRgO1xuICAgICAgY2FzZSBTaGlwbWVudFN0YXR1c0VudW0uRGVwYXJ0dXJlUG9ydDpcbiAgICAgICAgcmV0dXJuIGBEZXBhcnR1cmUgUG9ydGA7XG4gICAgICBjYXNlIFNoaXBtZW50U3RhdHVzRW51bS5JblRyYW5zaXRUb0Fycml2YWxQb3J0OlxuICAgICAgICByZXR1cm4gYEluIFRyYW5zaXQgdG8gQXJyaXZhbCBQb3J0YDtcbiAgICAgIGNhc2UgU2hpcG1lbnRTdGF0dXNFbnVtLkFycml2YWxQb3J0OlxuICAgICAgICByZXR1cm4gYEFycml2YWwgIHBvcnRgO1xuICAgICAgY2FzZSBTaGlwbWVudFN0YXR1c0VudW0uSW5UcmFuc2l0VG9GaW5hbERlc3RpbmF0aW9uOlxuICAgICAgICByZXR1cm4gYEluIFRyYW5zaXQgdG8gRmluYWwgRGVzdGluYXRpb25gO1xuICAgICAgY2FzZSBTaGlwbWVudFN0YXR1c0VudW0uRmluYWxEZXN0aW5hdGlvbjpcbiAgICAgICAgcmV0dXJuIGBGaW5hbCBkZXN0aW5hdGlvbmA7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==