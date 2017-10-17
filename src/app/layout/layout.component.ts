import {Component, OnInit} from '@angular/core';
import {LayoutService} from './layout.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    providers: [LayoutService]
})
export class LayoutComponent implements OnInit {

    constructor(private layoutService: LayoutService, private router: Router) {
    }

    public disabled = false;
    public status: {isopen: boolean} = {isopen: false};

    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    ngOnInit(): void {
    }

    layout() {
        this.layoutService.layout().subscribe(() => {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/login');
        }, (error) => {
            console.log(error);
            this.router.navigateByUrl('/login');
        });
    }
}


//import { Component } from '@angular/core';
//import { Router, NavigationEnd, RouteConfigLoadStart, NavigationError } from '@angular/router';
//
//import { SettingsService } from '@core/services/settings.service';
//import { MenuService } from '@core/services/menu.service';
//import { ScrollService } from '@core/services/scroll.service';
//import { NzMessageService } from 'ng-zorro-antd';
//
//@Component({
//    selector: 'app-layout',
//    templateUrl: './layout.component.html'
//})
//export class LayoutComponent {
//    isFetching = false;
//
//    constructor(
//        router: Router,
//        scroll: ScrollService,
//        private _message: NzMessageService,
//        public menuSrv: MenuService,
//        public settings: SettingsService) {
//        // scroll to top in change page
//        router.events.subscribe(evt => {
//            if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
//                this.isFetching = true;
//            }
//            if (evt instanceof NavigationError) {
//                this.isFetching = false;
//                _message.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
//                return;
//            }
//            if (!(evt instanceof NavigationEnd)) {
//                return;
//            }
//            setTimeout(() => {
//                scroll.scrollToTop();
//                this.isFetching = false;
//            }, 100);
//        });
//    }
//}
