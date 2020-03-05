import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NavController, PopoverController, IonContent, AlertController, IonRefresher } from '@ionic/angular';
import { PopoverComponent } from './my-popover/popover.component';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';
import { ShipmentStatusType } from '../../workbench/shipment/class/shipment-status-type';
import { BookingStatusType } from '../../workbench/booking/class/booking-status-type';
import {
  createTextMessage,
  onMessage,
  getMessageList,
  sendmessage,
  createImageMessage,
  getGroupMemberlist,
} from '@cityocean/im-library';
import { PressPopoverComponent } from './press-popover/press-popover.component';
import { BookingServiceService } from '../../workbench/booking/booking-service.service';
import { MyShipmentService } from '../../workbench/shipment/shipment.service';
import { CityOceanService } from '../../city-ocean.service';
import { Location } from '@angular/common';
import { Helper } from '@shared/helper';

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
  userId = this.cityOceanService.customerId;
  pageInfo = {
    maxResultCount: 10,
    skipCount: 0,
  };
  bussinessType; //业务类型
  bussinessId; //业务ID
  bussinessDetail = { bookingNo: '', status: -1 }; //业务详情
  conversationType: any;
  popoverList; // 更多列表数据
  ImageScale: any;
  isDisbanded: boolean;
  bfscrolltop: any;
  constructor(
    private nav: NavController,
    public popoverController: PopoverController,
    private transfer: FileTransfer,
    // private file: File, // 不能注入file,否则报错
    private camera: Camera,
    private imagePicker: ImagePicker,
    private activatedRoute: ActivatedRoute,
    private homeService: HomeService,
    public alertController: AlertController,
    private bookingServiceService: BookingServiceService,
    private myShipmentService: MyShipmentService,
    private cityOceanService: CityOceanService,
    private location: Location,
    private helper: Helper,
  ) {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.conversationID = data.conversationID;
      this.isC2C = data.C2C == 'true' ? true : false;
      this.groupID = data.id;
      (this.conversationType = data.conversationType), (this.groupName = data.groupName);
      this.bussinessType = this.groupID.replace(/\d/gi, '').toLowerCase();
      this.bussinessId = this.groupID.replace(/[^\d]/g, '');
    });
  }
  ngOnInit() {
    this.bfscrolltop = document.body.scrollTop;
    switch (this.bussinessType) {
      case 'booking':
        this.statusType = BookingStatusType; //状态枚举
        this.bookingServiceService.GetDetail(this.bussinessId).subscribe((res: any) => {
          this.bussinessDetail = res;
        });
        break;
      case 'shipment':
        this.statusType = ShipmentStatusType; //状态枚举
        this.myShipmentService.GetShipmentDetail(this.bussinessId).subscribe((res: any) => {
          this.bussinessDetail = res;
        });
        this.homeService.GetRelatedBusiness({ id: this.bussinessId }).subscribe((res: any) => {
          this.popoverList = res;
        });
        break;

      default:
        break;
    }
    this.ionRefresher = document.getElementById('refresher');
    this.getChatList();
    onMessage((imRes) => {
      this.chatList = this.chatList.concat(imRes.data);
      this.scrollToBottom(1);
    });
    window.onresize = () => {
      this.scrollToBottom(1);
    };
    try {
      getGroupMemberlist(this.groupID)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          if (error.message.indexOf('群组不存在') != -1) {
            this.isDisbanded = true;
          }
        });
    } catch (error) {}
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
    if (!this.isC2C) {
      let params = {
        GroupId: this.groupID,
        MaxResultCount: this.pageInfo.maxResultCount,
        SkipCount: this.pageInfo.skipCount * this.pageInfo.maxResultCount,
        Sorting: 'msgTime desc',
      };
      this.homeService.getGroupMsg(params).subscribe((res: any) => {
        this.ionRefresherCheck(res);
      });
    } else {
      let params = {
        FromAccount: [this.groupID, this.userId],
        ToAccount: [this.groupID, this.userId],
        MaxResultCount: this.pageInfo.maxResultCount,
        SkipCount: this.pageInfo.skipCount * this.pageInfo.maxResultCount,
        Sorting: 'msgTime desc',
      };
      this.homeService.getC2CMsg(params).subscribe((res: any) => {
        this.ionRefresherCheck(res);
        console.log(res);
      });
    }
  }
  ionRefresherCheck(res) {
    res.items.reverse(); //消息按时间排序
    res.items.forEach((e) => {
      e.flow = e.from == this.userId ? 'out' : 'in';
      e.type = e.msgBody[0].msgType;
      e['payload'] = { text: e.msgBody[0].msgContent.Text };
    });
    this.chatList = res.items.concat(this.chatList);
    this.pageInfo.skipCount++;
    if (this.chatList.length >= res.totalCount) {
      // 已加载全部数据，禁用上拉刷新
      this.ionRefresher.disabled = true;
    }
    this.ionRefresher.complete();
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
    await sendmessage(textMessage).then((imRes) => {
      console.log(imRes);
    });
    this.chatList.push({
      flow: 'out',
      from: this.userId,
      type: 'TIMTextElem',
      msgBody: [{ msgType: 'TIMTextElem', msgContent: { Text: this.sendingMessage } }],
      payload: {
        text: this.sendingMessage,
      },
    });
    this.scrollToBottom(1);
    this.sendingMessage = '';
  }
  async sendImg(imageData) {
    try {
      let fileMessage = createImageMessage(this.groupID, this.isC2C ? 'signle' : 'group', imageData);
      await sendmessage(fileMessage).then((res) => {
        this.chatList.push({
          flow: 'out',
          payload: {
            file: res,
          },
        });
      });
    } catch (error) {
      this.helper.toast(error);
    }
  }
  /**
   *更多按钮，区分群聊还是单聊
   *
   * @param {*} event
   * @memberof ChatPage
   */
  chooseMoreType(event) {
    if (!this.isC2C) {
      this.showPopover(event, PopoverComponent, 'chat-popover');
    } else {
      this.gotoGroup();
    }
  }
  gotoDetail() {
    if (!this.isC2C) {
      if (this.bussinessType !== 'booking' || this.bussinessType !== 'shipment') {
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
      componentProps: { popoverList: this.popoverList, type: this.bussinessType },
    });
    popover.onDidDismiss().then((event) => {
      this.currentPopover = event.data;
    });
    await popover.present();
  }
  goback() {
    this.location.back();
  }
  // 群聊信息
  gotoGroup() {
    this.nav.navigateForward(['/cityOcean/home/chat/groupMessage'], {
      queryParams: {
        conversationID: this.conversationID,
        C2C: this.isC2C,
        id: this.groupID,
        groupName: this.groupName,
        conversationType: this.conversationType,
      },
    });
  }
  // 个人信息
  gotoUserProfile(userId) {
    this.cityOceanService.gotoUserProfile(userId);
  }

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.dataURL.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  // 拍照
  imgUpload() {
    const options: CameraOptions = {
      quality: 100, // 图片质量
      destinationType: this.camera.DestinationType.DATA_URL, // 返回类型 .FILE_URI 返回文件地址 .DATA_URL 返回base64编码
      encodingType: this.camera.EncodingType.PNG, // 图片格式 JPEG=0 PNG=1
      mediaType: this.camera.MediaType.PICTURE, // 媒体类型
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY, // 图片来源  CAMERA相机 PHOTOLIBRARY 图库
      allowEdit: false, // 允许编辑
      // targetWidth: 300, // 缩放图片的宽度
      // targetHeight: 300, // 缩放图片的高度
      saveToPhotoAlbum: false, // 是否保存到相册
      correctOrientation: true, // 设置摄像机拍摄的图像是否为正确的方向
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        let ImageBase = imageData;
        this.ImageScale = ImageBase;
        this.helper.toast(ImageBase);
        this.sendImg(this.dataURLtoFile(ImageBase, 'picture.png'));
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
          this.helper.toast(results[i]);
          this.ImageScale = results[i];
          this.sendImg(this.dataURLtoFile(results[i], `picture${i}.png`));
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

  focusInput() {
    document.body.scrollTop = document.body.scrollHeight;
  }

  blurInput() {
    document.body.scrollTop = this.bfscrolltop;
  }
}
