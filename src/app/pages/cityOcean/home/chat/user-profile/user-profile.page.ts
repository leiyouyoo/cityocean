import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getUserProfile, updateMyProfile } from '@cityocean/im-library';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { RemarksComponent } from './remarks/remarks.component';
import { CityOceanService } from '../../../city-ocean.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userId: any;
  myUserId = this.cityOceanService.customerId;
  userProfile: any = [{}];
  isSelf = false;
  constructor(private activatedRoute: ActivatedRoute,
    private alertController:AlertController,
    private nav:NavController,
    private cityOceanService:CityOceanService) {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.activatedRoute.queryParams.subscribe((data: any) => {
        this.userId = data.userId;
      });
    });
   }

  ngOnInit() {
    try {
      getUserProfile([this.userId]).then(res => {
        this.userProfile = res.data;
      });
    } catch (error) {
      console.log(error)
    }
    this.cityOceanService.customerId == this.userId?this.isSelf = true:this.isSelf = false;
  }
  goback() {
    window.history.back();
  }
  async changeRemarks(){
    const modal = await this.alertController.create({
      header: '设置备注和描述',
      inputs: [
        {
          name: 'nick',
          type: 'text',
          value: this.userProfile[0].nick,
          placeholder: '添加备注信息'
        },
        {
          name: 'selfSignature',
          type: 'text',
          id: 'name2-id',
          value: this.userProfile[0].selfSignature,
          placeholder: '添加描述'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            updateMyProfile({nick:data.nick,selfSignature:data.selfSignature}).then(res=>{
              console.log(res)
            })
          }
        }
      ]
    });
    modal.onWillDismiss().then(res => {
        console.log(res)
    });
    return await modal.present();
  }
  sendMessage(){
    let chatedFlag = this.cityOceanService.c2cList.filter((e) => {
      return e.userProfile.userID == this.userId;
    });
    if(chatedFlag.lenght){
      this.nav.navigateForward(['/cityOcean/home/chat'], {
        queryParams: {
          conversationID: chatedFlag[0].conversationID,
          C2C: true,
          id: chatedFlag[0].userProfile.userID,
          groupName: chatedFlag[0].userProfile.nick,
          conversationType: 'c2c',
        },
      });
    }else{
      this.cityOceanService.sendMessage(this.userId,this.userProfile[0].nick)
    }
  }
}
