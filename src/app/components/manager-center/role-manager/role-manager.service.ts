import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import * as Const from 'app/config/const';

@Injectable()
export class RoleManagerService {
    token: string;
    constructor (public http: Http){ 
        this.token = localStorage.getItem('token');
    }

    public getRoleList(): Observable<any>{
        return this.http.get(Const.BACKEND_API_ROOT_URL + '/dashboard/usercentre/listrole?token=' + this.token )
        .map((res: Response) => {
            return res.json();
        })
        .catch(( res: Response) => {
            return Observable.throw('获取角色列表失败!');
        })
    }

    public addRole(json: any): Observable<any>{
        return this.http.post(Const.BACKEND_API_ROOT_URL + '/dashboard/usercentre/registerrole',{
            token: this.token,
            name: json.name,
            description: json.description,      
            permission: json.permission,
        })
        .map((res: Response) => {
            return res.json();
        })
        .catch(( res: Response) => {
            return Observable.throw('添加角色失败!');
        })
    }

    public modifyRole(json: any): Observable<any>{
        return this.http.post(Const.BACKEND_API_ROOT_URL + '/dashboard/usercentre/modifyrole',{
            token: this.token,
            id: json.id,
            name: json.name,
            description: json.description,      
            permission: json.permission,
        })
        .map((res: Response) => {
            return res.json();
        })
        .catch(( res: Response) => {
            return Observable.throw('修改角色失败!');
        })
    }

    public deleteRole(id: string): Observable<any>{
        return this.http.get(Const.BACKEND_API_ROOT_URL + '/dashboard/usercentre/delete?token=' + this.token + '&id=' + id)
        .map((res: Response) => {
            return res.json();
        })
        .catch(( res: Response) => {
            return Observable.throw('删除角色失败!');
        })
    }
}