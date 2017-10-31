import { Routes, RouterModule } from '@angular/router';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
    {
        path: '', 
        redirectTo: 'profile',
        pathMatch: 'full'
    },
    {
        path: 'password',// 修改密码
        component: EditPasswordComponent
    },
    {
        path: 'profile',// 修改资料
        component: EditProfileComponent
    }
]

export const ProfileRoutes = RouterModule.forChild(routes);