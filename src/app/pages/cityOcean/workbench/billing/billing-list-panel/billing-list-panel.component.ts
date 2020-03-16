import { Component, OnInit, Input } from '@angular/core';
import { BillStatus } from '../class/BillStatus';
import * as moment from 'moment';
import { BillingPopoverComponent } from '../billing-popover/billing-popover.component';
import { PopoverController, ModalController } from '@ionic/angular';
import { BankAccountComponent } from '../bank-account/bank-account.component';

@Component({
  selector: 'app-billing-list-panel',
  templateUrl: './billing-list-panel.component.html',
  styleUrls: ['./billing-list-panel.component.scss'],
})
export class BillingListPanelComponent implements OnInit {
  @Input() billingListItem;
  statusType: typeof BillStatus = BillStatus; // 显示状态

  constructor(private modalController: ModalController, private popoverController: PopoverController) {}

  ngOnInit() {}
  getTime(time) {
    if(!time){return ''}
    return moment(time).format('MMM D YYYY');
  }
  async moreClick($event, item) {
    $event.stopPropagation();
    const popover = await this.popoverController.create({
      component: BillingPopoverComponent,
      showBackdrop: false,
      mode:'ios',
      event: event,
      backdropDismiss: true,
      cssClass: 'billing-popover',
      componentProps: { BillId: item.id },
    });
    popover.onDidDismiss().then(async (event) => {
      console.log(event.data);
      if (event.data && event.data.type === 'bank') {
        this.presentBankModal(event.data.BillId);
      }
    });
    await popover.present();
  }
  async presentBankModal(id) {
    const modal = await this.modalController.create({
      cssClass: 'my-billing-bank-account',
      component: BankAccountComponent,
      componentProps: { BillId: id },
    });
    modal.onWillDismiss().then((res) => {});
    return await modal.present();
  }
}
