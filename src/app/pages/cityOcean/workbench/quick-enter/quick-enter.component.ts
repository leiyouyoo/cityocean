import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HomeService } from '../../home/home.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-quick-enter',
  templateUrl: './quick-enter.component.html',
  styleUrls: ['./quick-enter.component.scss'],
})
export class QuickEnterComponent implements OnInit {
  @Input() quickEnterList=[];
  @Input() isHome = false;
   moreTypeList=[];
  typeList = [
    // 所有业务类型
    {
      name: this.translate.instant('Rates'),
      type: 'rates',
      marker: false,
      id: 0,
    },
    {
      name: this.translate.instant('Schedules'),
      type: 'sailingSchedules',
      marker: false,
      id: 0,
    },
    {
      name: this.translate.instant('Shipments'),
      type: 'shipments',
      marker: false,
      id: 0,
    },
    {
      name: this.translate.instant('Bookings'),
      type: 'booking',
      marker: false,
      id: 0,
    },
    {
      name: this.translate.instant('Quotes'),
      type: 'quotes',
      marker: false,
      id: 0,
    },
    {
      name: this.translate.instant('Billings'),
      type: 'billing',
      marker: false,
      id: 0,
    },
  ];
  constructor(private homeService:HomeService,
    private translate:TranslateService,
    private modalController:ModalController) { }

  ngOnInit() {
    this.moreTypeList = this.typeList.filter((e) => {
      if (this.quickEnterList.length == 0) {
        return true;
      }
      return !this.quickEnterList.some((ele) => {
        return e.type == ele.type;
      });
    });
  }
 /**
   *
   *  从快捷入口删除
   * @param {*} event
   * @param {*} item
   * @param {*} index
   * @memberof WorkbenchPage
   */
  delete(event, item, index) {
    event.stopPropatgaion;
    this.quickEnterList.splice(index, 1);
    this.moreTypeList.push(item);
  }
  /**
   *  添加到快捷入口
   *
   * @param {*} event
   * @param {*} item
   * @param {*} index
   * @memberof WorkbenchPage
   */
  add(event, item, index) {
    event.stopPropatgaion;
    this.moreTypeList.splice(index, 1);
    this.quickEnterList.push(item);
  }
  confirm() {
    this.homeService.createQuickEntrance(this.quickEnterList).subscribe((res) => {
      console.log(res);
      this.modalController.dismiss(this.quickEnterList);
    });
  }
}
