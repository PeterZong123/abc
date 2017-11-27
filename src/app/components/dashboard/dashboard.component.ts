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
    this.str1 = '0';
    this.str2 = '0';
    this.str3 = '0';
    this.str4 = '0';
    this.str5 = '0';
    this.str6 = '0';
    this.str7 = '0';
    this.str8 = '0';
    this.str9 = '0';
    this.str10 = '0';
    this.str11 = '0';
    this.str12 = '0';
    this.str13 = '0';
    this.str14 = '0';
    this.str15 = '0';
    this.str16 = '0';
  }

}
