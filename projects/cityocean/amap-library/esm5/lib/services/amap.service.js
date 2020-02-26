/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/amap.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AmapHttpService } from './amap-http.service';
import * as i0 from "@angular/core";
import * as i1 from "./amap-http.service";
/**
 * @record
 */
export function GeoResult() { }
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
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            forkJoin(addressList.map((/**
             * @param {?} address
             * @return {?}
             */
            function (address) {
                return new Observable((/**
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
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            forkJoin(locationList.map((/**
             * @param {?} location
             * @return {?}
             */
            function (location) {
                return _this.googleGeo(location.streetAddress)
                    .pipe(catchError((/**
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
        return new Observable((/**
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AmapService.ctorParameters = function () { return [
        { type: AmapHttpService }
    ]; };
    /** @nocollapse */ AmapService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AmapService_Factory() { return new AmapService(i0.ɵɵinject(i1.AmapHttpService)); }, token: AmapService, providedIn: "root" });
    return AmapService;
}());
export { AmapService };
if (false) {
    /** @type {?} */
    AmapService.prototype.googleKey;
    /**
     * @type {?}
     * @private
     */
    AmapService.prototype.amapHttp;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW1hcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNpdHlvY2Vhbi9hbWFwLWxpYnJhcnkvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYW1hcC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1QyxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFHdEQsK0JBTUM7OztJQUxDLHVDQUF1Qzs7SUFDdkMsc0NBQTJCOztJQUMzQiw2QkFBNkI7O0lBQzdCLDZCQUEyQjs7SUFDM0IsMEJBQTZCOzs7OztBQUcvQiwrQkFJQzs7O0lBSEMscUNBQW1COztJQUNuQixzQ0FBbUI7O0lBQ25CLGlDQUFxQjs7Ozs7QUFHdkIsdUJBS0M7OztJQUpDLDBCQUFzQjs7SUFDdEIsNEJBQXdCOztJQUN4QixpQ0FBc0I7O0lBQ3RCLDRCQUFzQjs7Ozs7QUFHeEIscUJBR0M7OztJQUZDLDJCQUFvQjs7SUFDcEIsMkJBQW9COzs7OztBQUd0Qix1QkFHQzs7O0lBRkMsdUJBQVk7O0lBQ1osdUJBQVk7Ozs7O0FBR2QsOEJBT0M7OztJQU5DLHdDQUFzQjs7SUFDdEIscUNBQW9COztJQUNwQixtQ0FBa0I7O0lBQ2xCLGtDQUFpQjs7SUFDakIsK0JBQWM7OztBQUloQjtJQUtFLHFCQUFvQixRQUF5QjtRQUF6QixhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUQ3QyxjQUFTLEdBQUcseUNBQXlDLENBQUM7SUFFdEMsQ0FBQzs7Ozs7O0lBQ2pCLGdEQUEwQjs7Ozs7SUFBMUIsVUFBMkIsV0FBcUIsRUFBRSxJQUFLOztZQUMvQyxNQUFNLEdBQVEsRUFBRTtRQUN0QixJQUFJLElBQUk7WUFB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QkFDdkI7WUFDSCxDQUFDOzs7O1lBQUUsVUFBQSxLQUFLO2dCQUNOLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsQ0FBQyxFQUFDLENBQUE7UUFDTixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7O2dCQTNHRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQTdDUSxlQUFlOzs7c0JBSHhCO0NBMEpDLEFBNUdELElBNEdDO1NBekdZLFdBQVc7OztJQUN0QixnQ0FBc0Q7Ozs7O0lBQzFDLCtCQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZvcmtKb2luLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHNraXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBbWFwSHR0cFNlcnZpY2UgfSBmcm9tICcuL2FtYXAtaHR0cC5zZXJ2aWNlJztcbmRlY2xhcmUgbGV0IEFNYXA6IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBHZW9SZXN1bHQge1xuICBhZGRyZXNzX2NvbXBvbmVudHM6IEFkZHJlc3NDb21wb25lbnRbXTtcbiAgZm9ybWF0dGVkX2FkZHJlc3M6ICBzdHJpbmc7XG4gIGdlb21ldHJ5OiAgICAgICAgICAgR2VvbWV0cnk7XG4gIHBsYWNlX2lkOiAgICAgICAgICAgc3RyaW5nO1xuICB0eXBlczogICAgICAgICAgICAgIHN0cmluZ1tdO1xufVxuXG5pbnRlcmZhY2UgQWRkcmVzc0NvbXBvbmVudCB7XG4gIGxvbmdfbmFtZTogIHN0cmluZztcbiAgc2hvcnRfbmFtZTogc3RyaW5nO1xuICB0eXBlczogICAgICBzdHJpbmdbXTtcbn1cblxuaW50ZXJmYWNlIEdlb21ldHJ5IHtcbiAgYm91bmRzOiAgICAgICAgQm91bmRzO1xuICBsb2NhdGlvbjogICAgICBMb2NhdGlvbjtcbiAgbG9jYXRpb25fdHlwZTogc3RyaW5nO1xuICB2aWV3cG9ydDogICAgICBCb3VuZHM7XG59XG5cbmludGVyZmFjZSBCb3VuZHMge1xuICBub3J0aGVhc3Q6IExvY2F0aW9uO1xuICBzb3V0aHdlc3Q6IExvY2F0aW9uO1xufVxuXG5pbnRlcmZhY2UgTG9jYXRpb24ge1xuICBsYXQ6IG51bWJlcjtcbiAgbG5nOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBOZXR3b3JrTG9jYXRpb24ge1xuICBzdHJlZXRBZGRyZXNzOiBzdHJpbmc7XG4gIHRlbmFudE5hbWU/OiBzdHJpbmc7XG4gIHByb3ZpbmNlPzogc3RyaW5nO1xuICBjb3VudHJ5Pzogc3RyaW5nO1xuICBjaXR5Pzogc3RyaW5nO1xuICBbUFJPUF9OQU1FOiBzdHJpbmddOiBhbnk7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFtYXBTZXJ2aWNlIHtcbiAgZ29vZ2xlS2V5ID0gJ0FJemFTeUFFZFQ1QkEwTW1BTmhybWNuUjRRclh1MDhnTHRndmhxSSc7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW1hcEh0dHA6IEFtYXBIdHRwU2VydmljZSxcbiAgICAgICAgICAgICAgKSB7IH1cbiAgZ2V0TWFya2VyQnlBZGRyZXNzTGlzdEFNYXAoYWRkcmVzc0xpc3Q6IHN0cmluZ1tdLCBjaXR5Pykge1xuICAgIGNvbnN0IG9wdGlvbjogYW55ID0ge307XG4gICAgaWYgKGNpdHkpIG9wdGlvbi5jaXR5ID0gY2l0eTtcbiAgICBjb25zdCBnZW9jb2RlciA9IG5ldyBBTWFwLkdlb2NvZGVyKHt9KTtcblxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTx7IHBvaW50OiBudW1iZXJbXVtdIH1bXT4ob2JzZXJ2ZXIgPT4ge1xuXG4gICAgICBmb3JrSm9pbihhZGRyZXNzTGlzdC5tYXAoYWRkcmVzcyA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxhbnk+KG9iID0+IHtcbiAgICAgICAgICBnZW9jb2Rlci5nZXRMb2NhdGlvbihhZGRyZXNzLCAoc3RhdHVzLCByZXMpID0+IHtcbiAgICAgICAgICAgIGxldCBwb2ludDtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgIT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgICAgcG9pbnQgPSBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gcmVzLmdlb2NvZGVzWzBdO1xuICAgICAgICAgICAgICBwb2ludCA9IFtmaXJzdC5sb2NhdGlvbi5sbmcsIGZpcnN0LmxvY2F0aW9uLmxhdF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYi5uZXh0KHsgcG9pbnQgfSk7XG4gICAgICAgICAgICBvYi5jb21wbGV0ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlcyk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIGdldE1hcmtlckJ5TG9jYXRpb25MaXN0KGxvY2F0aW9uTGlzdDogTmV0d29ya0xvY2F0aW9uW10pIHtcbiAgICBjb25zdCBvcHRpb246IGFueSA9IHt9O1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTx7IHBvaW50OiBudW1iZXJbXSB9W10+KG9ic2VydmVyID0+IHtcblxuICAgICAgZm9ya0pvaW48R2VvUmVzdWx0Pihsb2NhdGlvbkxpc3QubWFwKGxvY2F0aW9uID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ29vZ2xlR2VvKGxvY2F0aW9uLnN0cmVldEFkZHJlc3MpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKG8gPT4gbnVsbClcbiAgICAgICAgICApO1xuICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSByZXMubWFwKChyZXN1bHQsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCBwb2ludDogbnVtYmVyW10gPSBbXVxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICBwb2ludCA9IFtyZXN1bHQuZ2VvbWV0cnkubG9jYXRpb24ubG5nLCByZXN1bHQuZ2VvbWV0cnkubG9jYXRpb24ubGF0XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSBsb2NhdGlvbkxpc3RbaV07XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBwb2ludCxcbiAgICAgICAgICAgICAgaWNvbjogJ2ljb24tZGluZ3dlaScsXG4gICAgICAgICAgICAgIGRhdGE6IGxvY2F0aW9uLFxuICAgICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBsb2NhdGlvbi50ZW5hbnROYW1lLFxuICAgICAgICAgICAgICAgIGJvZHk6IGAke1tsb2NhdGlvbi5zdHJlZXRBZGRyZXNzLCBsb2NhdGlvbi5jaXR5LCBsb2NhdGlvbi5wcm92aW5jZSwgbG9jYXRpb24uY291bnRyeV0uZmlsdGVyKG8gPT4gbykuam9pbignLCAnKX1gXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXN1bHRzKTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KVxuICAgIH0pO1xuICB9XG5cbiAgcG9pKCkge1xuICAgIHZhciBwbGFjZVNlYXJjaCA9IG5ldyBBTWFwLlBsYWNlU2VhcmNoKHtcbiAgICAgIGNpdHk6IGBOZXcgWW9ya2BcbiAgICB9KTtcbiAgICBwbGFjZVNlYXJjaC5zZWFyY2goJ05ldyBZb3JrJywgKHN0YXR1cywgcmVzdWx0KSA9PiB7XG4gICAgICAvLyDmkJzntKLmiJDlip/ml7bvvIxyZXN1bHTljbPmmK/lr7nlupTnmoTljLnphY3mlbDmja5cbiAgICB9KVxuICB9XG5cbiAgICAvL+WcsOWbvuaQnOe0ouWcsOWdgFxuICAgIG1hcFNlYXJjaChpbnB1dDphbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgbGV0IHVybD1cImh0dHA6Ly80Ny4yNTQuNDUuMTEwOjExMDQ1L3BsYWNlL21hcHMvYXBpL3BsYWNlL2F1dG9jb21wbGV0ZS9qc29uXCI7XG4gICAgICBsZXQgcGFyYW1zPXtcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIGtleTpcIkFJemFTeUFFZFQ1QkEwTW1BTmhybWNuUjRRclh1MDhnTHRndmhxSVwiLFxuICAgICAgICBsYW5ndWFnZTonZW4nXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5hbWFwSHR0cC5nZXQodXJsLCBwYXJhbXMpO1xuICAgIH1cblxuICBnb29nbGVHZW8oYWRkcmVzcyk6IE9ic2VydmFibGU8R2VvUmVzdWx0PiB7XG4gICAgLy8gY29uc3QgdXJsID0gYGh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9qcy9HZW9jb2RlU2VydmljZS5TZWFyY2g/NHNzaWNodWFuMiY3c1VTJjlzemgtQ04mY2FsbGJhY2s9X3hkY18uX3MxOHBzMyZrZXk9QUl6YVN5RElKOVhYMlp2UktDSmNGUnJsLWxSYW5FdEZVb3c0cGlNJnRva2VuPTI4ODU4YFxuICAgIGNvbnN0IHVybCA9IGBodHRwOi8vNDcuMjU0LjQ1LjExMDoxMTA0NS9nZW8vbWFwcy9hcGkvZ2VvY29kZS9qc29uP2FkZHJlc3M9JHthZGRyZXNzfSZrZXk9JHt0aGlzLmdvb2dsZUtleX1gXG5cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8R2VvUmVzdWx0PihvYiA9PiB7XG4gICAgICB0aGlzLmFtYXBIdHRwLmdldCh1cmwpXG4gICAgICAgIC5zdWJzY3JpYmUoKGRhdGE6IHsgc3RhdHVzOiBzdHJpbmcsIHJlc3VsdHM6IEdlb1Jlc3VsdFtdIH0pID0+IHtcbiAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdPSycpIHtcbiAgICAgICAgICAgIG9iLm5leHQoZGF0YS5yZXN1bHRzWzBdKVxuICAgICAgICAgICAgb2IuY29tcGxldGUoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYi5lcnJvcignRW1wdHkgR2VvJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgb2IuZXJyb3IoZXJyb3IpO1xuICAgICAgICB9KVxuICAgIH0pO1xuICB9XG59XG4iXX0=