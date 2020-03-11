import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { MyShipmentService } from './shipment.service';
import { ShipmentFilterComponent } from './shipment-filter/shipment-filter.component';
import { CityOceanService } from '../../city-ocean.service';
import { ActivatedRoute } from '@angular/router';
import { Helper } from '@shared/helper';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.page.html',
  styleUrls: ['./shipment.page.scss'],
})
export class ShipmentPage implements OnInit {
  pageInfo = {
    maxResultCount: 5,
    skipCount: 0,
  };
  searchText = '';
  shipmentsList = [];
  currentParams: any = {};
  isLoginWithTourist = this.cityOceanService.getIsLoginWithTourist();
  routeBackType: any;
  constructor(
    private nav: NavController,
    private myShipmentService: MyShipmentService,
    private modalController: ModalController,
    private cityOceanService: CityOceanService,
    private activatedRoute:ActivatedRoute,
    private helper:Helper
  ) {
    this.activatedRoute.queryParams.subscribe(data => {
      this.routeBackType = data.routeBackType
    });
  }

  ngOnInit() {
    this.getShipmentList();
  }
  /**
   *
   *
   * @param {*} params
   * @param {*} [event]  下拉参数
   * @memberof ShipmentPage
   */
  getShipmentList(event?) {
    if(this.cityOceanService.getIsLoginWithTourist()){
      this.getShipmentListByVisitor(event);
      return
    }
    this.searchText ? this.currentParams.searchText = this.searchText:delete this.currentParams.searchText;
    this.currentParams.MaxResultCount = this.pageInfo.maxResultCount;
    this.currentParams.SkipCount = this.pageInfo.skipCount * this.pageInfo.maxResultCount;
    this.helper.showLoading('Loading...');
    this.myShipmentService.GetAll(this.currentParams).subscribe((res) => {
      console.log(res);
      this.helper.hideLoading();
      event && event.target.complete(); //告诉ion-infinite-scroll数据已经更新完成
      this.shipmentsList = this.shipmentsList.concat(res.items);
      this.pageInfo.skipCount++;
      if (this.shipmentsList.length >= res.totalCount && event) {
        // 已加载全部数据，禁用上拉刷新
        event.target.disabled = true;
      }
    });
  }
  getShipmentListByVisitor(event?){
    if(this.searchText){
      this.helper.showLoading('Loading...');
      this.cityOceanService.GetRouteDetailsByShipmentNo(String(this.searchText)).subscribe((res:any)=>{
        console.log(res);
        this.helper.hideLoading();
        this.shipmentsList = this.shipmentsList.concat([res]);
        if (event) {
          // 已加载全部数据，禁用上拉刷新
          event.target.disabled = true;
          event.target.complete();
        }
      })
    }
  }
  resetFilter(){
    this.shipmentsList = [];
    this.pageInfo.skipCount = 0;
    this.getShipmentList()
  }
  
  goback() {
    this.nav.navigateForward([`/cityOcean/${this.routeBackType}`]);
    // window.history.back()
  }
  gotoShipmentDetail(item) {
    this.nav.navigateForward(['/cityOcean/workbench/shipments/shipmentDetail'], {
      queryParams: { id: item.id},
    });
  }
  async shipmentFilter(type) {
    const modal = await this.modalController.create({
      component: ShipmentFilterComponent,
    });
    modal.onWillDismiss().then((res) => {
      console.log(res);
      this.pageInfo = {
        maxResultCount: 5,
        skipCount: 0,
      };
      this.currentParams  = {};
      if (res.data) {
        this.currentParams = res.data;
        this.resetFilter()
      }
    });
    return await modal.present();
  }
}
