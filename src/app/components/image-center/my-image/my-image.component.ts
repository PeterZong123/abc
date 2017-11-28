import {Component, OnInit, ViewChild, Inject, OnDestroy} from '@angular/core';
import {MyImageService} from './my-image.service';
import {Router, NavigationStart} from '@angular/router';
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
  public timer: any;

  constructor(private myImageService: MyImageService, private router: Router) {
  }

  ngOnInit() {
    this.getList();
    setTimeout(() => {
      this.setImageTimer();
    }, 10*1000);
  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }

  //设置定时器
  setImageTimer(){
    let flag = false;
    this.list.forEach(element => {
      if(element.buildstatus == 'BUILDING'){
        flag = true;
        return;
      }
    });
    if(flag){
      this.timer = setInterval(()=>{
        this.getList();
      },10*1000)
    }
  }
  //获取列表
  getList(){
    this.myImageService.getInfo({}).subscribe(
      res => {
      this.list = res?res:[];
      this.copyList = [...this.list];
      this.tableLoading = false;
    },
      error => {
        this.tableLoading = false;
        console.log(error); 
    });
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
