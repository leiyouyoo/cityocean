import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'omsdate'
})
export class OMSDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
