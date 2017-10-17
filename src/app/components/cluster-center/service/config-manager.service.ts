import {Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as AppUtil from '../../../config/const';

@Injectable()
export class ConfigManagerService {

  constructor(private http:Http) { }

  getList(query: any): Observable<any>{
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    return this.http.get(AppUtil.BACKEND_API_ROOT_URL + '/report/searchDetail'+query).map((res: Response) => {
      console.log(res.json() as any[]);
      return res.json();
    }).catch((error: Response) => {
      return Observable.throw('获取列失败');
    });
  }

  downloadTabel(query: any): Observable<any> {
    return this.http.get(AppUtil.BACKEND_API_ROOT_URL + '/export/exportSearchDetail'+query).map((res: Response) => {
    }).catch((error: Response) => {
      return Observable.throw('下载失败');
    });
  }

}
