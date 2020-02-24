import { Component, OnInit } from '@angular/core';
import { BookingStatusType } from './class/booking-status-type';
import { BookingServiceService } from './booking-service.service';
import * as moment from 'moment';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  bookingList = [];
  pageInfo = {
    maxResultCount: 5,
    skipCount: 0,
  };
  statusType: typeof BookingStatusType = BookingStatusType; // 显示状态
  BookingStatus: any; // 筛选状态
  constructor(
    private bookingServiceService: BookingServiceService,
    private actionSheetController: ActionSheetController,
    private nav: NavController,
  ) {}

  ngOnInit() {
    this.getBookingList({});
  }
  getBookingList(params, event?) {
    params.MaxResultCount = this.pageInfo.maxResultCount;
    params.SkipCount = this.pageInfo.skipCount * this.pageInfo.maxResultCount;
    if (this.BookingStatus != null) {
      params.BookingStatus = this.BookingStatus;
    }
    this.bookingServiceService.GetAllBookingList(params).subscribe((res) => {
      console.log(res);
      event && event.target.complete(); //告诉ion-infinite-scroll数据已经更新完成
      this.bookingList = this.bookingList.concat(res.items);
      this.pageInfo.skipCount++;
      if (this.bookingList.length >= res.totalCount && event) {
        // 已加载全部数据，禁用上拉刷新
        event.target.disabled = true;
      }
    });
  }
  gotoBookingDetail(item) {
    this.nav.navigateForward(['/cityOcean/workbench/booking/bookingDetail'], {
      queryParams: { id: item.id },
    });
  }
  goback() {
    window.history.back();
  }
  getTime(time) {
    return moment(time).format('MMM D YYYY');
  }

  async bookingFilter() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-action-sheet-booking',
      buttons: [
        {
          text: 'All Status',
          handler: () => {
            this.filterConfirm(null);
          },
        },
        {
          text: 'Submitted',
          handler: () => {
            console.log('2');
            this.filterConfirm(2);
          },
        },
        {
          text: 'Booked',
          handler: () => {
            console.log('3');
            this.filterConfirm(3);
          },
        },
        {
          text: 'Waiting for pricing',
          handler: () => {
            console.log('4');
            this.filterConfirm(4);
          },
        },
        {
          text: 'Waiting for buyer',
          handler: () => {
            console.log('5');
            this.filterConfirm(5);
          },
        },
        {
          text: 'Waiting for seller',
          handler: () => {
            this.filterConfirm(6);
          },
        },
        {
          text: 'Draft',
          handler: () => {
            this.filterConfirm(0);
          },
        },
        {
          text: 'Cancelled',
          handler: () => {
            this.filterConfirm(1);
          },
        },
        { text: 'Cancel', role: 'cancel' },
      ],
    });
    await actionSheet.present();
  }
  filterConfirm(status) {
    this.pageInfo = {
      maxResultCount: 5,
      skipCount: 0,
    };
    this.BookingStatus = status;
    this.bookingList = [];
    this.getBookingList({});
  }
}
