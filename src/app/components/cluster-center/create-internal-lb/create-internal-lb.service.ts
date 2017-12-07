import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as AppUtil from '../../../config/const';

@Injectable()
export class CreateInternallbService {
  token: string;
  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
  }

  //创建新配置
  addinternal(json: any): Observable<Response>{
    return this.http.post(AppUtil.BACKEND_API_ROOT_URL + '/dashboard/clustercentre/loadbalancemng/addinternal',{
      "token": this.token,
      "name": json.name,
      "description": json.description,
      "port":json.port,
      "protocol":json.protocol,
      "appname":json.appname,
    })
    .map((res: Response) => {
      return res.json();
    })
    .catch((res: Response) => {
      return Observable.throw('创建内部负载均衡失败！');
    })
  }
}
