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
  @Input() routeBackType = 'home';
  list = [];
  constructor(
    private popoverCtrl: PopoverController,
    private cityOceanService: CityOceanService,
    private nav: NavController,
  ) {}
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
      if (this.popoverList.bookingIds.length === 1) {
        this.nav.navigateForward([`/cityOcean/${this.routeBackType}/booking/bookingDetail`], {
          queryParams: {
            id: this.popoverList.bookingIds[0],
            routeBackType: this.routeBackType,
          },
        });
      } else {
        this.nav.navigateForward([`/cityOcean/${this.routeBackType}/booking`], {
          queryParams: {
            ids: this.popoverList.bookingIds.join(','),
            routeBackType: this.routeBackType,
          },
        });
      }
    } else if (type === 'billing') {
      if (this.popoverList.billingIds.length === 1) {
        this.nav.navigateForward([`/cityOcean/${this.routeBackType}/billing/billingDetail`], {
          queryParams: {
            id: this.popoverList.billingIds[0],
            routeBackType: this.routeBackType,
          },
        });
      } else {
        this.nav.navigateForward([`/cityOcean/${this.routeBackType}/billing`], {
          queryParams: {
            ids: this.popoverList.bookingIds.join(','),
            routeBackType: this.routeBackType,
          },
        });
      }
    }
    this.popoverCtrl.dismiss({ data: 'FooBar!' });
  }
}
