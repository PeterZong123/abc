import { Routes, RouterModule }  from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
//
//import { MyImageComponent } from './components/image-center/my-image/my-image.component';
//import { CreateImageComponent } from './components/image-center/create-image/create-image.component';
//import { BaseImageComponent } from './components/image-center/base-image/base-image.component';
//import { ConfigManagerComponent } from './components/cluster-center/config-manager/config-manager.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
//import { LoadBalanceComponent } from './components/cluster-center/load-balance/loadbalance.component';
//import { MyClusterComponent } from './components/cluster-center/my-cluster/my-cluster.component';
//import { CreateConfigComponent } from './components/cluster-center/create-config/create-config.component';
//import { DeployNewClusterComponent } from './components/cluster-center/deploy-new-cluster/deploy-new-cluster.component';
//import { QueryConfigComponent } from './components/cluster-center/query-config/query-config.component';
//import { QueryClusterComponent } from './components/cluster-center/query-cluster/query-cluster.component';
//import { QueryImageComponent } from './components/image-center/query-image/query-image.component';
//import { EditConfigComponent } from './components/cluster-center/edit-config/edit-config.component';

import { IndexComponent } from './index/index.component';
import { LoginComponent } from './pages/login.component';
import { CanActivateGuard } from './shared/routerControl/can-activate-guard';

const rootRouterConfig: Routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        component: IndexComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: LayoutComponent,
        children: [
            {
                path: '', //  总揽
                component: DashboardComponent,
                canActivate: [CanActivateGuard]
            }
        ]
    },
    {
        path: 'cluster',//我的集群
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './components/cluster-center/cluster-center.module#ClusterCenterModule'
            }
        ]
    },
    {
        path: 'image',//我的镜像
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './components/image-center/image-center.module#ImageCenterModule'
            }
        ]
    },
    { path: '**', redirectTo: 'login' }
];

export const AppRoute = RouterModule.forRoot(rootRouterConfig);
