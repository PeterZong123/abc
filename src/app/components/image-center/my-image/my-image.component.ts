import {Component, OnInit, ViewChild, AfterViewInit, Inject} from '@angular/core';
import {MyImageService} from './my-image.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';

class SearchParam{
  public pageNo:Number;
  public pageSize:Number;

  constructor(){
    this.pageNo = 1;
    this.pageSize = 10;
  }
}

@Component({
  selector: 'app-my-image',
  templateUrl: './my-image.component.html',
  styleUrls: ['./my-image.component.scss'],
  providers: [MyImageService]
})
export class MyImageComponent implements OnInit {

  public list: Array<any>;
  public searchParam:SearchParam;
  public totalSize:Number;

  constructor(private myImageService: MyImageService, private router: Router) {
     this.searchParam = new SearchParam();
  }

  ngOnInit() {
    this.myImageService.getInfo({}).subscribe(
        res => {
        this.list = res;
          this.totalSize = this.list.length;
      },
        error => {
        console.log('clusterInfo get');
        console.log(error); }
    );
  }

  gotoPage(pagingInfo){
    this.searchParam.pageNo = pagingInfo.currentPage;
    //this.queryData();
  }
}
