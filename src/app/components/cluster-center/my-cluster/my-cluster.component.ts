import { Component, OnInit,Inject } from '@angular/core';
import { ClusterService } from './my-cluster.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetAlert';

@Component({
  selector: 'app-my-cluster',
  templateUrl: './my-cluster.component.html',
  styleUrls: ['./my-cluster.component.scss'],
  providers: [ClusterService]
})
export class MyClusterComponent implements OnInit {

  public clusterList: Array<any> = [];
  public showScaleModal: Boolean = false;
  public tableLoading: boolean = true;

  constructor(public clusterService: ClusterService,
              public router: Router,
              public activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.clusterService.getInfo({}).subscribe(
        res => {
          this.clusterList = res;
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

  scaleCluster(data){
    console.log(data);
  }

}
