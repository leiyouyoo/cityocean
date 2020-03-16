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
  @Input() quickEnterList = [];
  @Input() isHome = false;
  moreTypeList = [];
  typeList = []; // 所有业务类型
  constructor(
    private homeService: HomeService,
    private translate: TranslateService,
    private modalController: ModalController,
  ) {}

  ngOnInit() {
    this.typeList = abp.nav.menus.MainMenu.items;
    this.moreTypeList = this.typeList.filter((e) => {
      if (this.quickEnterList.length == 0) {
        return true;
      }
      return !this.quickEnterList.some((ele) => {
        return e.customData.id == ele.id;
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
    if(item.customData){
      item.id = item.customData.id
    }
    this.quickEnterList.push(item);
  }
  confirm() {
    this.homeService.addBatchToMyFavorites(
        this.quickEnterList.map((e) => {
          return e.id;
        }),
      ).subscribe((res) => {
        console.log(res);
        this.isHome && this.modalController.dismiss(this.quickEnterList);
      });
  }
}
