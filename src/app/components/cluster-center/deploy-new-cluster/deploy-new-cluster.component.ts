import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

import { DeployNewClusterService } from './deploy-new-cluster.service';
import { ConfigManagerService } from '../config-manager/config-manager.service';
import { MyImageService } from '../../image-center/my-image/my-image.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-deploy-new-cluster',
  templateUrl: './deploy-new-cluster.component.html',
  styleUrls: ['./deploy-new-cluster.component.scss'],
  providers: [DeployNewClusterService,ConfigManagerService,MyImageService]
})
export class DeployNewClusterComponent implements OnInit {
  clusterForm: FormGroup;
  formErrors: any;
  configList: any;
  imageList: any;
  slideValue: number=0;
  priceInfo: string;
  flavorValue: string;

  constructor(private deployNewClusterService: DeployNewClusterService,
              private configManagerService: ConfigManagerService,
              private myImageService: MyImageService,
              private router: Router,
              private fb: FormBuilder,
              private msg: NzMessageService) {
  }

  ngOnInit() {
    //构建表单
    this.clusterForm = this.fb.group({
      'clustername':['', [Validators.required,Validators.maxLength(50),Validators.pattern(/^[a-z][a-z0-9.-]*[a-z]$|^[a-z]$/)]],
      'clusterdescription':[''],
      'imageid':['', Validators.required],
      'configid':[''],
      'regionid':['', Validators.required],
      'flavor':['', Validators.required],
      'instancenumber':['', Validators.min(1)],
      'storage':[''],
      'storagepath':[''],
      'cmd':['',Validators.required]
    })

    //获取配置数据
    this.configManagerService.getInfo({}).subscribe(res => {
      this.configList =  res;
    }, error => {
      console.log(error);
    })
    //获取应用数据
    this.myImageService.getInfo({}).subscribe( res => {
      this.imageList = res;
      this.imageList.forEach(element => {
        element.tagName = element.name + ":" + element.tag;
      });
    }, error => {
      console.log(error);
    })
  }

  getFormControl(name) {
    return this.clusterForm.controls[ name ];
  }

  onSubmit(cluster){
    if(cluster.inValid){
      return;
    }
    let data = cluster.value;
    data.imageid = Number.parseInt(data.imageid);
    data.configid = Number.parseInt(data.configid);
    data.regionid = Number.parseInt(data.regionid);
    data.flavor = Number.parseInt(data.flavor);
    data.instancenumber = Number.parseInt(data.instancenumber);
    data.storage = Number.parseInt(data.storage);
    data.token = localStorage.getItem('token');
    this.deployNewClusterService.addCluster(data).subscribe((res: any) => {
      if(res.code === 0){
        this.msg.info('部署应用成功！');
        this.router.navigate(['/content/cluster-center/myCluster']);
      }else{
        alert('部署新应用失败');
      }
    })
  }

  //由于nzStep不同，所以应用规格变化，滑块初始化到默认位置
  flavorChange(){
    this.slideValue = 0;
  }
  //滑块改变
  instanceChange(cluster){
    let data = cluster.value;
    let reginonid = Number.parseInt(data.regionid);
    let flavor = Number.parseInt(data.flavor);
    let instancenumber = Number.parseInt(data.instancenumber);
    let storage = Number.parseInt(data.storage);
    if(reginonid !=undefined && flavor != undefined && instancenumber && storage){
      this.deployNewClusterService.getClusterprice(data).subscribe((res: any) =>{
        if(res.code ===0){
          this.priceInfo = res.detail;
        }else{
          console.log('获取应用价格信息失败！')
        }
      })
    } 
    
  }
}
