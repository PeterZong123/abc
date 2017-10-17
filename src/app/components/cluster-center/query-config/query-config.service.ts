import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as AppUtil from '../../../config/const';

@Injectable()
export class QueryConfigService {
  token: string;
  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
  }

  queryconfig(configid: string): Observable<Response>{
    return this.http.get(AppUtil.BACKEND_API_ROOT_URL + '/dashboard/clustercentre/configmng/queryconfig?token=' + this.token +'&configid=' + configid)
    .map((res: Response) => {
      return res.json();
    })
    .catch((res: Response) => {
      return Observable.throw('查询配置信息失败');
    })
  }
}
