import {Component, OnInit, ViewChild, AfterViewInit, Inject} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {CreateImageService} from './create-image.service';
import { BaseImageService } from '../base-image/base-image.service';
import {FileValidator} from '../../../shared/fileValidator.directive';
import { FormValidatorService } from '../../../shared/formValidator.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-create-image',
  templateUrl: './create-image.component.html',
  styleUrls: ['./create-image.component.scss'],
  providers: [CreateImageService, BaseImageService]
})
export class CreateImageComponent implements OnInit {

  creatImgForm: FormGroup;
  formErrors: any;
  baseImageList: Array<any>;

  constructor(private createImageService: CreateImageService,
    private baseImageService: BaseImageService,
    private router: Router,
    private fb: FormBuilder,
    private fvalidatorService: FormValidatorService) {
      this.formErrors = fvalidatorService.formErrors;
  }

  ngOnInit() {
   this.creatImgForm = this.fb.group({
     'image_name':['',[Validators.required,Validators.maxLength(50),Validators.pattern(/^[a-zA-Z]+[a-zA-Z0-9.-]*[a-zA-Z0-9]+$|^[a-zA-Z]+$/)]],
     'image_description':[''],
     'basic_image':['',Validators.required],
     'store_path':[''],
     'app_filename':['',FileValidator.validate],
   });
   this.creatImgForm.valueChanges.subscribe(() => this.fvalidatorService.onValueChanges(this.creatImgForm));

   //获取基础镜像
   this.baseImageService.getInfo({}).subscribe(
    res => {
      this.baseImageList = res;
    },
    error => {
      console.log('获取基础镜像失败');
    });
  }

  //提交表单，构建新镜像
  onSubmit(form){
    if(form.invalid){
      return;
    }
    let formData = new FormData();
    formData.append("image_name",form.value.image_name);
    formData.append("image_description",form.value.image_description);
    formData.append("basic_image",form.value.basic_image);
    formData.append("store_path",form.value.store_path);
    formData.append("app_filename",form.value.app_filename[0]);

    this.createImageService.createImg(formData).subscribe((res: any) =>{
      if(res.code === 0){
        this.router.navigate(['/content/myImage']);
      }else{
        alert("构建新镜像失败");
      }
    });
  }
}
