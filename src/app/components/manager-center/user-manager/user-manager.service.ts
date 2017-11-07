import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import * as Const from 'app/config/const';

@Injectable()
export class UserManagerService {
    token: string;
    constructor (public http: Http){ 
        this.token = localStorage.getItem('token');
    }

    public getUserList(): Observable<any>{
        return this.http.get(Const.BACKEND_API_ROOT_URL + '/dashboard/usercentre/list?token=' + this.token )
        .map((res: Response) => {
            return res.json();
        })
        .catch(( res: Response) => {
            return Observable.throw('获取用户列表失败!');
        })
    }
}