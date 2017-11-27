import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

import { EditClusterService } from './edit-cluster.service';
import { ConfigManagerService } from '../config-manager/config-manager.service';
import { MyImageService } from '../../image-center/my-image/my-image.service';
import { QueryClusterService } from '../query-cluster/query-cluster.service'
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-edit-cluster',
  templateUrl: './edit-cluster.component.html',
  styleUrls: ['./edit-cluster.component.scss'],
  providers: [EditClusterService,ConfigManagerService,MyImageService,QueryClusterService]
})
export class EditClusterComponent implements OnInit {
  clusterForm: FormGroup;
  formErrors: any;
  configList: any;
  imageList: any;
  slideValue: number=0;
  priceInfo: string;
  flavorValue: string;

  constructor(private editClusterService: EditClusterService,
              private configManagerService: ConfigManagerService,
              private myImageService: MyImageService,
              private queryClusterService: QueryClusterService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private msg: NzMessageService,) {
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

    //获取应用信息
    this.activatedRoute.params.subscribe(params => {
      let clusterid = params['id'];
      this.queryClusterService.queryCluster(clusterid).subscribe(res =>{
        this.clusterForm.patchValue({
          'clustername': res.App_Name,
          'clusterdescription':res.App_Des,
          'imageid':res.Image_ID,
          'configid':res.Config_ID,
          'regionid':res.ENV_ID,
          'flavor':res.Flavor,
          'instancenumber':res.Replicas,
          'storage':res.Storage,
          'storagepath':'',
          'cmd':res.CMD
        })
      })
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

    this.clusterForm.controls['instancenumber'].valueChanges
    .debounceTime(400)
    .distinctUntilChanged().subscribe(res => {
      this.instanceChange(this.clusterForm);
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
    this.editClusterService.editCluster(data).subscribe((res: any) => {
      if(res.code === 0){
        this.msg.info('修改应用成功！');
        this.router.navigate(['/content/cluster-center/myCluster']);
      }else{
        this.msg.error('修改应用失败');
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
      this.editClusterService.getClusterprice(data).subscribe((res: any) =>{
        if(res.code ===0){
          this.priceInfo = res.detail;
        }else{
          console.log('获取应用价格信息失败！')
        }
      })
    } 
    
  }
}
