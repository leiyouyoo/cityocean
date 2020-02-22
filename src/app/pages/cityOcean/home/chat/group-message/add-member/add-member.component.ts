import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeService } from '../../../home.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {

  constructor(public modalController: ModalController,public homeService: HomeService) { }
  @Input() BusinessId: number;
  @Input() BusinessType: number;
  @Input() membersList: any[];
  ngOnInit() {
    let map = {
      quote: 0,
      booking: 1,
      shipment: 2,
      order: 3,
      product: 4
    };
    /^\d*$/.test(this.BusinessId.toString()) && this.homeService.getMayInviteUserList({BusinessId:Number(this.BusinessId),BusinessType:map[this.BusinessType]}).subscribe(res=>{
      console.log(res)
    })
  }
  dismissModal(data?) {
    this.modalController.dismiss(data);
  }
  save(){
    let list = this.membersList.filter(e=>{
      return e.checked;
    })
    this.dismissModal(list);
  }
}
