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
  @Input()
  public roleData: any;
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
      { label: 'create', value: 'create', checked: this.setCheckStatus('CICD','create')},
      { label: 'read', value: 'read', checked: this.setCheckStatus('CICD','read')},
      { label: 'update', value: 'update', checked: this.setCheckStatus('CICD','update')},
      { label: 'delete', value: 'delete', checked: this.setCheckStatus('CICD','delete')}
    ];
    this.configOptions = [
      { label: 'create', value: 'create', checked: this.setCheckStatus('ClusterConfiguration','create') },
      { label: 'read', value: 'read', checked: this.setCheckStatus('ClusterConfiguration','read')},
      { label: 'update', value: 'update', checked: this.setCheckStatus('ClusterConfiguration','update') },
      { label: 'delete', value: 'delete', checked: this.setCheckStatus('ClusterConfiguration','delete') }
    ];
    this.clusterOptions = [
      { label: 'create', value: 'create', checked: this.setCheckStatus('Cluster','create') },
      { label: 'read', value: 'read', checked: this.setCheckStatus('Cluster','read')},
      { label: 'update', value: 'update', checked: this.setCheckStatus('Cluster','update')},
      { label: 'delete', value: 'delete', checked: this.setCheckStatus('Cluster','delete') }
    ];
    //如果是修改modal,需要赋值
    if(this.type == 2){
      console.log(this.roleData);
      this.validateForm.patchValue({
        'name': this.roleData.name,
        'description': this.roleData.description,
      })
    }
  }

  //检测权限勾选状态
  setCheckStatus(key,target){
    if(this.type == 1){
      return false;
    }else{
      return this.roleData.permission[key].indexOf(target) > -1 ? true: false;
    }
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
 
  setPermission(validateForm){
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
    this.setPermission(validateForm);
    this.currentModal.destroy('onOk');
    this.currentModal = null;
    if(this.type == 2){
      validateForm.value.id = this.roleData.id;
    }
    this.roleEmitter.emit(validateForm.value);
  }
  
}
