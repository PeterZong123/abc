import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditConfigService } from './edit-config.service';
@Component({
  selector: 'app-edit-config',
  templateUrl: './edit-config.component.html',
  styleUrls: ['./edit-config.component.scss'],
  providers: [EditConfigService]
})
export class EditConfigComponent implements OnInit {

  configDetail: any; 
  
  constructor(private editConfigService: EditConfigService,
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
      this.editConfigService.queryconfig(params['id']).subscribe((res: any) => {
        this.configDetail.envlist = JSON.stringify(res.envlist);
        this.configDetail.configfiles = JSON.stringify(res.configfiles);
      })
    })
    
  }

}
