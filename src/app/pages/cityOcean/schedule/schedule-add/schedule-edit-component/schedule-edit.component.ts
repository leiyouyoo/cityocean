import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ScheduleService } from '@cityocean/basicdata-library/region/service/schedule.service';
import { Helper } from '@shared/helper';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from '@shared/helpers/event.service';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: 'schedule-edit.component.html',
  styleUrls: ['schedule-edit.component.scss'],
})
export class ScheduleEditComponent {
  constructor() {}
}
