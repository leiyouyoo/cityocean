import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ActionSheetController, PopoverController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ScheduleService } from '@cityocean/basicdata-library/region/service/schedule.service';
import { Helper } from '@shared/helper';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from '@shared/helpers/event.service';
import { ScheduleEditComponent } from './schedule-edit-component/schedule-edit.component';
import { ContactsComponent } from 'src/app/components/contacts/contacts.component';

@Component({
  selector: 'app-schedule-add',
  templateUrl: 'schedule-add.page.html',
  styleUrls: ['schedule-add.page.scss'],
})
export class ScheduleAddPage implements OnInit {
  warnTime: any;
  id: any;
  edit = false;
  minEndTime: any;
  choosedContacts: any;
  data = {
    remindStartTime: null,
    remindEndTime: null,
    remindContent: null,
    place: '',
    remindPeople: '',
    advanceTime: 15,
    scheduleType: 0,
  };

  constructor(
    public modalController: ModalController,
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
        this.id = Number(params.id);
        this.scheduleService.get(this.id).subscribe((res: any) => {
          this.data = res;
          if (this.data.remindPeople) {
            this.choosedContacts = [];
            this.scheduleService.getCRMContacts(abp.session.user.customerId).subscribe((res: any) => {
              let arr = this.data.remindPeople.split(',');
              arr.forEach((e) => {
                res.items.forEach((element) => {
                  if (Number(e) === element.id) {
                    this.choosedContacts.push(element);
                  }
                });
              });
            });
          }
        });
      } else {
        this.edit = true;
      }
    });
  }

  async presentActionSheet() {
    if (!this.edit && this.id) {
      return;
    }
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.instant('Choose Time'),
      buttons: [
        {
          text: '15' + this.translate.instant('minutes ago'),
          role: 'destructive',

          handler: () => {
            this.data.advanceTime = 15;
          },
        },
        {
          text: '30' + this.translate.instant('minutes ago'),
          role: 'destructive',

          handler: () => {
            this.data.advanceTime = 30;
          },
        },
        {
          text: '60' + this.translate.instant('minutes ago'),
          role: 'destructive',
          handler: () => {
            this.data.advanceTime = 60;
          },
        },
        {
          text: this.translate.instant('Cancel'),
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
    if (this.choosedContacts) {
      this.data.remindPeople = this.choosedContacts
        .map((res) => {
          return res.id;
        })
        .toString();
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
    this.data.remindPeople = this.choosedContacts.map((da) => {
      return da.id;
    }).toString();
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

  onSetEndTime(time) {
    if (this.data.remindStartTime) {
      const time = new Date(this.data.remindStartTime).setDate(new Date(this.data.remindStartTime).getDate() + 1);
      this.minEndTime = new Date(time).toISOString();
    }
  }

  async onSetRemind() {
    if (!this.edit && this.id) {
      return;
    }
    const modal = await this.modalController.create({
      component: ContactsComponent,
      componentProps: {
        ids: this.id
          ? this.choosedContacts
              .map((res) => {
                return res.id;
              })
              .toString()
          : null,
      },
      cssClass: 'contacts',
    });

    await modal.present();

    await modal.onWillDismiss().then((res) => {
      if (res.data) {
        this.choosedContacts = res.data.list;
      }
    });
  }
}
