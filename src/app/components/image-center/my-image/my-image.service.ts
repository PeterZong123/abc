import { Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs';
import '../../../../../node_modules/rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as Const from '../../../config/const';

@Injectable()
export class MyImageService {
  token: string;
  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
  }
  public getInfo(json: any):Observable<any>{

    return this.http.get(Const.BACKEND_API_ROOT_URL + '/dashboard/imagecentre/myimages/listimages?token='+this.token)
      .map((res: Response) => {
        return res.json();
      });
  }
}
