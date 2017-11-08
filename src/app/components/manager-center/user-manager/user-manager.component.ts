import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
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

  constructor(private userManagerService: UserManagerService, private msg: NzMessageService) { }

  ngOnInit() {
    this.userManagerService.getUserList().subscribe( res => {
        this.userList = res;
    })
  }

  addUser(e){
    this.userManagerService.addUser(e).subscribe( res => {
      if(res.code === 0){
        this.msg.info('添加用户成功!')
      }else{
        this.msg.error('添加用户失败!')
      }
    })
  }

  editUser(e){
    this.userManagerService.modifyUser(e).subscribe( res => {
      if(res.code === 0){
        this.msg.info('修改用户成功!')
      }else{
        this.msg.error('修改用户失败!')
      }
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
        return this.userManagerService.deleteUser(id).toPromise();
      }
    })
    .then(res => {
      if(res){
        if(res.code === 0){
          this.userList = this.userList.filter(function(val){
            return (val.id !== id)
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
