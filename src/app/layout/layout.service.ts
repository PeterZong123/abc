import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import * as AppUtil from '../config/const';
import {Observable} from 'rxjs';


@Injectable()
export class LayoutService {
  token:String;
  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
  }

  layout(): Observable<Response> {
    return this.http.post(AppUtil.BACKEND_API_ROOT_URL + '/dashboard/usercentre/logout?token='+this.token,'').map(() => {
      console.log('退出成功');
    }).catch((error: Response) => {
      return Observable.throw('退出失败');
    });
  }

}
