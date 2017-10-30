import { Routes, RouterModule } from '@angular/router';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { RoleManagerComponent } from './role-manager/role-manager.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'userManager',
        pathMatch: 'full'
    },
    {
        path: 'userManager', //用户管理
        component: UserManagerComponent,
    },
    {
        path: 'roleManager', //角色管理
        component: RoleManagerComponent,
    },
]

export const ManagerRoutes = RouterModule.forChild(routes);