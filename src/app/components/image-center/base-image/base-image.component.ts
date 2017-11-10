import { Component, OnInit,Inject } from '@angular/core';
import { BaseImageService } from './base-image.service';

@Component({
  selector: 'app-base-image',
  templateUrl: './base-image.component.html',
  styleUrls: ['./base-image.component.scss'],
  providers:[BaseImageService]
})
export class  BaseImageComponent implements OnInit {

  public list: Array<any> = [];
  public copyList: Array<any> = [];
  public tableLoading: boolean = true;

  constructor(private baseImageService:BaseImageService) {

  }

  ngOnInit() {
    this.baseImageService.getInfo({}).subscribe(
        res => {
          this.list = res;
          this.copyList = [...this.list];
          this.tableLoading = false;
      },
        error => {
          this.tableLoading = false;             
          console.log(error); 
        }
    );
  }

  //关键词搜索
  search(e,key){
    if(e){
      this.list = this.copyList.filter(function(val){
        return val[key].indexOf(e) > -1;
      })
    }else{
      this.list = this.copyList;
    }
  }
}
