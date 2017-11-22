import {Component, OnInit, ViewChild, AfterViewInit, Inject} from '@angular/core';
import {MyImageService} from './my-image.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-my-image',
  templateUrl: './my-image.component.html',
  styleUrls: ['./my-image.component.scss'],
  providers: [MyImageService]
})
export class MyImageComponent implements OnInit {

  public list: Array<any> = [];
  public copyList: Array<any> = [];
  public tableLoading: boolean = true;

  constructor(private myImageService: MyImageService, private router: Router) {

  }

  ngOnInit() {
    this.myImageService.getInfo({}).subscribe(
        res => {
        this.list = res?res:[];
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
