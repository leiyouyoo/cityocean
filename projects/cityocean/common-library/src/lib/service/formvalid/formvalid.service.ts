import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class formvalidService {

  constructor() { }

  //form表单统一提交(触发验证)
  submit(formData: any): Observable<any> {
    for (const i in formData.controls) {
      formData.controls[i].markAsDirty();
      formData.controls[i].updateValueAndValidity();
    }
    return null;
  }
}
