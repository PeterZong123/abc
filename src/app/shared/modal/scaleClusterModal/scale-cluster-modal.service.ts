import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as AppUtil from '../../../config/const';

@Injectable()
export class ScaleClusterModalService {
  token: string;
  constructor(private http: Http) { 
    this.token = localStorage.getItem('token');
  }
  //查询应用
  queryCluster(clusterid: string){
    return this.http.get(AppUtil.BACKEND_API_ROOT_URL + '/dashboard/clustercentre/clustermng/querycluster?token='+this.token+'&clusterid='+clusterid)
    .map((res: Response) =>{
      return res.json();
    })
    .catch((res: Response) =>{
      return Observable.throw('查询应用信息失败');
    })
  }
  //获取应用价格
  getClusterprice(json: any): Observable<Response>{
    return this.http.post(AppUtil.BACKEND_API_ROOT_URL+ '/dashboard/clustercentre/clustermng/newcluster/clusterprice',{
      "token": this.token,
      "regionid":json.regionid,
      "flavor":json.flavor,
      "instancenumber":json.instancenumber,
      "storage":json.storage
    })
    .map((res: Response) => {
      return res.json();
    })
    .catch((res: Response) => {
      return Observable.throw('部署新应用失败')
    })
  }
}
