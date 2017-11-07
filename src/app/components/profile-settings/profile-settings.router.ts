import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
    {
        path: '', 
        redirectTo: 'profile',
        pathMatch: 'full'
    },
    {
        path: 'profile',// 修改资料
        component: EditProfileComponent
    }
]

export const ProfileRoutes = RouterModule.forChild(routes);