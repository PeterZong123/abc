import { Component, OnInit, EventEmitter, Input,Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { ScaleClusterModalService } from './scale-cluster-modal.service';

@Component({
  selector: 'scale-cluster-modal',
  templateUrl: './scale-cluster-modal.component.html',
  styleUrls: ['./scale-cluster-modal.component.scss'],
  providers: [ScaleClusterModalService]
})
export class ScaleClusterModalComponent implements OnInit {

  public validateForm: FormGroup;
  public currentModal;
  public priceInfo: string;
  public clusterInfo: any;

  @Input()
  public clusterId: any;
  @Output()
  public scaleCluster: EventEmitter<any> = new EventEmitter();

  constructor(private modal: NzModalService,private fb: FormBuilder,private scaleClusterModalService:ScaleClusterModalService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'instancenumber':[0,[Validators.min(1)]],
    })
    this.scaleClusterModalService.queryCluster(this.clusterId).subscribe(res =>{
      this.clusterInfo = res;
      this.validateForm.controls['instancenumber'].valueChanges
      .debounceTime(400)
      .distinctUntilChanged().subscribe(res => {
        this.slideChange();
      })
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
  
  //滑块改变
  slideChange(){
    let flavor = Number.parseInt(this.clusterInfo.Replicas);
    if(flavor){
      this.scaleClusterModalService.getClusterprice(this.clusterInfo).subscribe((res: any) =>{
        if(res.code ===0){
          this.priceInfo = res.detail;
        }else{
          console.log('获取应用价格信息失败！')
        }
      })
    } 
  }
}
