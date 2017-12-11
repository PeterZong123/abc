import { Routes, RouterModule } from '@angular/router';
import { MyServiceComponent } from './my-service/my-service.component';
import { PlatServiceComponent } from './plat-service/plat-service.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'myService',
        pathMatch: 'full'
    },
    {
        path: 'myService', //我的服务
        component: MyServiceComponent,
    },
    {
        path: 'platService', //平台服务
        component: PlatServiceComponent,
    }
]

export const ServiceRoutes = RouterModule.forChild(routes);