import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { FormValidatorService } from '../../../shared/formValidator.service';

@Component({
  selector: 'env-modal',
  templateUrl: './env-modal.component.html',
  styleUrls: ['./env-modal.component.scss'],
})
export class EnvModalComponent implements OnInit {

  public configForm: FormGroup;
  public formErrors: any;
  public currentModal;
  @Output()
  public addEnv: EventEmitter<any> = new EventEmitter();

  constructor(private modal: NzModalService,
    private fb: FormBuilder,
    private fValidatorService: FormValidatorService) {
      this.formErrors = this.fValidatorService.formErrors;
  }

  ngOnInit() {
    this.configForm = this.fb.group({
      'envvariable':['',[Validators.required,Validators.pattern(new RegExp('^[^=]*=[^=]*$'))]],
    })
    this.configForm.valueChanges.subscribe(() => this.fValidatorService.onValueChanges(this.configForm));
  }

  showEnvModal(contentTpl,footerTpl){
    this.currentModal = this.modal.open({
      title: '添加环境变量',
      content: contentTpl,
      footer:footerTpl,
      
    });
  }
 
  onSubmit(config,e){
    if(config.inValid){
      return;
    }
    this.currentModal.destroy('onOk');
    this.currentModal = null;
    console.log(config.value);
    this.addEnv.emit(config.value);
  }
  
}
