import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { FormValidatorService } from '../../../shared/formValidator.service';
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
  envvariable: string;
  configList: Array<any>;
  configfile: string;
  configdata: string;

  constructor(private createConfigService: CreateConfigService,
    private router: Router,
    private fb: FormBuilder,
    private fValidatorService: FormValidatorService) {
      this.formErrors = this.fValidatorService.formErrors;
      this.envList = [];
      this.configList = [];
    }

  ngOnInit() {
    this.configForm = this.fb.group({
      'configname':['',[Validators.required,Validators.maxLength(50),Validators.pattern('[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*')]],
      'configdescription':[''],
      'envvariable':['',[Validators.required,Validators.pattern(new RegExp('^[^=]*=[^=]*$'))]],
      'configfile':['',[Validators.required,Validators.pattern(new RegExp('^(\/[a-zA-Z0-9_]+){2,}\.[a-zA-Z0-9]+$'))]],
      'configdata':['']
    })
    this.configForm.valueChanges.subscribe(() => this.fValidatorService.onValueChanges(this.configForm));
  }

  onSubmit(config){
    if(config.inValid){
      return;
    }
    let data = config.value;
    data.envvariable = this.filterEnvList(this.envList);
    data.configfile = this.filterConfigList(this.configList);
    this.createConfigService.addconfig(data).subscribe((res: any) => {
      if(res.code === 0){
        this.router.navigate(['/content/configManager']);
      }else{
        alert('创建新配置失败');
      }
    })
  }

  addEnv(){
    this.envList.push(this.envvariable);
  }

  delEnv(idx){
    this.envList.splice(idx,1);
  }

  addConfigfile(){
    let config = {
      name:this.configfile,
      data:this.configdata
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
      result[arr[0]] = arr[1];
    }
    return result;
  }

  filterConfigList(list){
    let result = {};
    for (let index = 0; index < list.length; index++) {
      let element = list[index];
      result[element['name']] = element['data'];
    }
    return result;
  }
}
