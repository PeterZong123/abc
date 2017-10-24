import { Component, OnInit,Inject } from '@angular/core';
import { ClusterService } from './my-cluster.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetAlert';

class SearchParam{
  public pageNo:Number;
  public pageSize:Number;

  constructor(){
    this.pageNo = 1;
    this.pageSize = 10;
  }
}

@Component({
  selector: 'app-my-cluster',
  templateUrl: './my-cluster.component.html',
  styleUrls: ['./my-cluster.component.scss'],
  providers: [ClusterService]
})
export class MyClusterComponent implements OnInit {

  public clusterList: Array<any>;
  public searchParam:SearchParam;
  public totalSize:Number;

  constructor(public clusterService: ClusterService,
              public router: Router,
              public activeRoute: ActivatedRoute) {
    this.searchParam = new SearchParam();
  }

  ngOnInit() {
    this.clusterService.getInfo({}).subscribe(
        res => {
          this.clusterList = res;
          this.totalSize = this.clusterList.length;
      },
        error => {
        console.log(error); }
    );
  }

  gotoPage(pagingInfo){
    this.searchParam.pageNo = pagingInfo.currentPage;
  }

  //删除集群
  delCluster(id: string){
    swal({
      title: '确认删除?',
      text: '删除后，集群文件将无法恢复!',
      icon: 'warning',
      buttons: ['取消','确认']
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
            '集群文件已经被移除.',
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
    
    // this.clusterService.delCluster(id).subscribe(res => {
    //   if(res.code === 0){
    //     this.clusterList = this.clusterList.filter(function(val){
    //       return (val.Cluster_Id !== id);
    //     })
    //   }else{
    //     alert('删除集群失败');
    //   }
    // })
    
  }
}
