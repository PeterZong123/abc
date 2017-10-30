import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ManagerRoutes } from './manager-center.router';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { RoleManagerComponent } from './role-manager/role-manager.component';

@NgModule({
    declarations: [
        UserManagerComponent,
        RoleManagerComponent,
    ],
    imports: [
        ManagerRoutes,
        SharedModule,
    ],
    exports: [],
})

export class ManagerCenterModule { }