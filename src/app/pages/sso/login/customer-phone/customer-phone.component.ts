import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-phone',
  templateUrl: './customer-phone.component.html',
  styleUrls: ['./customer-phone.component.scss'],
})
export class CustomerPhoneComponent implements OnInit {
  globelCustomerPhone: any = '0755-33958211';

  constructor() {}

  ngOnInit() {
  }
}
