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

  constructor(private createConfigService: CreateConfigService,
    private router: Router,
    private fb: FormBuilder,
    private fValidatorService: FormValidatorService) {
      this.formErrors = this.fValidatorService.formErrors;
    }

  ngOnInit() {
    this.configForm = this.fb.group({
      'configname':['',[Validators.required,Validators.maxLength(50),Validators.pattern('[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*')]],
      'configdescription':[''],
      'envvariable':['',Validators.required],
      'configfile':['',[Validators.required,Validators.pattern(new RegExp('^("(\/[a-zA-Z0-9_]+)+\.[a-zA-Z0-9]+":"[\\d\\D]*",)*("(\/[a-zA-Z0-9_]+)+\.[a-zA-Z0-9]+":"[\\d\\D]*")$'))]],
    })
    this.configForm.valueChanges.subscribe(() => this.fValidatorService.onValueChanges(this.configForm));
  }

  onSubmit(config){
    if(config.inValid){
      return;
    }
    let data = config.value;
    this.createConfigService.addconfig(data).subscribe((res: any) => {
      if(res.code === 0){
        this.router.navigate(['/content/configManager']);
      }else{
        alert('创建新配置失败');
      }
    })
  }


}
