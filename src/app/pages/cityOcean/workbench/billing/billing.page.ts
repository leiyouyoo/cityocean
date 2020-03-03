import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { BillingServiceService } from './billing-service.service';

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

  billingStatus: any; // 筛选状态
  constructor(
    private billingServiceService: BillingServiceService,
    private actionSheetController: ActionSheetController,
    private nav: NavController,
  ) {}

  ngOnInit() {
    let ids = '1979,1977';
    this.billingServiceService.GetBillingListByIds(ids.split(",").map(e=>{return Number(e)})).subscribe(res=>{
      console.log(res)
    })
    this.getBillingList({});
  }
  getBillingList(params, event?) {
    params.MaxResultCount = this.pageInfo.maxResultCount;
    params.SkipCount = this.pageInfo.skipCount * this.pageInfo.maxResultCount;
    if (this.billingStatus != null) {
      params.status = this.billingStatus;
    }
    this.billingServiceService.getAllBilling(params).subscribe((res: any) => {
      console.log(res);
      event && event.target.complete(); //告诉ion-infinite-scroll数据已经更新完成
      this.billingList = this.billingList.concat(res.items);
      this.pageInfo.skipCount++;
      if (this.billingList.length >= res.totalCount && event) {
        // 已加载全部数据，禁用上拉刷新
        event.target.disabled = true;
      }
    });
  }
  gotoBillingDetail(item) {
    this.nav.navigateForward(['/cityOcean/workbench/billing/billiingDetail'], {
      queryParams: { id: item.id },
    });
  }
  goback() {
    // this.nav.navigateForward(['/cityOcean/workbench']);
    window.history.back()
  }
  
 
 
  /**
   * 筛选
   *
   * @memberof BillingPage
   */
  async billingFilter() {
    const actionSheet = await this.actionSheetController.create({
      header: '选择支付状态',
      cssClass: 'my-action-sheet-billing',
      buttons: [
        {
          text: 'Outstanding',
          handler: () => {
            this.filterConfirm(0);
          },
        },
        {
          text: 'Past_due',
          handler: () => {
            this.filterConfirm(3);
          },
        },
        {
          text: 'Void',
          handler: () => {
            this.filterConfirm(4);
          },
        },
        {
          text: 'Paid',
          handler: () => {
            this.filterConfirm(2);
          },
        },
        {
          text: 'Payment pending',
          handler: () => {
            this.filterConfirm(6);
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
    this.billingStatus = status;
    this.billingList = [];
    this.getBillingList({});
  }
}
