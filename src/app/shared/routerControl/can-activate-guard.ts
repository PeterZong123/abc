import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { LoginService } from '../../pages/service/login.service';
import { environment } from './../../../environments/environment';
@Injectable()
export class CanActivateGuard implements  CanActivateChild{
  constructor(private router: Router, private loginService: LoginService){}
  
  canActivateChild(){
    if(!environment.production){
      return true;
    }
    if (this.loginService.loggedIn()){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      console.log('token验证失败');
      return false;
    }
  }
}
