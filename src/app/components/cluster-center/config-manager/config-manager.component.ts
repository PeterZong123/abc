import { Component, OnInit,Inject } from '@angular/core';
import swal from 'sweetAlert';
import {ConfigManagerService} from './config-manager.service';

class SearchParam{
  public pageNo:Number;
  public pageSize:Number;

  constructor(){
    this.pageNo = 1;
    this.pageSize = 10;
  }
}

@Component({
  selector: 'app-config-manager',
  templateUrl: './config-manager.component.html',
  styleUrls: ['./config-manager.component.scss'],
  providers:[ConfigManagerService]
})
export class ConfigManagerComponent implements OnInit {

  public list: Array<any> = [];
  public searchParam:SearchParam;
  public totalSize:Number;

  constructor(private configManagerService:ConfigManagerService) {
    this.searchParam = new SearchParam();
  }

  ngOnInit() {
    this.configManagerService.getInfo({}).subscribe(
        res => {
          this.list = res;
          this.totalSize = this.list.length;
      },
        error => {
        console.log(error); }
    );
  }

  gotoPage(pagingInfo){
    this.searchParam.pageNo = pagingInfo.currentPage;
    //this.queryData();
  }

  //删除配置
  delConfig(id){
    swal({
      title: '确认删除?',
      text: '删除后，配置文件将无法恢复!',
      icon: 'warning',
      buttons: {
        cancel: {
          text: '取消',
          closeModal: true,
          visible: true,
        },
        confirm: {
          text: '确认',
          closeModal: false
        }
      }
    })
    .then(willDelete => {
      if(willDelete){
          return this.configManagerService.deleteConfig(id).toPromise();
      }
    })
    .then(res => {
      if(res){
        if(res.code === 0){
          this.list = this.list.filter(function(val){
            return (val.Row_ID !== id)
          })
          swal(
            '删除成功!',
            '配置文件已经被移除.',
            'success'
          )
        }else{
          swal(
            '删除失败!',
            '服务器网络出现问题.',
            'error'
          )
        }
      }
    })
   
  }
}
