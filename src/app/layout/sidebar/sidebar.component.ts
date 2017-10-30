import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@core/services/settings.service';
import { Router } from '@angular/router';

@Component({
  selector   : 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit{
    public user: any;

    constructor(public settings: SettingsService, public msgSrv: NzMessageService, public router: Router) {
    }

    ngOnInit(){
      let userString = localStorage.getItem('User');
      if(userString && userString !== ''){
        this.user = JSON.parse(userString);
      }
    }

    logout(){
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    }
}
