import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeService } from '../../../home.service';
import { addGroupNumber } from '@cityocean/im-library';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {
  constructor(public modalController: ModalController, public homeService: HomeService) {}
  @Input() BusinessId: number;
  @Input() BusinessType: number;
  @Input() groupID: string;
  @Input() isC2C = false;
  membersList: Array<any>;

  ngOnInit() {
    if (!this.isC2C) {
      const map = {
        quote: 0,
        booking: 1,
        shipment: 2,
        order: 3,
        product: 4,
      };
      /^\d*$/.test(this.BusinessId.toString()) &&
        this.homeService.getMayInviteUserList({ BusinessId: Number(this.BusinessId), BusinessType: map[this.BusinessType] })
          .subscribe((res) => {
            console.log(res);
            this.membersList = res.items;
          });
    } else {
      abp.session.user.id && this.homeService.getMayInviteUserC2CList({customerId:abp.session.user.id}).subscribe(res=>{
        console.log(res);
        let ids = res.items.map(e=>{
          return e.id
        })
        if(ids.length){
          this.homeService.getPortrait(ids)
          
        }
      })
    }
  }
  dismissModal(data?) {
    this.modalController.dismiss(data);
  }
  save() {
    let list = this.membersList
      .filter((e) => {
        return e.checked;
      })
      .map((e) => {
        return { member_Account: e.userId };
      });
    this.homeService.AddGroupMembers({ groupId: this.groupID, memberList: list }).subscribe((res) => {
      console.log(res);
      this.dismissModal(list);
    });
    // addGroupNumber({ groupID: this.groupID.toLowerCase(), userIDList: list }).then((res) => {
    //   console.log(res);
    //   this.dismissModal(list);
    // });
  }
}
