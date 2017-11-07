import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import * as Const from 'app/config/const';

@Injectable()
export class EditProfileService {
    token: string;
    constructor (public http: Http){ 
        this.token = localStorage.getItem('token');
    }

    public modifyUser(json: any): Observable<any>{
        return this.http.post(Const.BACKEND_API_ROOT_URL + '/dashboard/usercentre/modify',{
            token: this.token,
            name: json.name,
            password: json.new_password ? json.new_password : json.old_password ,
            email: json.email,
            telphone: json.phone
        })
        .map((res: Response) => {
            return res.json();
        })
    }
}