import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ScheduleService } from '@cityocean/basicdata-library/region/service/schedule.service';
import { Helper } from '@shared/helper';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from '@shared/helpers/event.service';
import { ScheduleEditComponent } from './schedule-edit-component/schedule-edit.component';

@Component({
  selector: 'app-schedule-add',
  templateUrl: 'schedule-add.page.html',
  styleUrls: ['schedule-add.page.scss'],
})
export class ScheduleAddPage implements OnInit {
  warnTime: any;
  id: any;
  edit = false;
  data = {
    remindStartTime: new Date().toISOString(),
    remindEndTime: new Date().toISOString(),
    remindContent: null,
    place: '',
    remindPeople: '',
    advanceTime: 15,
    scheduleType: 0,
  };

  constructor(
    public popoverController: PopoverController,
    public eventService: EventService,
    public activeRoute: ActivatedRoute,
    public helper: Helper,
    private translate: TranslateService,
    private datePicker: DatePicker,
    public location: Location,
    public scheduleService: ScheduleService,
    public actionSheetController: ActionSheetController,
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      if (params.id) {
        this.scheduleService.get(Number(this.id)).subscribe((res: any) => {
          this.data = res;
        });
      } else {
        this.edit = true;
      }
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.instant('Choose Time'),
      buttons: [
        {
          text: '15分钟前',
          role: 'destructive',
          icon: 'time',
          handler: () => {
            this.data.advanceTime = 15;
          },
        },
        {
          text: '30分钟前',
          role: 'destructive',
          icon: 'time',
          handler: () => {
            this.data.advanceTime = 30;
          },
        },
        {
          text: '60分钟前',
          role: 'destructive',
          icon: 'time',
          handler: () => {
            this.data.advanceTime = 60;
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }

  onSave() {
    if (this.id) {
      this.onUpdateData();
      return;
    }
    if (!this.data.remindContent) {
      this.helper.toast(this.translate.instant('Please Enter Title'));
      return;
    }
    this.scheduleService.createAsync(this.data).subscribe((res: any) => {
      this.helper.toast(this.translate.instant('Add Success') + '!');
      this.refresh();
    });
  }

  onEdit() {
    this.edit = true;
  }

  onUpdateData() {
    this.scheduleService.updateAsync(this.data).subscribe((res: any) => {
      this.helper.toast(this.translate.instant('Save Success') + '!');
      this.refresh();
    });
  }

  refresh() {
    this.eventService.event.emit('Refresh');
    this.location.back();
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  async setEdit() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: this.translate.instant('Edit'),
          icon: 'create',
          handler: () => {
            this.onEdit();
          },
        },
        {
          text: this.translate.instant('Delete'),
          role: 'destructive',
          icon: 'trash',
          cssClass: 'danger',
          handler: () => {
            this.onDelete();
          },
        },
        {
          text: this.translate.instant('Cancel'),
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }

  onDelete() {
    this.scheduleService.delete(this.id).subscribe((res) => {
      this.helper.toast(this.translate.instant('Delete Success') + '!');
      this.refresh();
    });
  }
}
