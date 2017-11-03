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
  @Output()
  public scaleCluster: EventEmitter<any> = new EventEmitter();

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
      title: '应用扩容',
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
    this.scaleCluster.emit(validateForm.value);
  }
  
}
