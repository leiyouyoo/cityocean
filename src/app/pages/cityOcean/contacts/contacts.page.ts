import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '@cityocean/basicdata-library/region/service/schedule.service';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  list: Array<any> = [];
  loadingListLenth = new Array(5);
  initDataCompleted = false; // 数据是否加载完成
  constructor(public scheduleService: ScheduleService) {}
  ngOnInit() {
    try {
      this.scheduleService.getCRMContacts(abp.session.user.customerId).subscribe((res: any) => {
        this.list = res.items;
        this.initDataCompleted = true;
      });
    } catch (error) {
      this.initDataCompleted = true;
    }
  }
}
