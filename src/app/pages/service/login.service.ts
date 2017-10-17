import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import * as AppUtils from '../../config/const';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class LoginService {

  address: string;
  constructor(private http: Http) {
    // console.log('正在运行loginService构造函数');
  }

  login(loginRequest): Observable<Response>{
    return this.http.post(AppUtils.BACKEND_API_ROOT_URL + '/dashboard/usercentre/login', JSON.stringify(loginRequest)).map((res: Response) => {
        return res.json();
    }).catch((error: Response) => {
        alert('服务器出错');
        return Observable.throw('登录失败');
    });
  }

  loggedIn(){
    return tokenNotExpired();
  }

}
