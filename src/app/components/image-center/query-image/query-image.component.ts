import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryImageService } from './query-image.service';

@Component({
  selector: 'app-query-image',
  templateUrl: './query-image.component.html',
  styleUrls: ['./query-image.component.scss'],
  providers:[QueryImageService]
})
export class QueryImageComponent implements OnInit {
  imageDetail: any;

  constructor(private queryImageService: QueryImageService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.imageDetail = {
      "id": "",
      "tenantid": "",
      "name": "",
      "description": "",
      "tag": "",
      "buildfrom": "",
      "uploadfile": "",
      "storepath": "",
      "jobname": "",
      "buildnumber": "",
      "buildstatus": "",
      "deployed": "",
      "createdby": "",
      "createdat": "",
      "deleted": ""
    }
    this.activatedRoute.params.subscribe(params => {
      this.queryImageService.queryImage(params['id']).subscribe(res => {
        this.imageDetail = res;
      })
    })
  }

}
