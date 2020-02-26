import { PipeTransform } from '@angular/core';
import { ShipmentStatusEnum } from '../entities/shipmentStatus';
export declare class ShipmentStatusPipe implements PipeTransform {
    transform(value: ShipmentStatusEnum, ...args: any[]): any;
}
