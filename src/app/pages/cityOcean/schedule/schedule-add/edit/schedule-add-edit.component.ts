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
  selector: 'schedule-add-edit',
  templateUrl: 'schedule-add-edit.component.html',
  styleUrls: ['schedule-add-edit.component.scss'],
})
export class ScheduleAddEditComponent {
  constructor(public popoverCtrl: PopoverController) {}

  onClick(msg) {
    this.popoverCtrl.dismiss(msg);
  }
}
