import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getUserProfile } from '@cityocean/im-library';
import { ModalController, AlertController } from '@ionic/angular';
import { RemarksComponent } from './remarks/remarks.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userId: any;
  userProfile: any;

  constructor(private activatedRoute: ActivatedRoute,private alertController:AlertController) {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.activatedRoute.queryParams.subscribe((data: any) => {
        this.userId = data.userId;
      });
    });
   }

  ngOnInit() {
    getUserProfile([this.userId]).then(res => {
      this.userProfile = res.data;
      console.log(this.userProfile)
    });
  }
  goback() {
    window.history.back();
  }
  async changeRemarks(){
    const modal = await this.alertController.create({
      header: '设置备注和描述',
      inputs: [
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        {
          name: 'name3',
          type: 'text',
          placeholder: '添加备注信息'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    modal.onWillDismiss().then(res => {
        console.log(res)
    });
    return await modal.present();
  }
}
