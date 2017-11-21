import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {

  public validateForm: FormGroup;
  public currentModal;

  @Input()
  public type: number;
  @Input()
  public userInfo: any;
  @Output()
  public userEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private modal: NzModalService,private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'userName':[null,[Validators.required]],
      'password':[null,[Validators.required,]],
      'email':[null,[Validators.email]],
      'telphone':[null,[Validators.pattern(/^[1][3,4,5,7,8][0-9]{9}$/)]],
    })

    if(this.type == 2 ){
      this.validateForm.patchValue({
        userName: this.userInfo.name,
        password: this.userInfo.password,
        email: this.userInfo.email,
        telphone: this.userInfo.telphone
      })
    }
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  showModal(contentTpl,footerTpl){
    this.currentModal = this.modal.open({
      title: this.type == 1 ? '添加用户': '修改用户',
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
    if(this.type == 2){
      validateForm.value.id = this.userInfo.id;
    }
    this.userEmitter.emit(validateForm.value);
  }
  
}
