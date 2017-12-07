import {Component, OnInit, ViewChild, AfterViewInit, Inject} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {CreateImageService} from './create-image.service';
import { BaseImageService } from '../base-image/base-image.service';
import {FileValidator} from '../../../shared/fileValidator.directive';
import {Router} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

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
    private msg: NzMessageService) {
      
  }

  ngOnInit() {
   this.creatImgForm = this.fb.group({
     'image_name':['',[Validators.required,Validators.maxLength(50),Validators.pattern(/^[a-zA-Z]+[a-zA-Z0-9.-]*[a-zA-Z0-9]+$|^[a-zA-Z]+$/)]],
     'image_description':['',Validators.required],
     'basic_image':['',Validators.required],
     'store_path':['',[Validators.required,Validators.pattern(/^\/([0-9A-Za-z]+\/)+$/)]],
     'app_filename':['',FileValidator.validate],
   });

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

    this.router.navigate(['/content/image-center/myImage']);
    this.createImageService.createImg(formData).subscribe((res: any) =>{
      if(res.code === 0){
        this.msg.info('开始构建新镜像！')
      }else{
        this.msg.error("构建新镜像失败！");
      }
    });
  }

  getFormControl(name) {
    return this.creatImgForm.controls[ name ];
  }
}
