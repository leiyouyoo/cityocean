import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HomeService } from '../../home/home.service';

@Component({
  selector: 'app-quick-enter',
  templateUrl: './quick-enter.component.html',
  styleUrls: ['./quick-enter.component.scss'],
})
export class QuickEnterComponent implements OnInit {
  @Input() quickEnterList=[];
  @Input() moreTypeList=[];
  constructor(private homeService:HomeService) { }

  ngOnInit() {}
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
    });
  }
}
