import { Pipe, PipeTransform } from '@angular/core'
import { dataSource } from '../shareSource/face'
@Pipe({
    name: 'messagePipe'
})

export class messagePipe implements PipeTransform {
    transform(value: string, imgUrl?: string): any {
        let reg = /\[.*?\]/g;
        let face = dataSource.face;
        
        value = value.replace(reg, function (a): any {
            let len = a.length;
            a = a.slice(1, len - 1);
            var faceItem = face.find(f => f.cname == a);
            return faceItem ? `<img src="${imgUrl}${faceItem.url}" alt="">` : `[${a}]`
        })
        return value;
    }
}