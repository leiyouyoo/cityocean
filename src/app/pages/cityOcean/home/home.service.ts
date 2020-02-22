import { Injectable, Input } from '@angular/core';
import { HttpService } from '@cityocean/common-library'
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../../../src/environments/environment'

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    constructor(
        private httpService: HttpService,
        private http: HttpClient
    ) { }

    getGroupMsgMobileList(params: { FromAccount: number }) {
        return this.httpService.get('/IM/Message/GetGroupMsgMobileList', params);
    }
    getGroupMsg(GroupId: string) {
        let params = {
            GroupId: GroupId,
            MaxResultCount: 1000,
            Sorting: 'creationtime'
        }
        return this.httpService.get('/IM/Message/GetGroupMsg', params)
    }
    getC2CMsg(params){
        return this.httpService.postJson('/IM/Message/QueryC2CMsg', params)
    }
    //获取可邀请加入群聊的用户列表
    getMayInviteUserList(obj = {}): Observable<any> {
        let params = obj;
        return this.httpService.get('/CSP/IM/GetMayInviteUserList', params)
    }
    
    //获取订单列表
    getOrderList(obj = {}): Observable<any> {
        let params = obj;
        return this.httpService.postJson('/CSP/PurchaseOrder/GetAll', params)
    }
    //创建采购订单
    getCreatePurchaseOrderInfo(obj): Observable<any> {
        let params = obj;
        return this.httpService.postJson('/CSP/PurchaseOrder/Create', params)
    }

    /*上传excel表格*/
    uploadExcel(params: any): Observable<any> {
        return this.http.post(environment.StoreUrl + '/Storage/CSPExcel/OrderImport', params)
    }

    /*确认修改记录已经被查看 */
    OrderHistoryConfirmed(id: number): Observable<any> {
        let params = { Id: id }
        return this.httpService.postJson('/CSP/PurchaseOrder/ViewChange', params)
    }
}

