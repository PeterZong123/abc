import { Component, OnInit,Inject } from '@angular/core';
import swal from 'sweetAlert';
import {ConfigManagerService} from './config-manager.service';

@Component({
  selector: 'app-config-manager',
  templateUrl: './config-manager.component.html',
  styleUrls: ['./config-manager.component.scss'],
  providers:[ConfigManagerService]
})
export class ConfigManagerComponent implements OnInit {

  public list: Array<any> = [];
  public copyList: Array<any> = [];
  public tableLoading: boolean = true;

  constructor(private configManagerService:ConfigManagerService) {
    
  }

  ngOnInit() {
    this.configManagerService.getInfo({}).subscribe(
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
          this.copyList = [...this.list];
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
