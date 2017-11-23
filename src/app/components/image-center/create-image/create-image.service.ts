import { Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as AppUtil from 'app/config/const';
import 'rxjs/add/operator/timeout'

@Injectable()
export class CreateImageService {

  token:String;
  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
  }

  getList(query: any): Observable<any[]>{
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    return this.http.get(AppUtil.BACKEND_API_ROOT_URL + '/report/wholeCount'+query).map((res: Response) => {
      console.log(res.json() as any[]);
      return res.json().data;
    }).catch((error: Response) => {
      return Observable.throw('获取列表失败');
    });
  }

  //构建新镜像
  createImg(formData: FormData): Observable<Response>{
    // let headers = new Headers({'timeout':60*1000});
    // let options = new RequestOptions({headers: headers});
    return this.http.post(AppUtil.BACKEND_API_ROOT_URL + '/dashboard/imagecentre/myimages/newimage/build?token='+this.token,formData)
    .timeout(5*60*1000)
    .map((res: Response) => {
      return res.json();
    }).catch((error: Response) => {
      alert('构建新镜像失败');
      return Observable.throw('构建新镜像失败');
    })
  } 
}
