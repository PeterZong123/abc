import { Component } from '@angular/core';
import { LoginService } from './service/login.service';
import { LoginRequest  } from './model/login.request';
import { Router } from '@angular/router';
import * as AppUtil from '../config/const';


@Component({
  templateUrl: 'login.component.html',
  styleUrls:['login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent {
  showModal: boolean;
  loginRequest: LoginRequest;
  constructor(private loginService: LoginService, private router: Router) { }


  login(username, password){
    this.loginRequest = {
      username: username,
      userpasswd: password
    };
    if(this.loginRequest.username ===''||this.loginRequest.userpasswd ===''){
      alert('用户名和密码不能为空');
      return;
    }
    this.loginService.login(this.loginRequest).subscribe( (res: any) => {
      if(res.code === 0){
        this.router.navigate(['/content']);
        localStorage.setItem('token', res.detail);
        localStorage.setItem('User', JSON.stringify(this.loginRequest));
      }else{
        alert(res.detail);
      }
    });
  }

}
