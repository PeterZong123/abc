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
        return this.http.get(Const.BACKEND_API_ROOT_URL + '/dashboard/usercentre/listuser?token=' + this.token )
        .map((res: Response) => {
            return res.json();
        })
        .catch(( res: Response) => {
            return Observable.throw('获取用户列表失败!');
        })
    }

    public addUser(json: any): Observable<any>{
        return this.http.post(Const.BACKEND_API_ROOT_URL + '/dashboard/usercentre/registeruser',{
            token: this.token,
            name: json.name,      
            password: json.password,
            email: json.email,
            telphone: json.telphone
        })
        .map((res: Response) => {
            return res.json();
        })
        .catch(( res: Response) => {
            return Observable.throw('添加用户失败!');
        })
    }

    public modifyUser(json: any): Observable<any>{
        return this.http.post(Const.BACKEND_API_ROOT_URL + '/dashboard/usercentre/modifyuser',{
            token: this.token,
            id: json.id,
            name: json.name,      
            password: json.password,
            email: json.email,
            telphone: json.telphone
        })
        .map((res: Response) => {
            return res.json();
        })
        .catch(( res: Response) => {
            return Observable.throw('修改用户失败!');
        })
    }

    public deleteUser(id: string): Observable<any>{
        return this.http.get(Const.BACKEND_API_ROOT_URL + '/dashboard/usercentre/deleteuser?token=' + this.token + '&id=' + id)
        .map((res: Response) => {
            return res.json();
        })
        .catch(( res: Response) => {
            return Observable.throw('删除用户失败!');
        })
    }
}