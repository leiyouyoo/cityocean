import { HttpBackend } from '@angular/common/http';
export declare class AmapHttpService {
    private handler;
    private http;
    constructor(handler: HttpBackend);
    get(url: any, params?: any, headers?: any): import("rxjs").Observable<Object>;
}
