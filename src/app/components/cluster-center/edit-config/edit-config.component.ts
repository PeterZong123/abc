import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { FormValidatorService } from '../../../shared/formValidator.service';
import { EditConfigService } from './edit-config.service';
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

  constructor(private editConfigService: EditConfigService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private fValidatorService: FormValidatorService) {
      this.formErrors = this.fValidatorService.formErrors;
    }

  ngOnInit() {
    //建立动态表单
    this.configForm = this.fb.group({
      'configname':['',[Validators.required,Validators.maxLength(50),Validators.pattern('[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*')]],
      'configdescription':[''],
      'envvariable':['',Validators.required],
      'configfile':['',[Validators.required,Validators.pattern(new RegExp('^("(\/[a-zA-Z0-9_]+)+\.[a-zA-Z0-9]+":"[\\d\\D]*",)*("(\/[a-zA-Z0-9_]+)+\.[a-zA-Z0-9]+":"[\\d\\D]*")$'))]],
    })
    this.configForm.valueChanges.subscribe(() => this.fValidatorService.onValueChanges(this.configForm));
    //获取表单数据
    this.configDetail = {
      'id':'',
      'token':'',
      'name':'',
      'des':'',
      'envvariable':'',
      'configfile':''
    }
    this.configDetail.token = localStorage.getItem('token');
    this.configDetail.name = this.activatedRoute.snapshot.queryParams.name;
    this.configDetail.des = this.activatedRoute.snapshot.queryParams.des;
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.editConfigService.queryconfig(id).subscribe((res: any) => {
        this.configDetail.id = id;
        this.configDetail.envvariable = JSON.stringify(res.envlist);
        this.configDetail.configfile = JSON.stringify(res.configfiles);
      })
    })
    
  }

  onSubmit(config){
    if(config.inValid){
      return;
    }
    this.editConfigService.editconfig(this.configDetail).subscribe((res: any) => {
      if(res.code === 0){
        this.router.navigate(['/content/configManager']);
      }else{
        alert('修改配置失败');
      }
    })
  }
}
