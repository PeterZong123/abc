import { Routes, RouterModule }  from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

import { MyImageComponent } from './components/image-center/my-image/my-image.component';
import { CreateImageComponent } from './components/image-center/create-image/create-image.component';
import { CanActivateGuard } from './shared/routerControl/can-activate-guard';
import { BaseImageComponent } from './components/image-center/base-image/base-image.component';
import { ConfigManagerComponent } from './components/cluster-center/config-manager/config-manager.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoadBalanceComponent } from './components/cluster-center/load-balance/loadbalance.component';
import { MyClusterComponent } from './components/cluster-center/my-cluster/my-cluster.component';
import { CreateConfigComponent } from './components/cluster-center/create-config/create-config.component';
import { DeployNewClusterComponent } from './components/cluster-center/deploy-new-cluster/deploy-new-cluster.component';
import { QueryConfigComponent } from './components/cluster-center/query-config/query-config.component';
import { QueryClusterComponent } from './components/cluster-center/query-cluster/query-cluster.component';
import { QueryImageComponent } from './components/image-center/query-image/query-image.component';
import { EditConfigComponent } from './components/cluster-center/edit-config/edit-config.component';

import { IndexComponent } from './index/index.component';
import { LoginComponent } from './pages/login.component';

const rootRouterConfig: Routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        component: IndexComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'content',
        component: LayoutComponent,
        canActivate: [CanActivateGuard],
        children: [
            {
                path: '', //  总揽
                component: DashboardComponent
            },
            {
                path: 'myImage', //我的镜像
                component: MyImageComponent,
                canActivate: [CanActivateGuard],
            },
            {
                path: 'createImage', //我的镜像-- 创建新镜像
                component: CreateImageComponent,
                canActivate: [CanActivateGuard],
            },
            {
                path: 'baseImage', //基础镜像
                component: BaseImageComponent,
                canActivate: [CanActivateGuard],
            },
            {
                path: 'configManager',  //配置管理
                component: ConfigManagerComponent,
                canActivate: [CanActivateGuard],
            },
            {
                path: 'createConfig',  //配置管理--创建新配置
                component: CreateConfigComponent,
                canActivate: [CanActivateGuard],
            },
            {
                path: 'queryConfig/:id', //配置管理--查询配置
                component: QueryConfigComponent,
                canActivate: [CanActivateGuard],
            },
            {
                path: 'myCluster',  //我的集群
                component: MyClusterComponent,
                canActivate: [CanActivateGuard],
            },
            {
                path: 'editConfig/:id', //配置管理--修改配置
                component: EditConfigComponent,
                canActivate: [CanActivateGuard]
            },
            {
                path: 'deployCluster',  //我的集群－－部署新集群
                component: DeployNewClusterComponent,
                canActivate: [CanActivateGuard],
            },

            {
                path: 'loadBalance', //负载均衡
                component: LoadBalanceComponent,
                canActivate: [CanActivateGuard],
            }
        ]
    },
    //{
    //    path: 'content',
    //    component: LayoutComponent,
    //    children: [
    //        { path: '', redirectTo: 'dashboard/v1', pathMatch: 'full' },
    //        { path: 'dashboard', redirectTo: 'dashboard/v1', pathMatch: 'full' },
    //        { path: 'dashboard/v1', component: DashboardV1Component, data: { translate: 'dashboard_v1' } },
    //        { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' },
    //        { path: 'elements', loadChildren: './elements/elements.module#ElementsModule' },
    //        { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
    //        { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
    //        { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
    //        { path: 'maps', loadChildren: './maps/maps.module#MapsModule' },
    //        { path: 'logics', loadChildren: './logics/logics.module#LogicsModule' },
    //        { path: 'extras', loadChildren: './extras/extras.module#ExtrasModule' }
    //    ]
    //},
    // 单页不包裹Layout
    //{ path: 'register', component: RegisterComponent, data: { translate: 'register' } },
    ////{ path: 'login', component: LoginComponent, data: { title: 'login' } },
    //{ path: 'forget', component: ForgetComponent, data: { translate: 'forget' } },
    //{ path: 'lock', component: LockComponent, data: { translate: 'lock' } },
    //{ path: 'maintenance', component: MaintenanceComponent },
    //{ path: '404', component: Page404Component },
    //{ path: '500', component: Page500Component },
    //{ path: '**', redirectTo: 'dashboard' }
];

export const AppRoute = RouterModule.forRoot(rootRouterConfig);
