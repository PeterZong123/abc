import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
// import { FormValidatorService } from '../../../shared/formValidator.service';
import { CreateConfigService } from './create-config.service';

@Component({
  selector: 'app-create-config',
  templateUrl: './create-config.component.html',
  styleUrls: ['./create-config.component.scss'],
  providers: [CreateConfigService]
})
export class CreateConfigComponent implements OnInit {

  configForm: FormGroup;
  formErrors: any;
  envList: Array<string>;
  configList: Array<any>;

  constructor(private createConfigService: CreateConfigService,
    private router: Router,
    private fb: FormBuilder) {
      this.envList = [];
      this.configList = [];
    }

  ngOnInit() {
    this.configForm = this.fb.group({
      'configname':['',[Validators.required,Validators.maxLength(50),Validators.pattern(/^[a-z][a-z0-9.-]*[a-z]$|^[a-z]$/)]],
      'configdescription':[''],
    })
  }

  getFormControl(name) {
    return this.configForm.controls[ name ];
  }

  onSubmit(config){
    if(config.inValid){
      return;
    }
    let data = config.value;
    data.token = localStorage.getItem('token');
    data.envvariable = this.filterEnvList(this.envList);
    data.configfile = this.filterConfigList(this.configList);
    this.createConfigService.addconfig(data).subscribe((res: any) => {
      if(res.code === 0){
        this.router.navigate(['/content/cluster-center/configManager']);
      }else{
        alert('创建新配置失败');
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
      let key = element['Config_File'];
      result[key] = element['Config_Data'];
    }
    return result;
  }
}
