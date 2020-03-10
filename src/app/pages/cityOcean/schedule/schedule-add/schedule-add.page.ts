import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ActionSheetController, PopoverController, ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ScheduleService } from '@cityocean/basicdata-library/region/service/schedule.service';
import { Helper } from '@shared/helper';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { EventService } from '@shared/helpers/event.service';
import { ScheduleEditComponent } from './schedule-edit-component/schedule-edit.component';
import { ContactsComponent } from 'src/app/components/contacts/contacts.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ScheduleAddEditComponent } from './edit/schedule-add-edit.component';

@Component({
  selector: 'app-schedule-add',
  templateUrl: 'schedule-add.page.html',
  styleUrls: ['schedule-add.page.scss'],
})
export class ScheduleAddPage implements OnInit {
  id: any;
  edit = false;
  choosedContacts: any = [];
  data: FormGroup;
  timeNow: any;

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    public alertController: AlertController,
    public popoverController: PopoverController,
    public eventService: EventService,
    public activeRoute: ActivatedRoute,
    public helper: Helper,
    public router: Router,
    private translate: TranslateService,
    public location: Location,
    public scheduleService: ScheduleService,
    public actionSheetController: ActionSheetController,
  ) {}

  ngOnInit() {
    let d = new Date();
    d.setHours(d.getHours(), d.getMinutes() - d.getTimezoneOffset());
    this.timeNow = d.toISOString();
    this.data = this.formBuilder.group({
      remindContent: [null, [Validators.required]],
      remindPeople: [null],
      advanceTime: [15],
      scheduleType: [0],
      remindStartTime: [null, [Validators.required]],
      remindEndTime: [null, [Validators.required]],
      place: [null],
    });

    this.activeRoute.queryParams.subscribe((params: Params) => {
      if (params.id) {
        this.id = Number(params.id);
        this.scheduleService.get(this.id).subscribe((res: any) => {
          this.data.patchValue({
            remindContent: res.remindContent,
            remindStartTime: res.remindStartTime,
            remindEndTime: res.remindEndTime,
            place: res.place,
          });
          if (res.remindPeople) {
            this.choosedContacts = [];
            this.scheduleService.getCRMContacts(abp.session.user.customerId).subscribe((ress: any) => {
              let arr = res.remindPeople.split(',');
              arr.forEach((e) => {
                ress.items.forEach((element) => {
                  if (Number(e) === element.userId) {
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
          cssClass: 'blue',
          handler: () => {
            this.data.patchValue({
              advanceTime: 15,
            });
          },
        },
        {
          text: '30' + this.translate.instant('minutes ago'),
          role: 'destructive',
          cssClass: 'blue',
          handler: () => {
            this.data.patchValue({
              advanceTime: 30,
            });
          },
        },
        {
          text: '60' + this.translate.instant('minutes ago'),
          role: 'destructive',
          cssClass: 'blue',
          handler: () => {
            this.data.patchValue({
              advanceTime: 60,
            });
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
    if (!this.validate()) {
      return;
    }

    if (this.id) {
      this.onUpdateData();
      return;
    }
    let items = this.data.value;
    items.remindPeople = this.choosedContacts
      .map((da) => {
        return da.userId;
      })
      .toString();
    items.remindStartTime = new Date(items.remindStartTime).toISOString();
    items.remindEndTime = new Date(items.remindEndTime).toISOString();
    this.scheduleService.createAsync(items).subscribe((res: any) => {
      this.helper.toast(this.translate.instant('Add Success') + '!');
      this.refresh();
    });
  }

  onEdit() {
    this.edit = true;
  }

  onUpdateData() {
    let items = this.data.value;
    items.remindPeople = this.choosedContacts
      .map((da) => {
        return da.userId;
      })
      .toString();
    items.remindStartTime = new Date(items.remindStartTime).toISOString();
    items.remindEndTime = new Date(items.remindEndTime).toISOString();
    items.id = this.id;
    this.scheduleService.updateAsync(items).subscribe((res: any) => {
      this.helper.toast(this.translate.instant('Save Success') + '!');
      this.refresh();
    });
  }

  refresh() {
    this.eventService.event.emit('Refresh');
    this.location.back();
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  async setEdit(event) {
    const popover = await this.popoverController.create({
      component: ScheduleAddEditComponent,
      showBackdrop: false,
      backdropDismiss: true,
      event: event,
      cssClass: 'chat-popover',
    });
    popover.onDidDismiss().then((event) => {
      if (event.data === 'edit') {
        this.onEdit();
      }

      if (event.data === 'delete') {
        this.onDelete();
      }
    });
    await popover.present();
  }

  async onDelete() {
    const alert = await this.alertController.create({
      message: this.translate.instant('Are you sure you want to delete') + '?',
      buttons: [
        {
          text: this.translate.instant('Cancel'),
          role: 'cancel',
          handler: (blah) => {},
        },
        {
          text: this.translate.instant('Ok'),
          handler: () => {
            this.scheduleService.delete(this.id).subscribe((res) => {
              this.helper.toast(this.translate.instant('Delete Success') + '!');
              this.refresh();
            });
          },
        },
      ],
    });
    await alert.present();
  }

  onSetEndTime() {
    if (this.data.value.remindStartTime && this.data.value.remindEndTime) {
      if (new Date(this.data.value.remindStartTime) > new Date(this.data.value.remindEndTime)) {
        this.data.patchValue({
          remindEndTime: this.data.value.remindStartTime,
        });
      }
    }
  }

  async onSetRemind() {
    if (!this.edit) {
      return;
    }
    if (this.choosedContacts.length > 0 && this.id) {
      this.presentAlert();
    } else {
      this.onContactModal();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.translate.instant('Contact has been notified'),
      message: this.translate.instant('Edit') + '?',
      buttons: [
        {
          text: this.translate.instant('Cancel'),
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: this.translate.instant('Ok'),
          handler: () => {
            this.onContactModal();
          },
        },
      ],
    });

    await alert.present();
  }

  async onContactModal() {
    const modal = await this.modalController.create({
      component: ContactsComponent,
      componentProps: {
        ids: this.choosedContacts
          .map((res) => {
            return res.userId;
          })
          .toString(),
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

  validate() {
    // tslint:disable-next-line: forin
    for (const i in this.data.controls) {
      this.data.controls[i].markAsDirty();
      this.data.controls[i].updateValueAndValidity();
    }
    return this.data.valid;
  }

  async onBack() {
    if (this.edit) {
      const alert = await this.alertController.create({
        message: this.translate.instant('Are you sure you want to discard your changes') + '?',
        buttons: [
          {
            text: this.translate.instant('Cancel'),
            role: 'cancel',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            },
          },
          {
            text: this.translate.instant('Ok'),
            handler: () => {
              this.router.navigate(['/cityOcean/schedule']);
            },
          },
        ],
      });
      await alert.present();
    } else {
      this.router.navigate(['/cityOcean/schedule']);
    }
  }

  doHandleYear(myDate) {
    const tYear = myDate.getFullYear();
    return tYear;
  }

  doHandleMonth(myDate) {
    const tMonth = myDate.getMonth();
    const mon = tMonth + 1;
    let m;
    if (mon.toString().length === 1) {
      m = '0' + mon;
    } else {
      m = mon;
    }
    return m;
  }

  doHandleDay(myDate) {
    const tDay = myDate.getDate();
    let d;
    if (tDay.toString().length === 1) {
      d = '0' + tDay;
    } else {
      d = tDay;
    }
    return d;
  }
}
