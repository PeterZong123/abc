import { Component, OnInit,Inject } from '@angular/core';
import { BaseImageService } from './base-image.service';

class SearchParam{
  public pageNo:Number;
  public pageSize:Number;

  constructor(){
    this.pageNo = 1;
    this.pageSize = 10;
  }
}

@Component({
  selector: 'app-base-image',
  templateUrl: './base-image.component.html',
  styleUrls: ['./base-image.component.scss'],
  providers:[BaseImageService]
})
export class  BaseImageComponent implements OnInit {

  public clusterList: Array<any>;
  public searchParam:SearchParam;
  public totalSize:Number;

  constructor(private baseImageService:BaseImageService) {
    this.searchParam = new SearchParam();
  }

  ngOnInit() {
    this.baseImageService.getInfo({}).subscribe(
        res => {
          this.clusterList = res;
          this.totalSize = this.clusterList.length;
      },
        error => {
        console.log('clusterInfo get');
        console.log(error); }
    );
    //this.activeRoute.params.subscribe(
    //    params => this.getUsersByPage(params['page'])
    //);
  }

  gotoPage(pagingInfo){
    this.searchParam.pageNo = pagingInfo.currentPage;
    //this.queryData();
  }
}
