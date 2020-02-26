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
export class AmapService {
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
/** @nocollapse */ AmapService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AmapService_Factory() { return new AmapService(i0.ɵɵinject(i1.AmapHttpService)); }, token: AmapService, providedIn: "root" });
if (false) {
    /** @type {?} */
    AmapService.prototype.googleKey;
    /**
     * @type {?}
     * @private
     */
    AmapService.prototype.amapHttp;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW1hcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNpdHlvY2Vhbi9hbWFwLWxpYnJhcnkvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYW1hcC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1QyxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFHdEQsK0JBTUM7OztJQUxDLHVDQUF1Qzs7SUFDdkMsc0NBQTJCOztJQUMzQiw2QkFBNkI7O0lBQzdCLDZCQUEyQjs7SUFDM0IsMEJBQTZCOzs7OztBQUcvQiwrQkFJQzs7O0lBSEMscUNBQW1COztJQUNuQixzQ0FBbUI7O0lBQ25CLGlDQUFxQjs7Ozs7QUFHdkIsdUJBS0M7OztJQUpDLDBCQUFzQjs7SUFDdEIsNEJBQXdCOztJQUN4QixpQ0FBc0I7O0lBQ3RCLDRCQUFzQjs7Ozs7QUFHeEIscUJBR0M7OztJQUZDLDJCQUFvQjs7SUFDcEIsMkJBQW9COzs7OztBQUd0Qix1QkFHQzs7O0lBRkMsdUJBQVk7O0lBQ1osdUJBQVk7Ozs7O0FBR2QsOEJBT0M7OztJQU5DLHdDQUFzQjs7SUFDdEIscUNBQW9COztJQUNwQixtQ0FBa0I7O0lBQ2xCLGtDQUFpQjs7SUFDakIsK0JBQWM7OztBQU9oQixNQUFNLE9BQU8sV0FBVzs7OztJQUV0QixZQUFvQixRQUF5QjtRQUF6QixhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUQ3QyxjQUFTLEdBQUcseUNBQXlDLENBQUM7SUFFdEMsQ0FBQzs7Ozs7O0lBQ2pCLDBCQUEwQixDQUFDLFdBQXFCLEVBQUUsSUFBSzs7Y0FDL0MsTUFBTSxHQUFRLEVBQUU7UUFDdEIsSUFBSSxJ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QUNILENBQUM7Ozs7WUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDVCxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLENBQUMsRUFBQyxDQUFBO1FBQ04sQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUEzR0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBN0NRLGVBQWU7Ozs7O0lBK0N0QixnQ0FBc0Q7Ozs7O0lBQzFDLCtCQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZvcmtKb2luLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHNraXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBbWFwSHR0cFNlcnZpY2UgfSBmcm9tICcuL2FtYXAtaHR0cC5zZXJ2aWNlJztcbmRlY2xhcmUgbGV0IEFNYXA6IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBHZW9SZXN1bHQge1xuICBhZGRyZXNzX2NvbXBvbmVudHM6IEFkZHJlc3NDb21wb25lbnRbXTtcbiAgZm9ybWF0dGVkX2FkZHJlc3M6ICBzdHJpbmc7XG4gIGdlb21ldHJ5OiAgICAgICAgICAgR2VvbWV0cnk7XG4gIHBsYWNlX2lkOiAgICAgICAgICAgc3RyaW5nO1xuICB0eXBlczogICAgICAgICAgICAgIHN0cmluZ1tdO1xufVxuXG5pbnRlcmZhY2UgQWRkcmVzc0NvbXBvbmVudCB7XG4gIGxvbmdfbmFtZTogIHN0cmluZztcbiAgc2hvcnRfbmFtZTogc3RyaW5nO1xuICB0eXBlczogICAgICBzdHJpbmdbXTtcbn1cblxuaW50ZXJmYWNlIEdlb21ldHJ5IHtcbiAgYm91bmRzOiAgICAgICAgQm91bmRzO1xuICBsb2NhdGlvbjogICAgICBMb2NhdGlvbjtcbiAgbG9jYXRpb25fdHlwZTogc3RyaW5nO1xuICB2aWV3cG9ydDogICAgICBCb3VuZHM7XG59XG5cbmludGVyZmFjZSBCb3VuZHMge1xuICBub3J0aGVhc3Q6IExvY2F0aW9uO1xuICBzb3V0aHdlc3Q6IExvY2F0aW9uO1xufVxuXG5pbnRlcmZhY2UgTG9jYXRpb24ge1xuICBsYXQ6IG51bWJlcjtcbiAgbG5nOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBOZXR3b3JrTG9jYXRpb24ge1xuICBzdHJlZXRBZGRyZXNzOiBzdHJpbmc7XG4gIHRlbmFudE5hbWU/OiBzdHJpbmc7XG4gIHByb3ZpbmNlPzogc3RyaW5nO1xuICBjb3VudHJ5Pzogc3RyaW5nO1xuICBjaXR5Pzogc3RyaW5nO1xuICBbUFJPUF9OQU1FOiBzdHJpbmddOiBhbnk7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFtYXBTZXJ2aWNlIHtcbiAgZ29vZ2xlS2V5ID0gJ0FJemFTeUFFZFQ1QkEwTW1BTmhybWNuUjRRclh1MDhnTHRndmhxSSc7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW1hcEh0dHA6IEFtYXBIdHRwU2VydmljZSxcbiAgICAgICAgICAgICAgKSB7IH1cbiAgZ2V0TWFya2VyQnlBZGRyZXNzTGlzdEFNYXAoYWRkcmVzc0xpc3Q6IHN0cmluZ1tdLCBjaXR5Pykge1xuICAgIGNvbnN0IG9wdGlvbjogYW55ID0ge307XG4gICAgaWYgKGNpdHkpIG9wdGlvbi5jaXR5ID0gY2l0eTtcbiAgICBjb25zdCBnZW9jb2RlciA9IG5ldyBBTWFwLkdlb2NvZGVyKHt9KTtcblxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTx7IHBvaW50OiBudW1iZXJbXVtdIH1bXT4ob2JzZXJ2ZXIgPT4ge1xuXG4gICAgICBmb3JrSm9pbihhZGRyZXNzTGlzdC5tYXAoYWRkcmVzcyA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxhbnk+KG9iID0+IHtcbiAgICAgICAgICBnZW9jb2Rlci5nZXRMb2NhdGlvbihhZGRyZXNzLCAoc3RhdHVzLCByZXMpID0+IHtcbiAgICAgICAgICAgIGxldCBwb2ludDtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgIT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgICAgcG9pbnQgPSBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gcmVzLmdlb2NvZGVzWzBdO1xuICAgICAgICAgICAgICBwb2ludCA9IFtmaXJzdC5sb2NhdGlvbi5sbmcsIGZpcnN0LmxvY2F0aW9uLmxhdF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYi5uZXh0KHsgcG9pbnQgfSk7XG4gICAgICAgICAgICBvYi5jb21wbGV0ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlcyk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIGdldE1hcmtlckJ5TG9jYXRpb25MaXN0KGxvY2F0aW9uTGlzdDogTmV0d29ya0xvY2F0aW9uW10pIHtcbiAgICBjb25zdCBvcHRpb246IGFueSA9IHt9O1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTx7IHBvaW50OiBudW1iZXJbXSB9W10+KG9ic2VydmVyID0+IHtcblxuICAgICAgZm9ya0pvaW48R2VvUmVzdWx0Pihsb2NhdGlvbkxpc3QubWFwKGxvY2F0aW9uID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ29vZ2xlR2VvKGxvY2F0aW9uLnN0cmVldEFkZHJlc3MpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKG8gPT4gbnVsbClcbiAgICAgICAgICApO1xuICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSByZXMubWFwKChyZXN1bHQsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCBwb2ludDogbnVtYmVyW10gPSBbXVxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICBwb2ludCA9IFtyZXN1bHQuZ2VvbWV0cnkubG9jYXRpb24ubG5nLCByZXN1bHQuZ2VvbWV0cnkubG9jYXRpb24ubGF0XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSBsb2NhdGlvbkxpc3RbaV07XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBwb2ludCxcbiAgICAgICAgICAgICAgaWNvbjogJ2ljb24tZGluZ3dlaScsXG4gICAgICAgICAgICAgIGRhdGE6IGxvY2F0aW9uLFxuICAgICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBsb2NhdGlvbi50ZW5hbnROYW1lLFxuICAgICAgICAgICAgICAgIGJvZHk6IGAke1tsb2NhdGlvbi5zdHJlZXRBZGRyZXNzLCBsb2NhdGlvbi5jaXR5LCBsb2NhdGlvbi5wcm92aW5jZSwgbG9jYXRpb24uY291bnRyeV0uZmlsdGVyKG8gPT4gbykuam9pbignLCAnKX1gXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXN1bHRzKTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KVxuICAgIH0pO1xuICB9XG5cbiAgcG9pKCkge1xuICAgIHZhciBwbGFjZVNlYXJjaCA9IG5ldyBBTWFwLlBsYWNlU2VhcmNoKHtcbiAgICAgIGNpdHk6IGBOZXcgWW9ya2BcbiAgICB9KTtcbiAgICBwbGFjZVNlYXJjaC5zZWFyY2goJ05ldyBZb3JrJywgKHN0YXR1cywgcmVzdWx0KSA9PiB7XG4gICAgICAvLyDmkJzntKLmiJDlip/ml7bvvIxyZXN1bHTljbPmmK/lr7nlupTnmoTljLnphY3mlbDmja5cbiAgICB9KVxuICB9XG5cbiAgICAvL+WcsOWbvuaQnOe0ouWcsOWdgFxuICAgIG1hcFNlYXJjaChpbnB1dDphbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgbGV0IHVybD1cImh0dHA6Ly80Ny4yNTQuNDUuMTEwOjExMDQ1L3BsYWNlL21hcHMvYXBpL3BsYWNlL2F1dG9jb21wbGV0ZS9qc29uXCI7XG4gICAgICBsZXQgcGFyYW1zPXtcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIGtleTpcIkFJemFTeUFFZFQ1QkEwTW1BTmhybWNuUjRRclh1MDhnTHRndmhxSVwiLFxuICAgICAgICBsYW5ndWFnZTonZW4nXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5hbWFwSHR0cC5nZXQodXJsLCBwYXJhbXMpO1xuICAgIH1cblxuICBnb29nbGVHZW8oYWRkcmVzcyk6IE9ic2VydmFibGU8R2VvUmVzdWx0PiB7XG4gICAgLy8gY29uc3QgdXJsID0gYGh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9qcy9HZW9jb2RlU2VydmljZS5TZWFyY2g/NHNzaWNodWFuMiY3c1VTJjlzemgtQ04mY2FsbGJhY2s9X3hkY18uX3MxOHBzMyZrZXk9QUl6YVN5RElKOVhYMlp2UktDSmNGUnJsLWxSYW5FdEZVb3c0cGlNJnRva2VuPTI4ODU4YFxuICAgIGNvbnN0IHVybCA9IGBodHRwOi8vNDcuMjU0LjQ1LjExMDoxMTA0NS9nZW8vbWFwcy9hcGkvZ2VvY29kZS9qc29uP2FkZHJlc3M9JHthZGRyZXNzfSZrZXk9JHt0aGlzLmdvb2dsZUtleX1gXG5cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8R2VvUmVzdWx0PihvYiA9PiB7XG4gICAgICB0aGlzLmFtYXBIdHRwLmdldCh1cmwpXG4gICAgICAgIC5zdWJzY3JpYmUoKGRhdGE6IHsgc3RhdHVzOiBzdHJpbmcsIHJlc3VsdHM6IEdlb1Jlc3VsdFtdIH0pID0+IHtcbiAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdPSycpIHtcbiAgICAgICAgICAgIG9iLm5leHQoZGF0YS5yZXN1bHRzWzBdKVxuICAgICAgICAgICAgb2IuY29tcGxldGUoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYi5lcnJvcignRW1wdHkgR2VvJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgb2IuZXJyb3IoZXJyb3IpO1xuICAgICAgICB9KVxuICAgIH0pO1xuICB9XG59XG4iXX0=