import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '@cityocean/basicdata-library/region/service/schedule.service';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  list: any;
  constructor(public scheduleService: ScheduleService) {}
  ngOnInit() {
    this.scheduleService.getCRMContacts(abp.session.user.customerId).subscribe((res: any) => {
      this.list = res.items;
    });
  }
}
