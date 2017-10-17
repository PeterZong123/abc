import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryConfigService } from './query-config.service';

@Component({
  selector: 'app-query-config',
  templateUrl: './query-config.component.html',
  styleUrls: ['./query-config.component.scss'],
  providers: [QueryConfigService]
})
export class QueryConfigComponent implements OnInit {

  configDetail: any; 
  
  constructor(private queryConfigService: QueryConfigService,
    private activatedRoute: ActivatedRoute) {
    }

  ngOnInit() {
    this.configDetail = {
      'id':'',
      'name':'',
      'des':'',
      'envlist':'',
      'configfiles':''
    }
    this.configDetail.name = this.activatedRoute.snapshot.queryParams.name;
    this.configDetail.des = this.activatedRoute.snapshot.queryParams.des;
    this.activatedRoute.params.subscribe(params => {
      this.queryConfigService.queryconfig(params['id']).subscribe((res: any) => {
        this.configDetail.envlist = JSON.stringify(res.envlist);
        this.configDetail.configfiles = JSON.stringify(res.configfiles);
      })
    })
    
  }

}
