/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/amap-http.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class AmapHttpService {
    /**
     * @param {?} handler
     */
    constructor(handler) {
        this.handler = handler;
        this.http = new HttpClient(this.handler);
    }
    /**
     * @param {?} url
     * @param {?=} params
     * @param {?=} headers
     * @return {?}
     */
    get(url, params, headers) {
        return this.http.get(url, { params });
    }
}
AmapHttpService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AmapHttpService.ctorParameters = () => [
    { type: HttpBackend }
];
/** @nocollapse */ AmapHttpService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AmapHttpService_Factory() { return new AmapHttpService(i0.ɵɵinject(i1.HttpBackend)); }, token: AmapHttpService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    AmapHttpService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    AmapHttpService.prototype.handler;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW1hcC1odHRwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2l0eW9jZWFuL2FtYXAtbGlicmFyeS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hbWFwLWh0dHAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBSy9ELE1BQU0sT0FBTyxlQUFlOzs7O0lBRzFCLFlBQW9CLE9BQW9CO1FBQXBCLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFFdEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7OztJQUVELEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTyxFQUFFLE9BQVE7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7OztZQWJGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQUpRLFdBQVc7Ozs7Ozs7O0lBTWxCLCtCQUF5Qjs7Ozs7SUFFYixrQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBCYWNrZW5kLCBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQW1hcEh0dHBTZXJ2aWNlIHtcclxuICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaGFuZGxlcjogSHR0cEJhY2tlbmQsXHJcbiAgICAgICAgICAgICAgKSB7XHJcbiAgICB0aGlzLmh0dHAgPSBuZXcgSHR0cENsaWVudCh0aGlzLmhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgZ2V0KHVybCwgcGFyYW1zPywgaGVhZGVycz8pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgeyBwYXJhbXMgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==