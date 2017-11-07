import { Component, OnInit } from '@angular/core';
import { UserManagerService } from './user-manager.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss'],
  providers: [UserManagerService]
})
export class UserManagerComponent implements OnInit {

  private userList: Array<any> = [];

  constructor(private userManagerService: UserManagerService) { }

  ngOnInit() {
    this.userManagerService.getUserList().subscribe( res => {
      this.userList = res;
    })
  }

  deleteUser(id){
    swal({
      title: '确认删除?',
      text: '删除后，用户数据将无法恢复!',
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
        swal(
          '删除成功!',
          '配置文件已经被移除.',
          'success'
        )
      }
    })
    .then(res => {
      if(res){
        if(res.code === 0){
         
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
