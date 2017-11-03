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

  @Input()
  public type: number;
  @Output()
  public roleEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private modal: NzModalService,private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'userName':[null,[Validators.required]],
      'age':[null,[Validators.required,Validators.pattern(/^[1-9]\d?\d?$/)]],
      'address':[null,[Validators.required]],
    })
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
 
  onSubmit(validateForm){
    if(validateForm.inValid){
      return;
    }
    this.currentModal.destroy('onOk');
    this.currentModal = null;
    this.roleEmitter.emit(validateForm.value);
  }
  
}
