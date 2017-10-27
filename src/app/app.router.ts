import { Routes, RouterModule }  from '@angular/router';
import { CanActivateGuard } from './shared/routerControl/can-activate-guard';
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
              path: 'image-center',
              loadChildren: './components/image-center/image-center.module#ImageCenterModule'
            },
            {
              path: 'cluster-center',
              loadChildren: './components/cluster-center/cluster-center.module#ClusterCenterModule'
            },
            {
              path: 'myService',//我的服务
              component: DashboardComponent,
            },
            {
              path: 'platService',//平台服务
              component: DashboardComponent,
            }
          ]
    },
    { path: '**', redirectTo: 'login' }
];

export const AppRoute = RouterModule.forRoot(rootRouterConfig, { useHash: true });
