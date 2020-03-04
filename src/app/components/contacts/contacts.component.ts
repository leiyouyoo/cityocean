import { Component, OnInit, Input } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ActionSheetController, PopoverController, ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ScheduleService } from '@cityocean/basicdata-library/region/service/schedule.service';
import { Helper } from '@shared/helper';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from '@shared/helpers/event.service';
import { debug } from 'util';

@Component({
  selector: 'app-contacts-component',
  templateUrl: 'contacts.component.html',
  styleUrls: ['contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  list: any;
  showlist: any;
  checkedList: any;
  @Input() ids: string;
  constructor(public scheduleService: ScheduleService, public modal: ModalController, navParams: NavParams) {}

  ngOnInit() {
    this.scheduleService.getCRMContacts(abp.session.user.customerId).subscribe((res: any) => {
      this.list = res.items;
      debugger;
      if (this.ids) {
        this.ids.split(',').forEach((e) => {
          this.list.forEach((element) => {
            if (Number(e) === element.userId) {
              element.isChecked = true;
            }
          });
        });
      }
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
      list: this.showlist ? this.showlist.filter((res) => res.isChecked) : null,
    });
  }
}
