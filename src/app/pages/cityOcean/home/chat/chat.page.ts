import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NavController, PopoverController, IonContent, AlertController, IonRefresher } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { environment } from '@env/environment';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';
import { ShipmentStatusType } from '../../workbench/shipment/class/shipment-status-type';
import { BookingStatusType } from '../../workbench/booking/class/booking-status-type';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {
  createTextMessage,
  onMessage,
  getMessageList,
  sendmessage,
  createImageMessage,
  getGroupMemberlist,
  getGroupProfile,
} from '@cityocean/im-library';
import { PressPopoverComponent } from './press-popover/press-popover.component';
import { BookingServiceService } from '../../workbench/booking/booking-service.service';
import { MyShipmentService } from '../../workbench/shipment/shipment.service';
import { CityOceanService } from '../../city-ocean.service';
import { Location } from '@angular/common';
import { Helper } from '@shared/helper';
import * as moment from 'moment';
import { cloneDeep } from 'lodash';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: true }) ioncontent: IonContent;
  @ViewChild(IonRefresher, { static: true }) ionRefresher: IonRefresher;
  statusType: any = { '-1': '暂无' }; //状态枚举
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
  bussinessDetail = { No: '', status: -1, soNo: '',shipmentNo:'' }; //业务详情
  conversationType: any;
  popoverList; // 更多列表数据
  isDisbanded: boolean;
  nowTime: string;

  constructor(
    private nav: NavController,
    public popoverController: PopoverController,
    private transfer: FileTransfer,
    // private file: File,
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
    private statusBar: StatusBar,
  ) {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.conversationID = data.conversationID;
      this.isC2C = data.C2C == 'true' ? true : false;
      this.groupID = data.id;
      this.conversationType = data.conversationType;
      this.groupName = data.groupName;
      this.bussinessType = this.groupID.replace(/\d/gi, '').toLowerCase();
      this.bussinessId = this.groupID.replace(/[^\d]/g, '');
    });
  }
  ngOnInit() {
    this.nowTime = moment(new Date()).format();
    switch (this.bussinessType) {
      case 'booking':
        this.statusType = BookingStatusType; //状态枚举
        this.bookingServiceService.GetDetail(this.bussinessId).subscribe((res: any) => {
          this.bussinessDetail = res;
          this.bussinessDetail.No = this.groupName;
        });
        break;
      case 'shipment':
        this.statusType = ShipmentStatusType; //状态枚举
        this.myShipmentService.GetShipmentDetail(this.bussinessId).subscribe((res: any) => {
          this.bussinessDetail = res;
        });
        forkJoin(
          this.myShipmentService.GetShipmentDetail(this.bussinessId),
          this.myShipmentService.GetDetail(this.bussinessId),
        ).subscribe((res: any) => {
          console.log(res);
          this.bussinessDetail = res[0];
          Object.assign(this.bussinessDetail, res[1]);
          this.bussinessDetail.No = this.bussinessDetail.shipmentNo;
        });
        break;

      default:
        break;
    }
    this.getChatList();
    onMessage((imRes) => {
      if (imRes.data[0].type == 'TIMImageElem') {
        let url = imRes.data[0].payload.imageInfoArray[0].imageUrl;
        imRes.data[0]['msgBody'] = [{ msgContent: { ImageInfoArray: [{ URL: url }] } }];
      }

      this.chatList = this.chatList.concat(imRes.data[0]);
      this.scrollToBottom(1);
    });
    window.onresize = () => {
      this.scrollToBottom(1);
    };
    if (!this.isC2C) {
      try {
        getGroupProfile(this.groupID)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            this.isDisbanded = true;
          });
      } catch (error) {}
    }
  }

  ionViewWillEnter() {
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#3e8eff');
  }

  ionViewWillLeave() {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
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
        this.ionRefresherCheck(res, event);
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
        this.ionRefresherCheck(res, event);
        console.log(res);
      });
    }
  }
  ionRefresherCheck(res, event) {
    res.items.forEach((e) => {
      e.flow = e.from == this.userId ? 'out' : 'in';
      e.type = e.msgBody[0].msgType;
      e['payload'] = { text: e.msgBody[0].msgContent.Text };
      e.msgTime = moment(e.msgTime).format();
    });
    res.items.reverse(); //消息按时间排序
    let tmpChatLists = res.items.concat(this.chatList);
    let _chatList = tmpChatLists.filter((e) => {
      return !e.isTimeShow;
    });

    // 插入时间显示
    let chatListWithTime = [];
    for (let index = _chatList.length - 1; index >= 0; index--) {
      const element = _chatList[index];
      const msgTime = moment(element.msgTime).format();
      let subtract5Min = moment(this.nowTime)
        .subtract(5, 'minutes')
        .format();
      if (
        !element.isChecked &&
        !element.isTimeShow &&
        !moment(this.nowTime).isSame(msgTime) &&
        !moment(msgTime).isBetween(subtract5Min, this.nowTime)
      ) {
        this.nowTime = msgTime;
        subtract5Min = moment(this.nowTime)
          .subtract(5, 'minutes')
          .format();
        const checkTime = (i) => {
          let _element = _chatList[i];
          chatListWithTime.unshift(_element);
          if (i - 1 >= 0) {
            const _msgTime = moment(_chatList[i - 1].msgTime).format();
            if (moment(_msgTime).isBetween(subtract5Min, this.nowTime)) {
              checkTime(--i);
              _element.isChecked = true;
            } else {
              this.nowTime = _element.msgTime;
              chatListWithTime.unshift({ isTimeShow: true, time: _element.msgTime });
              return;
            }
          } else {
            this.nowTime = _element.msgTime;
            chatListWithTime.unshift({ isTimeShow: true, time: _element.msgTime });
          }
        };
        checkTime(index);
        console.log(this.nowTime);
      } else if (
        !element.isChecked &&
        !element.isTimeShow &&
        !moment(this.nowTime).isSame(msgTime) &&
        moment(msgTime).isBetween(subtract5Min, this.nowTime)
      ) {
        chatListWithTime.unshift(element);
      }
    }

    this.chatList = chatListWithTime;
    this.pageInfo.skipCount++;
    if (
      this.chatList.filter((e) => {
        return !e.isTimeShow;
      }).length >= res.totalCount
    ) {
      // 已加载全部数据，禁用上拉刷新
      this.ionRefresher.disabled = true;
      this.ionRefresher.complete();
      if (event) {
        event.target.disabled = true;
      }
    }
    event && event.target.complete();
  }
  // 格式化显示时间
  getImChatTime(time) {
    return this.cityOceanService.getImChatTime(time);
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
    this.insertCurrentTime();
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
  async sendImg(imageData, picture) {
    try {
      let fileMessage = createImageMessage(this.groupID, this.isC2C ? 'signle' : 'group', imageData);
      await sendmessage(fileMessage).then((res) => {
        this.insertCurrentTime();
        this.chatList.push({
          type: 'TIMImageElem',
          flow: 'out',
          msgBody: [
            {
              msgContent: {
                ImageInfoArray: [{ URL: picture }],
              },
            },
          ],
        });
        this.scrollToBottom(1);
      });
    } catch (error) {
      this.helper.toast(error);
    }
  }

  /**
   * 与最后一条消息比较时间，如果超出5分钟，插入最新时间
   *
   * @memberof ChatPage
   */
  insertCurrentTime() {
    const element = this.chatList[this.chatList.length - 1];
    const time = moment(element.msgTime).format();
    const now = moment(new Date()).format();
    const add5Min = moment(time)
      .add(5, 'minutes')
      .format();
    if (!element.isTimeShow && !moment(time).isSame(now) && moment(now).isAfter(add5Min)) {
      this.chatList.push({ isTimeShow: true, time: now });
    }
  }
  gotoDetail() {
    if (!this.isC2C) {
      if (this.bussinessType !== 'booking' && this.bussinessType !== 'shipment') {
        return;
      }
      let _bussinessType = this.bussinessType;
      if (_bussinessType === 'shipment') {
        _bussinessType = 'shipments';
      }
      this.nav.navigateForward([`/cityOcean/workbench/${_bussinessType}/${this.bussinessType}Detail`], {
        queryParams: {
          id: this.bussinessId,
          fromChat:true
        },
      });
    }
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

  dataURLtoFile(dataurl: string, filename) {
    const data = atob(dataurl);
    let n = data.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = data.charCodeAt(n);
    }
    return new (window as any).FileOrigin([u8arr], filename);
  }
  // 拍照
  imgUpload() {
    const options: CameraOptions = {
      quality: 100, // 图片质量
      destinationType: this.camera.DestinationType.DATA_URL, // 返回类型 .FILE_URI 返回文件地址 .DATA_URL 返回base64编码
      encodingType: this.camera.EncodingType.PNG, // 图片格式 JPEG=0 PNG=1
      mediaType: this.camera.MediaType.PICTURE, // 媒体类型
      sourceType: this.camera.PictureSourceType.CAMERA, // 图片来源  CAMERA相机 PHOTOLIBRARY 图库
      allowEdit: false, // 允许编辑
      // targetWidth: 300, // 缩放图片的宽度
      // targetHeight: 300, // 缩放图片的高度
      saveToPhotoAlbum: false, // 是否保存到相册
      correctOrientation: true, // 设置摄像机拍摄的图像是否为正确的方向
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI

        this.sendImg(this.dataURLtoFile(imageData, 'picture.png'), 'data:image/png;base64,' + imageData);
      },
      (err) => {
        // Handle error
      },
    );
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
      outputType: 1,
      /** 文件输出类型，你可以选择图片URL，或者base64的文件编码
      这里建议选择文件编码  0  ：文件地址  1：图片base64编码*/
    };
    this.imagePicker.getPictures(options).then(
      (results) => {
        for (var i = 0; i < results.length; i++) {
          this.sendImg(this.dataURLtoFile(results[i], `picture${i}.png`), 'data:image/png;base64,' + results[i]);
        }
      },
      (err) => {},
    );
  }

  /**滚到底部 */
  scrollToBottom(int) {
    setTimeout(() => {
      this.ioncontent.scrollToBottom(1);
    }, 10);
  }

  pressCard(event) {
    console.log(event);
    this.pressStatus = true;
    // this.showPopover(event, PressPopoverComponent, 'press-css-class');
  }
  getImgUrl(url) {
    if (url.indexOf('data:image/png;base64') != -1 || url.indexOf('http') != -1) {
      return url;
    } else {
      return environment.ImImageUrl + url;
    }
  }
  getCardShow():boolean{
    if(this.conversationType == 'shipment' || this.conversationType == 'booking'){
      return true
    }
    return false
  }
}
