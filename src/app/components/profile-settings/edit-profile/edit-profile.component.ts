import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { EditProfileService } from './edit-profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [EditProfileService]
})
export class EditProfileComponent implements OnInit {

    user: any;
    profileForm: FormGroup;
    // Email
    primary_email = 'cipchk@qq.com';
    //img crop
    imageData: any;
    cropperSettings: CropperSettings;

    @ViewChild('cropper') cropper: ImageCropperComponent;

    constructor(fb: FormBuilder, public msg: NzMessageService, public editProfileService: EditProfileService) {
        this.profileForm = fb.group({
            name: [null, Validators.compose([Validators.required])],
            email: [null,Validators.email],
            phone: [null, Validators.pattern(/^[1][3,4,5,7,8][0-9]{9}$/)],
            old_password: [null, [Validators.required,this.samePwdValidator]],
            new_password: [null],
            confirm_new_password: [null,this.confirmationValidator],
        });

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;
        let canvasWidth = $(window).width()/4 - 20;
        this.cropperSettings.canvasWidth = canvasWidth;
        this.cropperSettings.canvasHeight = canvasWidth;
        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;
        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
        this.cropperSettings.rounded = true;
        this.imageData = {};
    }

    getFormControl(name) {
        return this.profileForm.controls[ name ];
    }

    profileSave(event, value) {
        console.log('profile value', value);
        this.editProfileService.modifyUser(value).subscribe((res: any) => {
            if(res.code === 0){
                this.msg.info('修改用户信息成功!');
            }else{
                this.msg.info('修改用户信息失败!');
            }
        })
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('User'));
        this.profileForm.patchValue({
            name: this.user.username,
            email: '',
            phone:'',
            old_password: this.user.userpasswd,
            new_password: '',
            confirm_new_password: '',
        });
    }

    fileChange($event) {
      const image: any = new Image();
      const file: File = $event.target.files[0];
      const myReader: FileReader = new FileReader();
      const that = this;
      myReader.onloadend = (loadEvent: any) => {
          image.src = loadEvent.target.result;
          that.cropper.setImage(image);
      };

      myReader.readAsDataURL(file);
  }

  updateConfirmValidator(){
      /** wait for refresh value */
      setTimeout(_ =>{
          this.profileForm.controls['confirm_new_password'].updateValueAndValidity();
      })
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } =>{
    if(!control.value){
        return null;
    }else if( control.value !== this.profileForm.controls['new_password'].value){
        return {
            confirm: true,
            error: true
        }
    }
  }

  samePwdValidator = (control: FormControl): {[s: string]: boolean} =>{
      if(!control.value){
          return {required: true};
      }else if( control.value !== this.user.userpasswd){
          return {
              notsamebefore: true,
              error: true
          }
      }
  }
}