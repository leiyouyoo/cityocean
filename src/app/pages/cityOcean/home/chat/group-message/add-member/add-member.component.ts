import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeService } from '../../../home.service';
import { addGroupNumber, createGroup } from '@cityocean/im-library';

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
  @Input() conversationType: string;
  membersList: Array<any> = [];

  ngOnInit() {
    if (!this.isC2C && this.conversationType != 'Private') {
      const map = {
        quote: 0,
        booking: 1,
        shipment: 2,
        order: 3,
        product: 4,
      };
      /^\d*$/.test(this.BusinessId.toString()) &&
        this.homeService
          .getMayInviteUserList({ BusinessId: Number(this.BusinessId), BusinessType: map[this.BusinessType] })
          .subscribe((res) => {
            console.log(res);
            this.membersList = res.items.filter((e) => {
              return !e.isInGroup;
            });
          });
    } else {
      abp.session.user.id &&
        this.homeService.getMayInviteUserC2CList({ customerId: abp.session.user.customerId }).subscribe((res) => {
          console.log(res);
          let ids = res.items.map((e) => {
            return e.id;
          });
          this.membersList = res.items.filter((e) => {
            return !e.isInGroup;
          });
          if (ids.length) {
            this.homeService.getPortrait(ids);
          }
        });
    }
  }
  dismissModal(data?) {
    this.modalController.dismiss(data);
  }
  save() {
    if (this.isC2C) {
      let list = this.membersList
        .filter((e) => {
          return e.checked;
        })
        .map((e) => {
          return { userID: ''+e.id };
        });

      createGroup({
        type: 'private',
        name: 'WebSDK',
        memberList: list, // 如果填写了 memberList，则必须填写 userID
      }).then((res) => {
        console.log(res);
        this.dismissModal(res);
      });
    } else {
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
    }
    // addGroupNumber({ groupID: this.groupID.toLowerCase(), userIDList: list }).then((res) => {
    //   console.log(res);
    //   this.dismissModal(list);
    // });
  }
}
