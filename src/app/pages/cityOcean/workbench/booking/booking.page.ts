import { Component, OnInit } from '@angular/core';
import { BookingServiceService } from './booking-service.service';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { numberToChinese } from '@delon/abc';
import { Helper } from '@shared/helper';

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
  searchKey = '';
  BookingStatus: any; // 筛选状态
  currentParams: any = {}; //筛选条件
  ids: any = []; // 可能为多个id
  routeBackType: any;
  initDataCompleted = false; // 数据是否加载完成
  constructor(
    private bookingServiceService: BookingServiceService,
    private actionSheetController: ActionSheetController,
    private nav: NavController,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private helper: Helper,
  ) {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      if (data.ids) {
        this.ids = data.ids.split(',').map((e) => {
          return Number(e);
        });
      }
      this.routeBackType = data.routeBackType;
    });
  }

  ngOnInit() {
    if (this.ids.length) {
      this.bookingServiceService.GetBookingListByIds(this.ids).subscribe((res: any) => {
        this.bookingList = this.bookingList.concat(res.items);
        this.initDataCompleted = true;
      });
    } else {
      this.getBookingList();
    }
  }
  getBookingList(event?) {
    if (this.ids.length) {
      if (event) {
        event.target.complete();
        event.target.disabled = true;
      }
      return;
    }
    this.searchKey ? (this.currentParams.SearchKey = this.searchKey) : delete this.currentParams.SearchKey;
    this.currentParams.MaxResultCount = this.pageInfo.maxResultCount;
    this.currentParams.SkipCount = this.pageInfo.skipCount * this.pageInfo.maxResultCount;
    if (this.BookingStatus != null) {
      this.currentParams.BookingStatus = this.BookingStatus;
    } else {
      delete this.currentParams.BookingStatus;
    }
    if (!event && !this.searchKey.length) {
      // 如果为下拉加载，不展示loading
      this.helper.showLoading('Loading...');
    }
    this.bookingServiceService.GetAllBookingList(this.currentParams).subscribe((res) => {
      console.log(res);
      this.helper.hideLoading();
      event && event.target.complete(); //告诉ion-infinite-scroll数据已经更新完成
      this.bookingList = this.bookingList.concat(res.items);
      this.pageInfo.skipCount++;
      if (this.bookingList.length >= res.totalCount && event) {
        // 已加载全部数据，禁用上拉刷新
        event.target.disabled = true;
      }
    },()=>{
    },()=>{
      this.helper.hideLoading();
      this.initDataCompleted = true;
    });
  }
  gotoBookingDetail(item) {
    this.nav.navigateForward(['/cityOcean/workbench/booking/bookingDetail'], {
      queryParams: { id: item.id },
    });
  }
  goback() {
    this.nav.navigateForward([`/cityOcean/${this.routeBackType}`]);
    // window.history.back();
  }

  async bookingFilter() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-action-sheet-booking',
      buttons: [
        {
          text: this.translate.instant('All Status'),
          role: this.BookingStatus == null ? 'selected' : '',
          handler: () => {
            this.filterConfirm(null);
          },
        },
        {
          text: this.translate.instant('Submitted'),
          role: this.BookingStatus == 2 ? 'selected' : '',
          handler: () => {
            console.log('2');
            this.filterConfirm(2);
          },
        },
        {
          text: this.translate.instant('Booked'),
          role: this.BookingStatus == 3 ? 'selected' : '',
          handler: () => {
            console.log('3');
            this.filterConfirm(3);
          },
        },
        {
          text: this.translate.instant('Waiting for pricing'),
          role: this.BookingStatus == 4 ? 'selected' : '',
          handler: () => {
            console.log('4');
            this.filterConfirm(4);
          },
        },
        {
          text: this.translate.instant('Waiting for buyer'),
          role: this.BookingStatus == 5 ? 'selected' : '',
          handler: () => {
            console.log('5');
            this.filterConfirm(5);
          },
        },
        {
          text: this.translate.instant('Waiting for seller'),
          role: this.BookingStatus == 6 ? 'selected' : '',
          handler: () => {
            this.filterConfirm(6);
          },
        },
        {
          text: this.translate.instant('Draft'),
          role: this.BookingStatus == 0 ? 'selected' : '',
          handler: () => {
            this.filterConfirm(0);
          },
        },
        {
          text: this.translate.instant('Cancelled'),
          role: this.BookingStatus == 7 ? 'selected' : '',
          handler: () => {
            this.filterConfirm(7);
          },
        },
        { text: this.translate.instant('Cancel'), role: 'cancel' },
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
