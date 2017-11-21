import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { RoleManagerService } from './role-manager.service';

@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['./role-manager.component.scss'],
  providers: [RoleManagerService]
})
export class RoleManagerComponent implements OnInit {

  public roleList: Array<any> = [];
  public roleCopyList: Array<any> = [];
  public tableLoading: boolean = true;
  public permissionModal: any;

  constructor(private roleManagerService: RoleManagerService, private msg: NzMessageService, private modal: NzModalService) { }

  ngOnInit() {
    this.roleManagerService.getRoleList().subscribe(res => {
      this.roleList = res;
      this.roleCopyList = [...this.roleList];
      this.tableLoading = false;
    })
  }

  addRole(e){
    this.roleManagerService.addRole(e).subscribe(res => {
      if(res.code === 0){
        this.msg.info('添加角色成功!')
      }else{
        this.msg.info('添加角色失败!')
      }
    })
  }

  editRole(e){
    this.roleManagerService.modifyRole(e).subscribe(res => {
      if(res.code === 0){
        this.msg.info('修改角色成功!')
      }else{
        this.msg.info('修改角色失败!')
      }
    })
  }

  deleteRole(id){
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
        return this.roleManagerService.deleteRole(id).toPromise();
      }
    })
    .then(res => {
      if(res){
        if(res.code === 0){
          this.roleList = this.roleList.filter(function(val){
            return (val.id !== id)
          })
          this.roleCopyList = [...this.roleList];
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

  //关键词搜索
  search(e,key){
    if(e){
      this.roleList = this.roleCopyList.filter(function(val){
        return val[key].indexOf(e) > -1;
      })
    }else{
      this.roleList = this.roleCopyList;
    }
  }

  //查询权限
  showPermissionModal(title,modalContent,modalFooter){
    this.permissionModal = this.modal.open({
      title: title + '权限',
      content: modalContent,
      footer:modalFooter,
    })
  }
  //关闭modal
  closePermissionModal(){
    this.permissionModal.destroy('onOk');
    this.permissionModal = null;
  }
}