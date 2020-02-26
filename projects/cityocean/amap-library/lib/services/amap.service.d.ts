import { Observable } from 'rxjs';
import { AmapHttpService } from './amap-http.service';
export interface GeoResult {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: Geometry;
    place_id: string;
    types: string[];
}
interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}
interface Geometry {
    bounds: Bounds;
    location: Location;
    location_type: string;
    viewport: Bounds;
}
interface Bounds {
    northeast: Location;
    southwest: Location;
}
interface Location {
    lat: number;
    lng: number;
}
interface NetworkLocation {
    streetAddress: string;
    tenantName?: string;
    province?: string;
    country?: string;
    city?: string;
    [PROP_NAME: string]: any;
}
export declare class AmapService {
    private amapHttp;
    googleKey: string;
    constructor(amapHttp: AmapHttpService);
    getMarkerByAddressListAMap(addressList: string[], city?: any): Observable<{
        point: number[][];
    }[]>;
    getMarkerByLocationList(locationList: NetworkLocation[]): Observable<{
        point: number[];
    }[]>;
    poi(): void;
    mapSearch(input: any): Observable<any>;
    googleGeo(address: any): Observable<GeoResult>;
}
export {};
