import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ActionSheetController,
  AlertController,
  ModalController
} from "@ionic/angular";
import { SearchConversationComponent } from "./search-conversation/search-conversation.component";
import { ActivatedRoute } from "@angular/router";
import {
  getGroupMemberlist,
  updateGroupProfile,
  quitGroup,
  getUserProfile
} from "@cityocean/im-library";
import { AddMemberComponent } from './add-member/add-member.component';
import { HomeService } from '../../home.service';

@Component({
  selector: "app-group-message",
  templateUrl: "./group-message.page.html",
  styleUrls: ["./group-message.page.scss"]
})
export class GroupMessagePage implements OnInit {
  membersList = [];
  groupID: any;
  canEditGroupName = true;
  conversationID: any;
  isC2C: any;
  groupName: any;
  constructor(
    private nav: NavController,
    public modalController: ModalController,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    private activatedRoute: ActivatedRoute,
    private homeService:HomeService
  ) {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.activatedRoute.queryParams.subscribe((data: any) => {
        this.conversationID = data.conversationID;
        this.isC2C = data.C2C === 'true' ? true : false;
        this.groupID = data.id;
        this.groupName = data.groupName;
      });
    });
  }

  ngOnInit() {
    try {
      if (!this.isC2C) {
        getGroupMemberlist(this.groupID).then(res => {
          console.log(res)
          this.membersList = res.data.memberList;
        });
      } else {
        getUserProfile([this.groupID]).then(res => {
          this.membersList = res.data;
        });
      }
    } catch (error) {
      console.log(error)
    }
    
    let _groupid = this.groupID.toLowerCase();
    if (_groupid.indexOf('booking') || _groupid.indexOf('billing') || _groupid.indexOf('quote') || _groupid.indexOf('shipment') || _groupid.indexOf('order')) {
      this.canEditGroupName = false;
    }
  }
  addMember() {
    this.presentModal(AddMemberComponent,'add');
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
      header: "修改聊天背景",
      buttons: [
        {
          text: "从手机相册选择",
          handler: () => {
            console.log("Delete clicked");
          }
        },
        {
          text: "拍一张",
          handler: () => {
            console.log("Share clicked");
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
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
      header: "修改群名称",
      inputs: [
        {
          name: "groupName",
          type: "text",
          placeholder: "群名称群名称"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Ok",
          handler: event => {
            updateGroupProfile(this.groupID, event.groupName).then(res => {
              console.log(res);
              this.groupName = event.groupName;
            });
          }
        }
      ]
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
      header: "确认退出群聊",
      message: "退出后将接收不到消息，并清空所有聊天记录。",
      buttons: [
        {
          text: "Yes",
          cssClass: "modal-yes",
          handler: blah => {
            quitGroup(this.groupID);
            this.nav.navigateRoot("/cityOcean/home");
          }
        },
        {
          text: "Cancel",
          cssClass: "modal-cancel",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        }
      ]
    });

    await alert.present();
  }
  searchConversation(){
    this.presentModal(SearchConversationComponent,'search');
  }
  async presentModal(component,type) {
    const modal = await this.modalController.create({
      component: component,
      componentProps:type == "search"? {}:{BusinessId : this.groupID.replace(/[^\d]/ig,""),BusinessType : this.groupID.replace(/\d/g,'').toLowerCase(),groupID:this.groupID}
    });
    modal.onWillDismiss().then(res => {
      if (type == "search") {
        console.log(res)
      } else {
        console.log(res)
      }
    });
    return await modal.present();
  }
}
