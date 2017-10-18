import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { FormValidatorService } from '../../../shared/formValidator.service';
import { DeployNewClusterService } from './deploy-new-cluster.service';

@Component({
  selector: 'app-deploy-new-cluster',
  templateUrl: './deploy-new-cluster.component.html',
  styleUrls: ['./deploy-new-cluster.component.scss'],
  providers: [DeployNewClusterService]
})
export class DeployNewClusterComponent implements OnInit {
  clusterForm: FormGroup;
  formErrors: any;

  constructor(@Inject('help') private helpService,
    private deployNewClusterService: DeployNewClusterService,
    private router: Router,
    private fb: FormBuilder,
    private fValidatorService: FormValidatorService) {
      this.formErrors = fValidatorService.formErrors;
    }

  ngOnInit() {
    this.clusterForm = this.fb.group({
      'clustername':['', [Validators.required,Validators.maxLength(50),Validators.pattern('[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*')]],
      'clusterdescription':[''],
      'imageid':['', Validators.required],
      'configid':['', Validators.required],
      'regionid':['', Validators.required],
      'flavor':['', Validators.required],
      'instancenumber':['', Validators.required],
      'storage':[''],
      'storagepath':[''],
      'cmd':['']
    })

    this.clusterForm.valueChanges.subscribe(() => this.fValidatorService.onValueChanges(this.clusterForm));
  }

  onSubmit(cluster){
    if(cluster.inValid){
      return;
    }
    let data = cluster.value;
    this.deployNewClusterService.addCluster(data).subscribe((res: any) => {
      if(res.code === 0){
        this.router.navigate(['/content/myCluster']);
      }else{
        alert('部署新集群失败');
      }
    })
  }
}
