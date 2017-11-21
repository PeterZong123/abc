import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as AppUtil from '../../../config/const';

@Injectable()
export class QueryClusterService {
  token: string;
  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
  }

  queryCluster(clusterid: string){
    return this.http.get(AppUtil.BACKEND_API_ROOT_URL + '/dashboard/clustercentre/clustermng/querycluster?token='+this.token+'&clusterid='+clusterid)
    .map((res: Response) =>{
      return res.json();
    })
    .catch((res: Response) =>{
      return Observable.throw('查询应用信息失败');
    })
  }

  listpods(clusterid: string){
    return this.http.get(AppUtil.BACKEND_API_ROOT_URL + '/dashboard/clustercentre/clustermng/listpods?token='+this.token+'&clusterid='+clusterid)
    .map((res: Response) =>{
      return res.json();
    })
    .catch((res: Response) =>{
      return Observable.throw('获取副本列表失败');
    })
  }

  podlogs(podname: string){
    return this.http.get(AppUtil.BACKEND_API_ROOT_URL + '/dashboard/clustercentre/clustermng/podlogs?token='+this.token+'&podname='+podname)
    .map((res: Response) =>{
      return res.json();
    })
    .catch((res: Response) =>{
      return Observable.throw('获取副本日志失败');
    })
  }
}
