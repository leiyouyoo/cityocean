import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ActionSheetController, PopoverController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ScheduleService } from '@cityocean/basicdata-library/region/service/schedule.service';
import { Helper } from '@shared/helper';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from '@shared/helpers/event.service';
import { debug } from 'util';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.component.html',
  styleUrls: ['contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  list: any;
  showlist: any;
  checkedList: any;
  constructor(public scheduleService: ScheduleService, public modal: ModalController) {}

  ngOnInit() {
    this.scheduleService.getCRMContacts(abp.session.user.customerId).subscribe((res: any) => {
      this.list = res.items;
      this.showlist = this.list;
    });
  }

  onInput(msg) {
    if (msg.detail.data) {
      this.showlist = this.list.filter((data) => data.name.indexOf(msg.detail.data) > -1);
    } else {
      this.showlist = this.list;
    }
  }

  onSave() {
    this.modal.dismiss({
      list: this.showlist.filter((res) => res.isChecked),
    });
  }
}
