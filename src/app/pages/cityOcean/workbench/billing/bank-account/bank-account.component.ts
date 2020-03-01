import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard';
import { BillingServiceService } from '../billing-service.service'

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
})
export class BankAccountComponent implements OnInit {
  @Input() BillId :number;
  constructor(private modalController:ModalController,
    private clipboard:Clipboard,
    private billingServiceService:BillingServiceService) { }

  ngOnInit() {
    this.billingServiceService.GetBankAccount(this.BillId).subscribe(res=>{
      console.log(res)
    })
  }
  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  copy(){
    this.clipboard.copy('Hello world');
  }
}
