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
    }

  ngOnInit() {
    this.configForm = this.fb.group({
      'configname':['',[Validators.required,Validators.maxLength(50),Validators.pattern('[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*')]],
      'configdescription':[''],
      'envvariable':['',Validators.required],
      'configfile':['',Validators.required],
    })
    this.configForm.valueChanges.subscribe(() => this.fValidatorService.onValueChanges(this.configForm));
    
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
