import { Injectable, Input } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpService: HttpService, private http: HttpClient) {}

  getGroupMsgMobileList(params: { FromAccount: number }) {
    return this.httpService.get('/IM/Message/GetGroupMsgMobileList', params);
  }
  
  // 获取群聊信息列表
  getGroupMsg(params:any={}) {
    return this.httpService.get('/IM/Message/GetGroupMsg', params);
  }
  // 获取单聊信息列表
  getC2CMsg(params) {
    return this.httpService.postJson('/IM/Message/QueryC2CMsg', params);
  }
  // 获取个人资料
  getPortrait(to_Account: Array<string>) {
    let params = {
      to_Account: to_Account,
      tagList: ['Tag_Profile_IM_Image', 'Tag_Profile_IM_Nick', 'Tag_Profile_IM_Role'],
    };
    return this.httpService.postJson('/IM/AccountManage/PortraitGet', params)
  }
  // 批量获取用户职位集合
  GetBatchUserPositions(ids:Array<any>) {
    let params={UserIds:ids};
    return this.httpService.get('/Platform/Position/GetBatchUserPositions', params);
  }
  // 获取快捷入口
  getQuickEntrance(): Observable<any> {
    return this.httpService.get('/CSP/QuickEntrance/GetAllList', {});
  }
  //添加快捷入口
  createQuickEntrance(obj = {}): Observable<any> {
    let params = obj;
    return this.httpService.postJson('/CSP/QuickEntrance/CreateAsync', params);
  }
  // 同步SSO资料 undo：暂时使用
  SynchronousUserInfo(GroupId): Observable<any> {
    return this.httpService.postJson('/IM/AccountManage/SynchronousUserInfo?GroupId='+GroupId, {});
  }
  
 
  //获取可邀请加入群聊的用户列表
  getMayInviteUserList(obj = {}): Observable<any> {
    let params = obj;
    return this.httpService.get('/CSP/IM/GetMayInviteUserList', params);
  }
  //获取客户下的联系人（包含合作伙伴的）,以及客户绑定的业务员
  getMayInviteUserC2CList(params = {customerId:''}): Observable<any> {
    return this.httpService.get('/CRM/ContactExternal/GetContactAndSaleByCustomerId', params);
  }
// 添加群成员
  AddGroupMembers(obj = {}): Observable<any> {
    let params = obj;
    return this.httpService.postJson('/IM/GroupManage/AddGroupMember', params);
  }

  //获取群聊的用户列表
  geGroupMemberLists(obj = {}): Observable<any> {
    let params = obj;
    return this.httpService.get('/IM/GroupManage/GetGroupMemberInfo', params);
  }

  //获取订单列表
  getOrderList(obj = {}): Observable<any> {
    let params = obj;
    return this.httpService.postJson('/CSP/PurchaseOrder/GetAll', params);
  }

  //创建采购订单
  getCreatePurchaseOrderInfo(obj): Observable<any> {
    let params = obj;
    return this.httpService.postJson('/CSP/PurchaseOrder/Create', params);
  }

  /*上传excel表格*/
  uploadExcel(params: any): Observable<any> {
    return this.http.post(environment.StoreUrl + '/Storage/CSPExcel/OrderImport', params);
  }

  /*确认修改记录已经被查看 */
  OrderHistoryConfirmed(id: number): Observable<any> {
    let params = { Id: id };
    return this.httpService.postJson('/CSP/PurchaseOrder/ViewChange', params);
  }
}
