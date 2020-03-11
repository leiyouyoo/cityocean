import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { BillingServiceService } from './billing-service.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Helper } from '@shared/helper';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.page.html',
  styleUrls: ['./billing.page.scss'],
})
export class BillingPage implements OnInit {
  billingList = [];
  pageInfo = {
    maxResultCount: 5,
    skipCount: 0,
  };
  ids: any = []; // 可能为多个id
  billingStatus: any; // 筛选状态
  searchText: any;
  routeBackType: any;
  constructor(
    private billingServiceService: BillingServiceService,
    private actionSheetController: ActionSheetController,
    private nav: NavController,
    private activatedRoute: ActivatedRoute,
    private translate:TranslateService,
    private helper:Helper
  ) {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      if(data.ids){
        this.ids = data.ids.split(',').map((e) => {
          return Number(e);
        });
      }
      this.routeBackType = data.routeBackType
    });
  }

  ngOnInit() {
    if (this.ids.length) {
      this.billingServiceService.GetBillingListByIds(this.ids).subscribe((res: any) => {
        this.billingList = this.billingList.concat(res.items);
      });
    } else {
      this.getBillingList({});
    }
  }
  getBillingList(params, event?) {
    if (this.ids.length) {
      if (event) {
        event.target.complete();
        event.target.disabled = true;
      }
      return;
    }
    params.MaxResultCount = this.pageInfo.maxResultCount;
    params.SkipCount = this.pageInfo.skipCount * this.pageInfo.maxResultCount;
    if (this.billingStatus != null) {
      params.status = this.billingStatus;
    }
    this.searchText ? params.SearchKey = this.searchText:delete params.SearchKey;
    this.helper.showLoading('Loading...');
    this.billingServiceService.getAllBilling(params).subscribe((res: any) => {
      console.log(res);
      this.helper.hideLoading();
      event && event.target.complete(); //告诉ion-infinite-scroll数据已经更新完成
      this.billingList = this.billingList.concat(res.items);
      this.pageInfo.skipCount++;
      if (this.billingList.length >= res.totalCount && event) {
        // 已加载全部数据，禁用上拉刷新
        event.target.disabled = true;
      }
    });
  }
  resetFilter(){
    this.billingList = [];
    this.billingStatus = null;
    this.pageInfo = {
      maxResultCount: 5,
      skipCount: 0,
    };
    this.getBillingList({})
  }
  gotoBillingDetail(item) {
    this.nav.navigateForward(['/cityOcean/workbench/billing/billiingDetail'], {
      queryParams: { id: item.id },
    });
  }
  goback() {
    this.nav.navigateForward([`/cityOcean/${this.routeBackType}`]);
    // window.history.back();
  }

  /**
   * 筛选
   *
   * @memberof BillingPage
   */
  async billingFilter() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.instant('payStatus'),
      cssClass: 'my-action-sheet-billing',
      buttons: [
        {
          text: this.translate.instant('Outstangding'),
          handler: () => {
            this.filterConfirm(1);
          },
        },
        {
          text: this.translate.instant('Overdue'),
          handler: () => {
            this.filterConfirm(2);
          },
        },
        {
          text: this.translate.instant('Partial paid'),
          handler: () => {
            this.filterConfirm(3);
          },
        },
        {
          text: this.translate.instant('Paid'),
          handler: () => {
            this.filterConfirm(4);
          },
        },
        {
          text: this.translate.instant('Voided'),
          handler: () => {
            this.filterConfirm(5);
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
    this.searchText = '';
    this.billingStatus = status;
    this.billingList = [];
    this.getBillingList({});
  }
}
