import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { CityOceanService } from '../../pages/cityOcean/city-ocean.service';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() popoverList;
  @Input() type;
  list = [];
  constructor(private popoverCtrl: PopoverController,
    private cityOceanService: CityOceanService,
    private nav:NavController) {}
  ngOnInit(): void {
    if (this.type === 'shipment') {
      if (this.popoverList.bookingIds) {
        this.list.push('booking');
      }
      if (this.popoverList.billingIds) {
        this.list.push('billing');
      }
    }
    this.list.push('contacts');
  }
  dismiss(type) {
    if (type === 'contacts') {
      // 客服
      this.cityOceanService.chatWithCustomerService();
    } else if (type === 'booking') {
      if (this.popoverList.bookingIds.length) {
        this.nav.navigateForward([`/cityOcean/home/booking/bookingDetail`], {
          queryParams: {
            id: this.popoverList.bookingIds[0],
          },
        });
      }
      // else{
      //   this.nav.navigateForward(['/cityOcean/home/booking'], {
      //     queryParams: {
      //       ids: this.popoverList.bookingIds.join(',')
      //     },
      //   });
      // }
    }else if (type === 'billing') {
      if (this.popoverList.billingIds.length) {
        this.nav.navigateForward([`/cityOcean/home/billing/billingDetail`], {
          queryParams: {
            id: this.popoverList.billingIds[0],
          },
        });
      }
      // else{
      //   this.nav.navigateForward(['/cityOcean/home/billing'], {
      //     queryParams: {
      //       ids: this.popoverList.bookingIds.join(',')
      //     },
      //   });
      // }
    }
    this.popoverCtrl.dismiss({ data: 'FooBar!' });
  }
}