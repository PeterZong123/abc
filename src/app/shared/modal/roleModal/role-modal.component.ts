import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss'],
})
export class RoleModalComponent implements OnInit {

  public validateForm: FormGroup;
  public currentModal;
  public imageOptions: Array<any>;
  public configOptions: Array<any>;
  public clusterOptions: Array<any>;

  @Input()
  public type: number;
  @Output()
  public roleEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private modal: NzModalService,private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'name':[null,[Validators.required]],
      'description':[null],
      'imageOptions':[null],
      'configOptions':[null],
      'clusterOptions':[null],
    })
    this.imageOptions = [
      { label: 'create', value: 'create', checked: false },
      { label: 'read', value: 'read', checked: false},
      { label: 'update', value: 'update', checked: false },
      { label: 'delete', value: 'delete', checked: false }
    ];
    this.configOptions = [
      { label: 'create', value: 'create', checked: false },
      { label: 'read', value: 'read', checked: false},
      { label: 'update', value: 'update', checked: false },
      { label: 'delete', value: 'delete', checked: false }
    ];
    this.clusterOptions = [
      { label: 'create', value: 'create', checked: false },
      { label: 'read', value: 'read', checked: false},
      { label: 'update', value: 'update', checked: false },
      { label: 'delete', value: 'delete', checked: false }
    ];
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  showModal(contentTpl,footerTpl){
    this.currentModal = this.modal.open({
      title: '添加角色',
      content: contentTpl,
      footer:footerTpl,
    });
  }
 
  setPermissin(validateForm){
    let formValue = validateForm.value;
    formValue.permission = {
      CICD: "",
      ClusterConfiguration: "",
      Cluster: ""
    };
    formValue.imageOptions.forEach(element => {
      if(element.checked){
        if(formValue.permission['CICD'] == ""){
          formValue.permission['CICD'] = element.value;
        }else{
          formValue.permission['CICD'] += "," + element.value;
        }
      }
    });
    formValue.configOptions.forEach(element => {
      if(element.checked){
        if( formValue.permission['ClusterConfiguration'] == ""){
          formValue.permission['ClusterConfiguration'] =  element.value;
        }else{
          formValue.permission['ClusterConfiguration'] += "," + element.value;
        }
      }
    });
    formValue.clusterOptions.forEach(element => {
      if(element.checked){
        if(formValue.permission['Cluster'] ==""){
          formValue.permission['Cluster'] = element.value;
        }else{
          formValue.permission['Cluster'] += "," + element.value ;
        }
      }
    });
  }

  onSubmit(validateForm){
    if(validateForm.inValid){
      return;
    }
   
    this.setPermissin(validateForm);
    this.currentModal.destroy('onOk');
    this.currentModal = null;
    this.roleEmitter.emit(validateForm.value);
  }
  
}
