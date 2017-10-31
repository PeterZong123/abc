import { Routes, RouterModule } from '@angular/router';
import { ProfileSettingsComponent } from './profile-settings.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'profileSettings',
        pathMatch: 'full'
    },
    {
        path: 'profileSettings', // 个人信息设置
        component: ProfileSettingsComponent,
    },
]

export const ProfileRoutes = RouterModule.forChild(routes);