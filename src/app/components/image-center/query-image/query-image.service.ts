import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as AppUtil from 'app/config/const';

@Injectable()
export class QueryImageService {
  token: string;
  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
  }

  queryImage(image_id: string): Observable<Response>{
    return this.http.get(AppUtil.BACKEND_API_ROOT_URL + '/dashboard/imagecentre/myimages/status?token='+this.token+'&image_id=' + image_id)
    .map((res: Response) => {
      return res.json();
    })
    .catch((res: Response) => {
      return Observable.throw('查询镜像信息失败');
    })
  }

}
