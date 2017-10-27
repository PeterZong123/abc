import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { LoginService } from '../../pages/service/login.service';

@Injectable()
export class CanActivateGuard implements  CanActivateChild{
  constructor(private router: Router, private loginService: LoginService){}

  canActivateChild(){
    return true;
    // if (this.loginService.loggedIn()){
    //   return true;
    // }else{
    //   this.router.navigateByUrl('/login');
    //   console.log('token验证失败');
    //   return false;
    // }
  }
}
