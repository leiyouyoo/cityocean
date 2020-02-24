import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import {
  NavController,
  PopoverController,
  IonContent,
  ToastController,
  AlertController,
  IonRefresher,
} from '@ionic/angular';
import { PopoverComponent } from './my-popover/popover.component';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file'; // 不需要导入
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';
import { ShipmentStatusType } from '../../workbench/shipment/class/shipment-status-type';
import { BookingStatusType } from '../../workbench/booking/class/booking-status-type';
import { createTextMessage, onMessage, getMessageList, sendmessage, createImageMessage } from '@cityocean/im-library';
import { PressPopoverComponent } from './press-popover/press-popover.component';
import { BookingServiceService } from '../../workbench/booking/booking-service.service';
import { ShipmentService } from '../../workbench/shipment/shipment.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: true }) ioncontent: IonContent;
  statusType: any = { '-1': '暂无' }; //状态枚举
  ionRefresher: any;
  showTools = false; //隐藏底部功能区
  sendingMessage: string;
  chatList = [];
  currentPopover: any;
  conversationID: any;
  isC2C = false;
  groupID: any;
  groupName: any;
  pressStatus: boolean;
  userId = localStorage.getItem('current_tim_id');
  pageInfo = {
    maxResultCount: 10,
    skipCount: 0,
  };
  bussinessType; //业务类型
  bussinessId; //业务ID
  bussinessDetail = { bookingNo: '', status: -1 }; //业务详情
  constructor(
    private nav: NavController,
    public popoverController: PopoverController,
    private transfer: FileTransfer,
    // private file: File, // 不能注入file,否则报错
    private camera: Camera,
    private imagePicker: ImagePicker,
    private activatedRoute: ActivatedRoute,
    private homeService: HomeService,
    public toastController: ToastController,
    public alertController: AlertController,
    private bookingServiceService: BookingServiceService,
    private shipmentService: ShipmentService,
  ) {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.conversationID = data.conversationID;
      this.isC2C = data.C2C == 'true' ? true : false;
      this.groupID = data.id;
      this.groupName = data.groupName;
      this.bussinessType = this.groupID.replace(/\d/gi, '').toLowerCase();
      this.bussinessId = this.groupID.replace(/[^\d]/g, '');
    });
  }
  ngOnInit() {
    switch (this.bussinessType) {
      case 'booking':
        this.statusType = BookingStatusType; //状态枚举
        this.bookingServiceService.GetDetail(this.bussinessId).subscribe((res: any) => {
          console.log(res);
          this.bussinessDetail = res;
        });
        break;
      case 'shipment':
        this.statusType = ShipmentStatusType; //状态枚举
        this.shipmentService.GetShipmentDetail(this.bussinessId).subscribe((res: any) => {
          console.log(res);
          this.bussinessDetail = res;
        });
        break;

      default:
        break;
    }

    this.ionRefresher = document.getElementById('refresher');
    // getMessageList(this.conversationID).then((res) => {
    // this.chatList = res.data.messageList;
    // console.log(this.chatList);
    // });
    this.getChatList();
    onMessage((imRes) => {
      this.chatList = this.chatList.concat(imRes.data);
      this.scrollToBottom(1);
    });
    window.onresize = () => {
      this.scrollToBottom(1);
    };
  }
  ionViewDidEnter() {
    this.scrollToBottom(1);
  }
  /**
   * 获取列表
   *
   * @param {*} [event]
   * @memberof ChatPage
   */
  getChatList(event?) {
    console.log(this.ionRefresher);
    if (!this.isC2C) {
      this.homeService.getGroupMsg(this.groupID).subscribe((res: any) => {
        res.items.forEach((e) => {
          e.flow = e.from == this.userId ? 'out' : 'in';
          e['payload'] = { text: e.msgBody[0].msgContent.Text };
        });
        this.chatList = res.items;
        console.log(res);
      });
    } else {
      let params = {
        FromAccount: [this.groupID, this.userId],
        ToAccount: [this.groupID, this.userId],
        MaxResultCount: this.pageInfo.maxResultCount,
        SkipCount: this.pageInfo.skipCount * this.pageInfo.maxResultCount,
        Sorting: 'MsgTime',
      };
      this.homeService.getC2CMsg(params).subscribe((res: any) => {
        this.chatList = res.items.concat(this.chatList);
        this.pageInfo.skipCount++;
        if (this.chatList.length >= res.totalCount) {
          // 已加载全部数据，禁用上拉刷新
          this.ionRefresher.disabled = true;
        }
        this.ionRefresher.complete();
        res.items.forEach((e) => {
          e.flow = e.from == this.userId ? 'out' : 'in';
          e['payload'] = { text: e.msgBody[0].msgContent.Text };
        });

        console.log(res);
      });
    }
  }

  // 上拉刷新
  doRefresh(event) {
    this.getChatList(event);
  }
  /**
   *发送消息
   *
   * @returns
   * @memberof ChatPage
   */
  async send() {
    this.groupID += '';
    let textMessage: any = {};
    if (this.sendingMessage == '' || this.groupID == null || this.sendingMessage == undefined) {
      return;
    }
    textMessage = createTextMessage(this.groupID, this.isC2C ? 'signle' : 'group', this.sendingMessage);
    textMessage = await sendmessage(textMessage);
    this.chatList.push({
      flow: 'out',
      payload: {
        text: this.sendingMessage,
      },
    });
    this.scrollToBottom(1);
    this.sendingMessage = '';
  }
  async sendImg(imageData) {
    let fileMessage = createImageMessage(this.groupID, this.isC2C ? 'signle' : 'group', imageData);
    await  sendmessage(fileMessage).then((res) => {
      this.chatList.push({
        flow: 'out',
        payload: {
          file: res,
        },
      });
    });
  }
  /**
   *更多按钮，区分群聊还是单聊
   *
   * @param {*} event
   * @memberof ChatPage
   */
  chooseMoreType(event) {
    if (!this.isC2C) {
      this.showPopover(event, PopoverComponent);
    } else {
      this.gotoGroup();
    }
  }
  gotoDetail() {
    if (!this.isC2C) {
      if (this.bussinessType !== 'booking') {
        return;
      }
      this.nav.navigateForward([`/cityOcean/workbench/${this.bussinessType}/${this.bussinessType}Detail`], {
        queryParams: {
          id: this.bussinessId,
        },
      });
    }
  }

  async showPopover(event, component, cssClass?) {
    const popover = await this.popoverController.create({
      component: component,
      showBackdrop: false,
      event: event,
      backdropDismiss: true,
      cssClass: cssClass,
      componentProps: { name: 'world' },
    });
    popover.onDidDismiss().then((event) => {
      this.currentPopover = event.data;
    });
    await popover.present();
  }
  goback() {
    this.nav.navigateBack('/cityOcean/home');
  }
  // 群聊信息
  gotoGroup() {
    this.nav.navigateForward(['/cityOcean/home/chat/groupMessage'], {
      queryParams: {
        conversationID: this.conversationID,
        C2C: this.isC2C,
        id: this.groupID,
        groupName: this.groupName,
      },
    });
  }
  // 个人信息
  gotoUserProfile(userId) {
    this.nav.navigateForward(['/cityOcean/home/chat/userProfile'], {
      queryParams: {
        userId: userId,
      },
    });
  }
  // 拍照
  imgUpload() {
    const options: CameraOptions = {
      quality: 100, // 图片质量
      destinationType: this.camera.DestinationType.FILE_URI, // 返回类型 .FILE_URI 返回文件地址 .DATA_URL 返回base64编码
      encodingType: this.camera.EncodingType.JPEG, // 图片格式 JPEG=0 PNG=1
      mediaType: this.camera.MediaType.PICTURE, // 媒体类型
      sourceType: this.camera.PictureSourceType.CAMERA, // 图片来源  CAMERA相机 PHOTOLIBRARY 图库
      allowEdit: true, // 允许编辑
      targetWidth: 300, // 缩放图片的宽度
      targetHeight: 300, // 缩放图片的高度
      saveToPhotoAlbum: false, // 是否保存到相册
      correctOrientation: true, // 设置摄像机拍摄的图像是否为正确的方向
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        this.sendImg(imageData);
      },
      (err) => {
        // Handle error
      },
    );
    // this.camera.getPicture(options).then(
    //   imageData => {
    //     // 返回拍照的地址
    //     this.doUpload(imageData);
    //   },
    //   err => {
    //     alert(err);
    //   }
    // );
  }
  // 文件上传
  doUpload(src: any) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',
      mimeType: 'image/jpeg',
      httpMethod: 'POST',
      params: { username: '张三', age: '20', height: '190' },
      headers: {},
    };

    const api = 'http://39.108.159.135/imgupload';

    fileTransfer.upload(src, encodeURI(api), options).then(
      (data) => {
        alert(JSON.stringify(data));
      },
      (err) => {
        alert(JSON.stringify(err));
      },
    );
  }
  imageUpload() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 9, // 可选择的图片数量默认 15，1为单选
      width: 400, // 图片宽
      height: 500, //图片高
      quality: 80, //图片质量，质量越高图片越大,请根据实际情况选择
      outputType: 0,
      /** 文件输出类型，你可以选择图片URL，或者base64的文件编码
      这里建议选择文件编码  0  ：文件地址  1：图片base64编码*/
    };
    this.imagePicker.getPictures(options).then(
      (results) => {
        for (var i = 0; i < results.length; i++) {
          // console.log('Image URI: ' + results[i]);
          this.sendImg(results[i]);
        }
      },
      (err) => {},
    );
  }

  /**滚到底部 */
  scrollToBottom(int) {
    setTimeout(() => {
      this.ioncontent.scrollToBottom(1);
    }, int);
  }

  pressCard(event) {
    console.log(event);
    this.pressStatus = true;
    this.showPopover(event, PressPopoverComponent, 'press-css-class');
  }
}
