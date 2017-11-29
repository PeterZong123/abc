import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { LoginService } from '../../pages/service/login.service';
import { environment } from './../../../environments/environment';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class CanActivateGuard implements  CanActivateChild{
  constructor(private router: Router, private loginService: LoginService, private msg: NzMessageService){}
  
  canActivateChild(){
    if(!environment.production){
      return true;
    }
    if (this.loginService.loggedIn()){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      this.msg.error('用户token已过期！')
      return false;
    }
  }
}
