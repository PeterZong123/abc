import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {

  pwd = {
      old_password: '',
      new_password: '',
      confirm_new_password: ''
  };

  constructor(fb: FormBuilder, public msg: NzMessageService) {
  }

  pwdSave() {
      if (!this.pwd.old_password) {
          return this.msg.error('invalid old password');
      }
      if (!this.pwd.new_password) {
          return this.msg.error('invalid new password');
      }
      if (!this.pwd.confirm_new_password) {
          return this.msg.error('invalid confirm new password');
      }
      console.log('pwd value', this.pwd);
  }

  ngOnInit() {

  }
}