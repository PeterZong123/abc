import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { FormValidatorService } from '../../../shared/formValidator.service';

@Component({
  selector: 'config-modal',
  templateUrl: './config-modal.component.html',
  styleUrls: ['./config-modal.component.scss'],
})
export class ConfigModalComponent implements OnInit {

  public configForm: FormGroup;
  public formErrors: any;
  public currentModal;
  @Output()
  public addConfig: EventEmitter<any> = new EventEmitter();

  constructor(private modal: NzModalService,
    private fb: FormBuilder,
    private fValidatorService: FormValidatorService) {
      this.formErrors = this.fValidatorService.formErrors;
  }

  ngOnInit() {
    this.configForm = this.fb.group({
        'configfile':['',[Validators.required,Validators.pattern(new RegExp('^(\/[a-zA-Z0-9_]+){2,}\.[a-zA-Z0-9]+$'))]],
        'configdata':['',Validators.required]
    })
    this.configForm.valueChanges.subscribe(() => this.fValidatorService.onValueChanges(this.configForm));
  }

  showConfigModal(contentTpl,footerTpl){
    this.currentModal = this.modal.open({
      title: '添加配置文件',
      content: contentTpl,
      footer:footerTpl,
      width: 700,
    });
  }
 
  onSubmit(config,e){
    if(config.inValid){
      return;
    }
    this.currentModal.destroy('onOk');
    this.currentModal = null;
    console.log(config.value);
    this.addConfig.emit(config.value);
  }
  
}
