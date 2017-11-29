import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as AppUtil from '../../../config/const';

@Injectable()
export class HistoryService {
  token: string;
  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
  }

  getList(startDate: string, endDate: string): Observable<Response>{
    return this.http.get(AppUtil.BACKEND_API_ROOT_URL + '/dashboard/listhistorys?token=' + this.token +'&startDate=' + startDate + '&endDate=' + endDate)
    .map((res: Response) => {
      return res.json();
    })
    .catch((res: Response) => {
      return Observable.throw('查询操作历史失败');
    })
  }

}
