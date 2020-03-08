import { Component, OnInit, ViewChild } from "@angular/core";
import { NavController, ModalController, IonInfiniteScroll } from "@ionic/angular";
import { SailingFilterComponent } from "./sailing-filter/sailing-filter.component";
import { SailService } from "@cityocean/basicdata-library/region/service/sail.service";
import { ActivatedRoute } from "@angular/router";
import { CityOceanService } from '../../city-ocean.service';
import * as moment from 'moment';

@Component({
  selector: "app-sailing-schedules",
  templateUrl: "./sailing-schedules.page.html",
  styleUrls: ["./sailing-schedules.page.scss"]
})
export class SailingSchedulesPage implements OnInit {
  sailingList = [];
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;
  orignPortId: any;
  deliveryPortId: any;
  pageInfo = {
    maxResultCount : 5,
    skipCount:0,
  }
  routeBackType: any;
  constructor(
    private nav: NavController,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private sailService: SailService,
    private cityOceanService:CityOceanService
  ) {
    this.activatedRoute.queryParams.subscribe(data => {
      this.orignPortId = data.orignPortId;
      this.deliveryPortId = data.deliveryPortId;
      this.routeBackType = data.routeBackType
    });
  }

  ngOnInit() {
    this.getSailingList();
  }
  goback() {
    this.nav.navigateForward([`/cityOcean/${this.routeBackType}`]);
    // window.history.back()
  }
  getSailingList(obj?,event?) {
    let params = {
      OrigPortId: this.orignPortId,
      DestPortId: this.deliveryPortId,
      CarrierCode: [],
      // ETA: "2020-02-20T07:22:41.881Z",
      // ETD: "2020-02-20T07:22:41.881Z",
      MaxResultCount: this.pageInfo.maxResultCount,
      SkipCount: this.pageInfo.skipCount * this.pageInfo.maxResultCount
    };
    obj && Object.assign(params, obj);
    if(params['ETA']){
      params['ETA'] = moment(params['ETA']).utc();
    }
    if(params['ETD']){
      params['ETD'] = moment(params['ETD']).utc();
    }
    params['sorting'] = 'DepartureDate desc';
    this.sailService.getSailingSchedules(params).subscribe((res: any) => {
      console.log(res);
      event && event.target.complete(); //告诉ion-infinite-scroll数据已经更新完成
      this.sailingList = this.sailingList.concat(res.items);
      this.pageInfo.skipCount++;
        if(this.sailingList.length >= res.totalCount && event){
          // 已加载全部数据，禁用上拉刷新
          event.target.disabled = true;
        }
    });
  }
 
  gotoSailingDetail(item) {
    return
    this.nav.navigateForward(
      ["/cityOcean/workbench/sailingSchedules/sailingDetail"],
      {
        queryParams: {}
      }
    );
  }
  async sailingFilter(type) {
    const modal = await this.modalController.create({
      component: SailingFilterComponent
    });
    modal.onWillDismiss().then((res: any) => {
      let params = {};
      if(!res.data){
        return
      }
      if (res.data.etaetd && res.data.date) {
        params[res.data.etaetd] = res.data.date;
      }
      if (res.data.week) {
        params["week"] = res.data.week;
      }
      this.pageInfo = {
        maxResultCount : 5,
        skipCount:0,
      }
      this.sailingList = [];
      this.getSailingList(params);
    });
    return await modal.present();
  }
   // 客服
   chatWithCustomer() {
    this.cityOceanService.chatWithCustomerService();
  }
}
