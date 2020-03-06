import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeService } from '../../../home.service';
import { CityOceanService } from 'src/app/pages/cityOcean/city-ocean.service';
import * as moment from "moment";
@Component({
  selector: 'app-search-conversation',
  templateUrl: './search-conversation.component.html',
  styleUrls: ['./search-conversation.component.scss'],
})
export class SearchConversationComponent implements OnInit {
  items: any;
  pageInfo = {
    maxResultCount: 10,
    skipCount: 0,
  };
  searchText = '';
  @Input() groupID: string;
  @Input() isC2C = false;
  userId = this.cityOceanService.customerId;
  chatList: any = [];
  constructor(
    public modalController: ModalController,
    private homeService: HomeService,
    private cityOceanService: CityOceanService,
  ) {}

  ngOnInit() {}
  handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.items.forEach((item) => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });
  }
  getChatList(event?) {
    this.pageInfo.skipCount = 0;
    this.chatList = [];
    if (!this.searchText) {
      return;
    }
    if (!this.isC2C) {
      let params = {
        GroupId: this.groupID,
        MaxResultCount: this.pageInfo.maxResultCount,
        SkipCount: this.pageInfo.skipCount * this.pageInfo.maxResultCount,
        Sorting: 'msgTime desc',
      };
      params['MsgPatternValue'] = this.searchText;
      this.homeService.getGroupMsg(params).subscribe((res: any) => {
        console.log(res);
        this.ionRefresherCheck(res);
      });
    } else {
      let params = {
        FromAccount: [this.groupID, this.userId],
        ToAccount: [this.groupID, this.userId],
        MaxResultCount: this.pageInfo.maxResultCount,
        SkipCount: this.pageInfo.skipCount * this.pageInfo.maxResultCount,
        Sorting: 'msgTime desc',
      };
      params['MsgPatternValue'] = this.searchText;
      this.homeService.getC2CMsg(params).subscribe((res: any) => {
        this.ionRefresherCheck(res);
        console.log(res);
      });
    }
  }
  // 个人信息
  gotoUserProfile(userId) {
    this.cityOceanService.gotoUserProfile(userId);
  }
  delete(){
    this.chatList = [];
    this.searchText= '';
  }
  ionRefresherCheck(res) {
    res.items.reverse(); //消息按时间排序
    res.items.forEach((e) => {
      e.flow = e.from == this.userId ? 'out' : 'in';
      e.type = e.msgBody[0].msgType;
      e['payload'] = { text: e.msgBody[0].msgContent.Text };
    });
    this.chatList = res.items.concat(this.chatList);
    this.pageInfo.skipCount++;
  }
  dismissModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  getTime(time){
    if(!time){return ''}
    return moment(time).format("dddd A h:mm")
  }

}
