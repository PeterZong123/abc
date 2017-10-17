import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThreeLinkService } from './service/three-link.service';
import * as AppUtils from '../../config/const';
import {URLSearchParams} from '@angular/http';

@Component({
  selector: 'app-three-link',
  templateUrl: './three-link.component.html',
  styleUrls: ['./three-link.component.scss'],
  providers: [ThreeLinkService]
})
export class ThreeLinkComponent implements OnInit {
  // 输出以下参数
  @Output() provinceOut = new EventEmitter();
  @Output() cityOut = new EventEmitter();
  @Output() countryOut = new EventEmitter();

  province = '';
  city = '';
  country = '';
  provinceData: Array<Object>;
  cityData: Array<Object>;
  countryData: Array<Object>;
  constructor(private threeLinkService: ThreeLinkService) {
    // this.province = "";
    // this.city = "";
    // this.country = "";
    this.provinceData = [];
    this.cityData = [];
    this.countryData = [];
  }

  ngOnInit() {
    const params = new URLSearchParams();
    const url = AppUtils.BACKEND_API_ROOT_URL + '/province';
    this.threeLinkService.get(url, params).subscribe(res => {
      console.log(res);
      this.provinceData = res;
    });
    // this.provinceChange();
    // this.cityChange();
    // this.countryChange();
  }
  // 选择省份, 查询相应的市
  provinceChange() {
    // 选择省份的时候发射省份给父组件
    this.provinceOut.emit(this.province);
    const params = new URLSearchParams();
    params.set('ProID', this.province);
    params.set('callback', 'JSONP_CALLBACK');
    const url = AppUtils.BACKEND_API_ROOT_URL + '/city';
    this.threeLinkService.get(url, params).subscribe(res => {
      console.log(res);
      this.cityData = res;
    });
    this.countryData = [];
  }

  // 选择市, 查询相应的县
  cityChange() {

    // 选择市的时候发射市给父组件
    this.cityOut.emit(this.city);
    const params = new URLSearchParams();
    params.set('CityID', this.city);
    params.set('callback', 'JSONP_CALLBACK');
    const url = AppUtils.BACKEND_API_ROOT_URL + '/country';
    this.threeLinkService.get(url, params).subscribe(res => {
      console.log(res);
      this.countryData = res;
    });
  }

  // 选择市的时候发射县给父组件
  countryChange() {
    this.countryOut.emit(this.country);
  }

}
