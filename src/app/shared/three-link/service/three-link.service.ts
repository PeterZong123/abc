import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class ThreeLinkService {

  constructor(private http: Http) { }

  get(url, params) {
    return this.http.get(url, {search: params}).map(result => result.json());
  }

  post(url, params) {
    return this.http.post(url, {search: params}).map(result => result.json());
  }

  // get(url, params) {
  //   return this.http.get(url, {search: params}).map(result=>result.json());
  // }

}
