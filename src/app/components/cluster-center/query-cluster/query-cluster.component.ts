import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryClusterService } from './query-cluster.service';

@Component({
  selector: 'app-query-cluster',
  templateUrl: './query-cluster.component.html',
  styleUrls: ['./query-cluster.component.scss'],
  providers: [QueryClusterService]
})
export class QueryClusterComponent implements OnInit {
  public clusterDetail: any;
  public replicaList: Array<any> = [];
  public currentPod: any = {};
  public showCard: number = 1;

  constructor(private queryClusterService: QueryClusterService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.clusterDetail = {
      "App_ID":"",
      "App_Name":"",
      "App_Des":"",
      "User_ID":"",
      "Tenant_ID":"",
      "ENV_ID":"",
      "Image_ID":"",
      "Image_Name":"",
      "Image_Url":"",
      "Config_ID":"",
      "Flavor":"",
      "Storage":"",
      "Persistent":undefined,
      "Replicas":"",
      "CMD":"",
      "Create_At":"",
      "Create_By":"",
      "Modified_At":"",
      "Modified_By":"",
      "Valid":undefined
    }
    this.activatedRoute.params.subscribe(params => {
      let clusterid = params['id'];
       //获取集群信息
      this.queryClusterService.queryCluster(clusterid).subscribe( res => {
        this.clusterDetail = res;
      })
      //获取副本列表
      this.queryClusterService.listpods(clusterid).subscribe( res => {
        this.replicaList = res;
      })
    })
    
  }

  //查看副本日志
  showLog(podname: string){
    this.showCard = 2;
    this.currentPod.name = podname;
    this.queryClusterService.podlogs(podname).subscribe( res =>{
      this.currentPod.log = res?res.log:'';
    })
  }

}
