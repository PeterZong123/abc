import { Component, OnInit } from '@angular/core';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  public str1:any;
  public str2:any;
  public str3:any;
  public str4:any;
  public str5:any;
  public str6:any;
  public str7:any;
  public str8:any;
  public str9:any;
  public str10:any;
  public str11:any;
  public str12:any;
  public str13:any;
  public str14:any;
  public str15:any;
  public str16:any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.str1 = 'str1';
    this.str2 = 'str2';
    this.str3 = 'str3';
    this.str4 = 'str4';
    this.str5 = 'str5';
    this.str6 = 'str6';
    this.str7 = 'str7';
    this.str8 = 'str8';
    this.str9 = 'str9';
    this.str10 = 'str10';
    this.str11 = 'str11';
    this.str12 = 'str12';
    this.str13 = 'str13';
    this.str14 = 'str14';
    this.str15 = 'str15';
    this.str16 = 'str16';
  }

}
