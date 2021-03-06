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
  getGroupMsg(params: any = {}) {
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
    return this.httpService.postJson('/IM/AccountManage/PortraitGet', params);
  }
  // 批量获取用户职位集合
  GetBatchUserPositions(ids: Array<any>) {
    let params = { UserIds: ids };
    return this.httpService.get('/Platform/Position/GetBatchUserPositions', params);
  }
  // 获取我收藏的菜单集合
  getMyFavorites(): Observable<any> {
    return this.httpService.get('/Platform/Menu/GetMyFavorites', {});
  }

  // 批量收藏用户菜单
  addBatchToMyFavorites(menuIds: Array<any>): Observable<any> {
    return this.httpService.postJson('/Platform/Menu/AddBatchToMyFavorites', { menuIds });
  }
  // 批量删除收藏用户菜单
  removeFromMyFavorites(menuIds: Array<any>): Observable<any> {
    return this.httpService.postJson('/Platform/Menu/RemoveFromMyFavorites', { menuIds });
  }
  // 同步SSO资料 undo：暂时使用
  SynchronousUserInfo(GroupId): Observable<any> {
    return this.httpService.postJson('/IM/AccountManage/SynchronousUserInfo?GroupId=' + GroupId, {});
  }

  //获取可邀请加入群聊的用户列表
  getMayInviteUserList(obj = {}): Observable<any> {
    let params = obj;
    return this.httpService.get('/CSP/IM/GetMayInviteUserList', params);
  }
  //获取客户下的联系人（包含合作伙伴的）,以及客户绑定的业务员
  getMayInviteUserC2CList(params = { customerId: '' }): Observable<any> {
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
  // 单聊撤退消息
  revokeC2CMessage(obj = {from_Account:'',to_Account:'',msgKey:''}): Observable<any> {
    let params = obj;
    return this.httpService.postJson('/IM/Message/WithdrawC2CMsg', params);
  }

  // 群组消息撤回
  revokeGroupMessage(groupId,msgSeq): Observable<any> {
    let params = {groupId:groupId,msgSeqList:[{msgSeq:msgSeq}]};
    return this.httpService.postJson('/IM/GroupManage/GroupMsgRecall', params);
  }
}
