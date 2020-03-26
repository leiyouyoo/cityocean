import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-billing-popover',
  templateUrl: './billing-popover.component.html',
  styleUrls: ['./billing-popover.component.scss'],
})
export class BillingPopoverComponent implements OnInit {
  @Input() BillId: string;
  typeList = [
    {
      name: '银行账户',
      type: 'bank',
    },
    {
      name: '在线支付',
      type: 'pay',
    },
    {
      name: '申请开票',
      type: 'chicket',
    },
  ];
  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}
  dismissPopover(item) {
    this.popoverController.dismiss({ ...item, BillId: this.BillId });
  }
}
