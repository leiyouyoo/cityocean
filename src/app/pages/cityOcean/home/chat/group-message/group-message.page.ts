import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { SearchConversationComponent } from './search-conversation/search-conversation.component';
import { ActivatedRoute } from '@angular/router';
import { getGroupMemberlist, updateGroupProfile, quitGroup, getUserProfile } from '@cityocean/im-library';
import { AddMemberComponent } from './add-member/add-member.component';
import { CityOceanService } from '../../../city-ocean.service';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-group-message',
  templateUrl: './group-message.page.html',
  styleUrls: ['./group-message.page.scss'],
})
export class GroupMessagePage implements OnInit {
  membersList = [];
  groupID: any;
  canEditGroupName = true;
  conversationID: any;
  isC2C: any;
  groupName: any;
  conversationType: any;
  constructor(
    private nav: NavController,
    public modalController: ModalController,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    private activatedRoute: ActivatedRoute,
    private cityOceanService: CityOceanService,
    private homeService: HomeService,
  ) {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.activatedRoute.queryParams.subscribe((data: any) => {
        this.conversationID = data.conversationID;
        this.isC2C = data.C2C === 'true' ? true : false;
        this.groupID = data.id;
        this.groupName = data.groupName;
        this.conversationType = data.conversationType;
      });
    });
  }

  ngOnInit() {
    try {
      if (!this.isC2C) {
        //此接口性能有问题，暂不调用
        // this.homeService.SynchronousUserInfo(this.groupID).subscribe(res=>{
          getGroupMemberlist(this.groupID).then((res) => {
            this.membersList = res.data.memberList;
            let ids = res.data.memberList.map((e) => {
              return e.userID;
            });
            this.homeService.GetBatchUserPositions(ids).subscribe((res: any) => {
              if (res) {
                res.forEach((element) => {
                  this.membersList.forEach((e) => {
                    if (element.id == e.userID) {
                      e.positionName = element.positionName;
                    }
                  });
                });
              }
            });
          });
        // })
        
      } else {
        getUserProfile([this.groupID]).then((res) => {
          this.membersList = res.data;
        });
      }
    } catch (error) {
      console.log(error);
    }

    let _groupid = this.groupID.toLowerCase();
    if (
      _groupid.indexOf('booking') ||
      _groupid.indexOf('billing') ||
      _groupid.indexOf('quote') ||
      _groupid.indexOf('shipment') ||
      _groupid.indexOf('order')
    ) {
      this.canEditGroupName = false;
    }
  }
  addMember() {
    this.presentModal(AddMemberComponent, 'add');
  }
  // 个人信息
  gotoUserProfile(userId) {
    this.cityOceanService.gotoUserProfile(userId);
  }
  goback() {
    window.history.back();
  }
  /**
   *    更换背景
   *
   * @memberof GroupMessagePage
   */
  async changeWallpaper() {
    const actionSheet = await this.actionSheetController.create({
      header: '修改聊天背景',
      buttons: [
        {
          text: '从手机相册选择',
          handler: () => {
            console.log('Delete clicked');
          },
        },
        {
          text: '拍一张',
          handler: () => {
            console.log('Share clicked');
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }

  /**
   *   修改群名称
   *
   * @memberof GroupMessagePage
   */
  async editGroupName() {
    const alert = await this.alertController.create({
      header: '修改群名称',
      inputs: [
        {
          name: 'groupName',
          type: 'text',
          placeholder: '群名称群名称',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Ok',
          handler: (event) => {
            updateGroupProfile(this.groupID, event.groupName).then((res) => {
              console.log(res);
              this.groupName = event.groupName;
            });
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   *   退出群聊
   *
   * @memberof GroupMessagePage
   */
  async quitGroupModal() {
    const alert = await this.alertController.create({
      header: '确认退出群聊',
      message: '退出后将接收不到消息，并清空所有聊天记录。',
      buttons: [
        {
          text: 'Yes',
          cssClass: 'modal-yes',
          handler: (blah) => {
            quitGroup(this.groupID);
            this.nav.navigateRoot('/cityOcean/home');
          },
        },
        {
          text: 'Cancel',
          cssClass: 'modal-cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
      ],
    });

    await alert.present();
  }
  searchConversation() {
    this.presentModal(SearchConversationComponent, 'search');
  }
  async presentModal(component, type) {
    const modal = await this.modalController.create({
      component: component,
      componentProps: {
        BusinessId: this.groupID.replace(/[^\d]/gi, ''),
        BusinessType: this.groupID.replace(/\d/g, '').toLowerCase(),
        groupID: this.groupID,
        isC2C: this.isC2C,
        conversationType: this.conversationType,
      },
    });
    modal.onWillDismiss().then((res) => {
      if (type == 'search') {
        // this.nav.navigateForward(['/cityOcean/home/chat'], {
        //   queryParams: {
        //     conversationID: this.conversationID,
        //     C2C: this.isC2C,
        //     id: this.groupID,
        //     groupName: this.groupName,
        //     conversationType: this.conversationType,
        //     messageId:res.data.id
        //   },
        // });
      } else {
        console.log(res);
      }
    });
    return await modal.present();
  }
}
