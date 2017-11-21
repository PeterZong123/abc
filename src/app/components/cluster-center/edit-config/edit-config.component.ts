import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { EditConfigService } from './edit-config.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-edit-config',
  templateUrl: './edit-config.component.html',
  styleUrls: ['./edit-config.component.scss'],
  providers: [EditConfigService]
})
export class EditConfigComponent implements OnInit {

  configDetail: any; 
  configForm: FormGroup;
  formErrors: any;
  envList: Array<string>;
  configList: Array<any>;

  constructor(private editConfigService: EditConfigService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private msg: NzMessageService) {
      this.envList = [];
      this.configList = [];
  }

  getFormControl(name) {
    return this.configForm.controls[ name ];
  }
  
  ngOnInit() {
    //建立动态表单
    this.configForm = this.fb.group({
      'configname':['',[Validators.required,Validators.maxLength(50),Validators.pattern(/^[a-z][a-z0-9.-]*[a-z]$|^[a-z]$/)]],
      'configdescription':[''],
    })
    //获取表单数据
    this.configDetail = {
      'id':'',
      'token':'',
      'configname':'',
      'configdescription':'',
      'envvariable':'',
      'configfile':''
    }
    this.configDetail.token = localStorage.getItem('token');
    this.configDetail.configname = this.activatedRoute.snapshot.queryParams.name;
    this.configDetail.configdescription = this.activatedRoute.snapshot.queryParams.des;
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.editConfigService.queryconfig(id).subscribe((res: any) => {
        this.configDetail.id = Number.parseInt(id);
        this.configDetail.envvariable = JSON.stringify(res.envlist);
        this.configDetail.configfile = JSON.stringify(res.configfiles);
        this.envList = this.changeEnvToEqual(res.envlist);
        this.configList = res.configfiles ? res.configfiles : [];
      })
    })
    
  }

  onSubmit(config){
    if(config.inValid){
      return;
    }
    let data = config.value;
    data.configid = this.configDetail.id;
    data.token = this.configDetail.token;
    data.envvariable = this.filterEnvList(this.envList);
    data.configfile = this.filterConfigList(this.configList);
    this.editConfigService.editconfig(data).subscribe((res: any) => {
      if(res.code === 0){
        this.msg.info('修改配置成功！');
        this.router.navigate(['/content/cluster-center/configManager']);
      }else{
        this.msg.error('修改配置失败！');
      }
    })
  }

  addEnv(env){
    this.envList.push(env.envvariable);
  }

  delEnv(idx){
    this.envList.splice(idx,1);
  }

  addConfig(con){
    let config = {
      Config_File:con.configfile,
      Config_Data:con.configdata
    }
    this.configList.push(config)
  }

  delConfigfile(idx){
    this.configList.splice(idx,1);
  }

  filterEnvList(list){
    let result = {};
    for (let index = 0; index < list.length; index++) {
      let element = list[index];
      let arr = element.split("=");
      let key = arr[0];
      result[key] = arr[1];
    }
    return result;
  }

  filterConfigList(list){
    let result = {};
    for (let index = 0; index < list.length; index++) {
      let element = list[index];
      let key =  element['Config_File'];
      result[key] = element['Config_Data'];
    }
    return result;
  }

  changeEnvToEqual(list){
    let result = [];
    if(list){
      for (let index = 0; index < list.length; index++) {
        let element = list[index];
        result.push(element['ENV_Key']+"="+element['ENV_Val']);
      }
    }
    return result;
  }
}
