/**
 * Created by liangzhifeng on 2017/10/22.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { ConfigManagerComponent } from './config-manager/config-manager.component';
import { MyClusterComponent } from './my-cluster/my-cluster.component';
import { LoadBalanceComponent } from './load-balance/loadbalance.component';
import { CreateConfigComponent } from './create-config/create-config.component';
import { DeployNewClusterComponent } from './deploy-new-cluster/deploy-new-cluster.component';
import { QueryConfigComponent } from './query-config/query-config.component';
import { EditConfigComponent } from './edit-config/edit-config.component';
import { CanActivateGuard } from '../../shared/routerControl/can-activate-guard';
import { QueryClusterComponent } from './query-cluster/query-cluster.component';

const routes:Routes = [
    {
        path: '',
        children: [
            {
                path: '',//我的集群
                component: MyClusterComponent,
                canActivate: [CanActivateGuard]
            },
            {
                path: 'deployCluster',//我的集群－－部署新集群
                component: DeployNewClusterComponent,
                canActivate: [CanActivateGuard]
            },
            {
                path: 'loadBalance',//负载均衡
                component: LoadBalanceComponent,
                canActivate: [CanActivateGuard]
            },
            {
                path: 'configManager',//配置管理
                component: ConfigManagerComponent,
                canActivate: [CanActivateGuard]
            },
            {
                path:'editConfig/:id',//配置管理--修改配置
                component: EditConfigComponent,
                canActivate: [CanActivateGuard]
            },
            {
                path: 'createConfig',//配置管理--创建新配置
                component: CreateConfigComponent,
                canActivate: [CanActivateGuard]
            },
            {
                path: 'queryConfig/:id',//配置管理--查询配置
                component: QueryConfigComponent,
                canActivate: [CanActivateGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClusterCenterRoutingModule {
}

