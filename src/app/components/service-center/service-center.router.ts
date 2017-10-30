import { Routes, RouterModule } from '@angular/router';
import { CacheServiceComponent } from './cache-service/cache-service.component';
import { CommonServiceComponent } from './common-service/common-service.component';
import { DataServiceComponent } from './data-service/data-service.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'cacheService',
        pathMatch: 'full'
    },
    {
        path: 'cacheService', //缓存服务
        component: CacheServiceComponent,
    },
    {
        path: 'commonService', //通用服务
        component: CommonServiceComponent,
    },
    {
        path: 'dataService', //数据服务
        component: DataServiceComponent,
    },
]

export const ServiceRoutes = RouterModule.forChild(routes);