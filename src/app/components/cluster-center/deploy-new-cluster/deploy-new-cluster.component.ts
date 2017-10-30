import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { FormValidatorService } from '../../../shared/formValidator.service';
import { DeployNewClusterService } from './deploy-new-cluster.service';
import { ConfigManagerService } from '../config-manager/config-manager.service';
import { MyImageService } from '../../image-center/my-image/my-image.service';

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

  constructor(private deployNewClusterService: DeployNewClusterService,
              private configManagerService: ConfigManagerService,
              private myImageService: MyImageService,
              private router: Router,
              private fb: FormBuilder,
              private fValidatorService: FormValidatorService) {
      this.formErrors = fValidatorService.formErrors;
  }

  ngOnInit() {
    //构建表单
    this.clusterForm = this.fb.group({
      'clustername':['', [Validators.required,Validators.maxLength(50),Validators.pattern(/^[a-z][a-z0-9.-]*[a-z]$|^[a-z]$/)]],
      'clusterdescription':[''],
      'imageid':['', Validators.required],
      'configid':['', Validators.required],
      'regionid':['', Validators.required],
      'flavor':['', Validators.required],
      'instancenumber':['', Validators.min(1)],
      'storage':[''],
      'storagepath':[''],
      'cmd':['',Validators.required]
    })
    this.clusterForm.valueChanges.subscribe(() => this.fValidatorService.onValueChanges(this.clusterForm));

    //获取配置数据
    this.configManagerService.getInfo({}).subscribe(res => {
      this.configList =  res;
    }, error => {
      console.log(error);
    })
    //获取应用数据
    this.myImageService.getInfo({}).subscribe( res => {
      this.imageList = res;
    }, error => {
      console.log(error);
    })
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
}
