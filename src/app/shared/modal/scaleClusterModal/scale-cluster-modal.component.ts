import { Component, OnInit, EventEmitter, Input,Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'scale-cluster-modal',
  templateUrl: './scale-cluster-modal.component.html',
  styleUrls: ['./scale-cluster-modal.component.scss'],
})
export class ScaleClusterModalComponent implements OnInit {

  public validateForm: FormGroup;
  public currentModal;

  @Input()
  public flavor: number;
  @Output()
  public scaleCluster: EventEmitter<any> = new EventEmitter();

  constructor(private modal: NzModalService,private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'instancenumber':[0,[Validators.min(1)]],
    })
    console.log(this.flavor);
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
