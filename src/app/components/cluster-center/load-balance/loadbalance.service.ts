import { Injectable } from '@angular/core';
import { Observable } from '../../../../../node_modules/rxjs/Observable';
import { Http, Response } from '@angular/http';
import * as Const from '../../../config/const';

@Injectable()
export class LoadBalanceService {
  constructor(public http: Http) { }

  public getInfo(json: any):Observable<any>{

    return this.http.post(Const.BACKEND_API_ROOT_URL + '/getBalance',{})
      .map((res: Response) => {
        return res.json();
      });
  }

}
