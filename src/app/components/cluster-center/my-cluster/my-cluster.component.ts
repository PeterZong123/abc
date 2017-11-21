import { Component, OnInit,Inject } from '@angular/core';
import { ClusterService } from './my-cluster.service';
import { QueryClusterService } from '../query-cluster/query-cluster.service'
import { EditClusterService } from '../edit-cluster/edit-cluster.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetAlert';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-my-cluster',
  templateUrl: './my-cluster.component.html',
  styleUrls: ['./my-cluster.component.scss'],
  providers: [ClusterService,EditClusterService,QueryClusterService]
})
export class MyClusterComponent implements OnInit {

  public clusterList: Array<any> = [];
  public clusterCopyList: Array<any> = [];
  public showScaleModal: Boolean = false;
  public tableLoading: boolean = true;

  constructor(public clusterService: ClusterService,
              public queryClusterService: QueryClusterService,
              public editClusterService: EditClusterService,
              public router: Router,
              public activeRoute: ActivatedRoute,
              public msg: NzMessageService) {

  }

  ngOnInit() {
    this.clusterService.getInfo({}).subscribe(
        res => {
          this.clusterList = res;
          this.clusterCopyList = [...this.clusterList];
          this.tableLoading = false;
      },
        error => {
          this.tableLoading = false;
          console.log(error); }
    );
  }

  //删除应用
  delCluster(id: string){
    swal({
      title: '确认删除?',
      text: '删除后，应用文件将无法恢复!',
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
        return this.clusterService.delCluster(id).toPromise();
      }
    })
    .then( res => {
      if(res){
        if(res.code === 0){
          this.clusterList = this.clusterList.filter(function(val){
            return (val.Cluster_Id !== id);
          })
          this.clusterCopyList = [...this.clusterList];
          swal(
            '删除成功!',
            '应用文件已经被移除.',
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

  scaleCluster(id,data){
    this.queryClusterService.queryCluster(id).subscribe(res => {
      let json = {
        clustername: res.App_Name,
        clusterdescription: res.App_Des,
        imageid: res.Image_ID,
        configid: res.Config_ID,
        regionid: res.ENV_ID,
        flavor: res.Flavor, 
        instancenumber: data.instancenumber,
        storage: res.Storage,
        // storagepath: res.storage,
        cmd: res.CMD
      }
      this.editClusterService.editCluster(json).subscribe((res:any) =>{
        if(res.code === 0){
          this.msg.info('应用扩容成功！');
          this.router.navigate(['/content/cluster-center/myCluster']);
        }else{
          this.msg.error('应用扩容失败！');
        }
      })
    })
  }

  search(e,key){
    if(e){
      this.clusterList = this.clusterCopyList.filter(function(val){
        return val[key].indexOf(e) > -1;
      })
    }else{
      this.clusterList = this.clusterCopyList;
    }
   
  }
}
