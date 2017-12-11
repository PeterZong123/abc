import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { CreateExternallbService } from './create-external-lb.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-create-external-lb',
  templateUrl: './create-external-lb.component.html',
  styleUrls: ['./create-external-lb.component.scss'],
  providers: [CreateExternallbService]
})
export class CreateExternallbComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private createExternallbService: CreateExternallbService,
    private router: Router,
    private fb: FormBuilder,
    private msg: NzMessageService) {

    }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'name':['',[Validators.required,Validators.maxLength(50),Validators.pattern(/^[a-z][a-z0-9.-]*[a-z]$|^[a-z]$/)]],
      'description':['',[Validators.required]],
      'port':['',[Validators.required]],
      'protocol':['',[Validators.required]],
      'strategy':['',[Validators.required]],
      'appname':['',[Validators.required]],
      'serviceport':['',[Validators.required]],
    })
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  onSubmit(config){
    if(config.inValid){
      return;
    }
    let data = config.value;
    this.createExternallbService.addexternal(data).subscribe((res: any) => {
      if(res.code === 0){
        this.msg.info('创建外部负载均衡成功！')
        this.router.navigate(['/content/cluster-center/loadBalance']);
      }else{
        this.msg.error('创建外部负载均衡失败！');
      }
    })
  }

}