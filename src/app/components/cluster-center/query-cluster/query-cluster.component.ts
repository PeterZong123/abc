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
  public replicaList: Array<any>;

  constructor(private queryClusterService: QueryClusterService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.replicaList =[
      {
        status: 'success',
        IP: '192.168.1.1'
      }
    ]
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
      this.queryClusterService.QueryCluster(params['id']).subscribe( res => {
        this.clusterDetail = res;
      })
    })
  }

}
