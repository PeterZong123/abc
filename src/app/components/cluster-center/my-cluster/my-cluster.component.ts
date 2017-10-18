import { Component, OnInit,Inject } from '@angular/core';
import { ClusterService } from './my-cluster.service';
//import { DataTableModule } from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';

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
    this.clusterService.delCluster(id).subscribe(res => {
      if(res.code === 0){
        this.clusterList = this.clusterList.filter(function(val){
          return (val.Cluster_Id !== id);
        })
      }else{
        alert('删除集群失败');
      }
    })
  }
}
