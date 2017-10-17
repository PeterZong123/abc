import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as AppUtil from '../../../config/const';

@Injectable()
export class DeployNewClusterService {
  token: string;
  constructor(private http: Http) { 
    this.token = localStorage.getItem('token');
  }

  //部署新集群
  addCluster(json: any): Observable<Response>{
    return this.http.post(AppUtil.BACKEND_API_ROOT_URL+ '/dashboard/clustercentre/clustermng/newcluster/addcluster?token='+this.token,json)
    .map((res: Response) => {
      return res.json();
    })
    .catch((res: Response) => {
      return Observable.throw('部署新集群失败')
    })
  }
}
