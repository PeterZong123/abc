import { Routes, RouterModule }  from '@angular/router';
import { CanActivateGuard } from './shared/routerControl/can-activate-guard';
import { SelectivePreloadingStrategy } from './shared/routerControl/selective-preloading-strategy';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
        canActivateChild: [CanActivateGuard],
        children: [
            {
              path: '', //  总揽
              redirectTo:'dashboard',
              pathMatch: 'full'
            },
            {
              path:'dashboard',
              component: DashboardComponent,
            },
            {
              path: 'image-center', // 镜像中心
              loadChildren: './components/image-center/image-center.module#ImageCenterModule',
              data: {
                preload: true
              }
            },
            {
              path: 'cluster-center',// 应用中心
              loadChildren: './components/cluster-center/cluster-center.module#ClusterCenterModule',
              data: {
                preload: true
              }
            },
            {
              path: 'service-center',// 服务中心
              loadChildren: './components/service-center/service-center.module#ServiceCenterModule',
              data: {
                preload: true
              }
            },
            {
              path: 'manager-center',// 管理中心
              loadChildren: './components/manager-center/manager-center.module#ManagerCenterModule',
              data: {
                preload: true
              }
            },
            {
              path: 'operation-center',// 运维中心
              loadChildren: './components/operation-center/operation-center.module#OperationCenterModule',
              data: {
                preload: true
              }
            },
            {
              path: 'profile-settings',// 个人信息设置
              loadChildren: './components/profile-settings/profile-settings.module#ProfileSettingsModule',
              data: {
                preload: true
              }
            },
          ]
    },
    { path: '**', redirectTo: 'login' }
];

export const AppRoute = RouterModule.forRoot(rootRouterConfig, { preloadingStrategy: SelectivePreloadingStrategy, useHash: true });
