import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

    profileForm: FormGroup;
    // Email
    primary_email = 'cipchk@qq.com';
    //img crop
    imageData: any;
    cropperSettings: CropperSettings;

    @ViewChild('cropper') cropper: ImageCropperComponent;

    constructor(fb: FormBuilder, public msg: NzMessageService) {
        this.profileForm = fb.group({
            name: [null, Validators.compose([Validators.required, Validators.pattern(`^[-_a-zA-Z0-9]{4,20}$`)])],
            email: '',
            bio: [null, Validators.maxLength(160)],
            url: '',
            company: '',
            location: ''
        });

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;
        this.cropperSettings.canvasWidth = $(window).width()/4 - 20;
        // this.cropperSettings.canvasHeight = 500;
        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;
        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
        this.cropperSettings.rounded = true;
        this.imageData = {};
    }

    get name() { return this.profileForm.get('name'); }

    profileSave(event, value) {
        console.log('profile value', value);
    }

    ngOnInit() {
        this.profileForm.patchValue({
            name: 'cipchk',
            email: 'cipchk@qq.com'
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
}