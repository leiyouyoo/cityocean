import { Component, OnInit } from '@angular/core';
import { BookingServiceService } from './booking-service.service';
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
  searchKey='';
  BookingStatus: any; // 筛选状态
  currentParams: any = {};//筛选条件
  constructor(
    private bookingServiceService: BookingServiceService,
    private actionSheetController: ActionSheetController,
    private nav: NavController,
  ) {}

  ngOnInit() {
    this.getBookingList();
  }
  getBookingList(event?) {
    this.searchKey ? this.currentParams.SearchKey = this.searchKey:delete this.currentParams.SearchKey;
    this.currentParams.MaxResultCount = this.pageInfo.maxResultCount;
    this.currentParams.SkipCount = this.pageInfo.skipCount * this.pageInfo.maxResultCount;
    if (this.BookingStatus != null) {
      this.currentParams.BookingStatus = this.BookingStatus;
    }
    this.bookingServiceService.GetAllBookingList(this.currentParams).subscribe((res) => {
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
    // this.nav.navigateForward(['/cityOcean/workbench']);
    window.history.back()
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
    this.getBookingList();
  }
}
