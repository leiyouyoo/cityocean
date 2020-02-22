import { FormControl } from "@angular/forms";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root"
})
export class CustomValidators {
  // 验证手机号码
  static mobileValidator(control: FormControl): any {
    const phoneReg = /^1\d{10}$/;
    const valid = phoneReg.test(control.value);
    return valid ? null : { mobile: control.value };
  }
  static  emailValidator(control: FormControl): any {
    const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    const valid = emailReg.test(control.value);
    return valid ? null : { email: control.value };
  }
}
