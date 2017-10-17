/**
 * Created by liangzhifeng on 2017/10/22.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClusterCenterRoutingModule}  from './cluster-center.routes';

import { ConfigManagerComponent } from './config-manager/config-manager.component';
import { MyClusterComponent } from './my-cluster/my-cluster.component';
import { LoadBalanceComponent } from './load-balance/loadbalance.component';
import { CreateConfigComponent } from './create-config/create-config.component';
import { DeployNewClusterComponent } from './deploy-new-cluster/deploy-new-cluster.component';
import { QueryConfigComponent } from './query-config/query-config.component';
import { EditConfigComponent } from './edit-config/edit-config.component';
import { CanActivateGuard } from '../../shared/routerControl/can-activate-guard';
import { QueryClusterComponent } from './query-cluster/query-cluster.component';


@NgModule({
    imports: [
        CommonModule
    ],
    exports:[],
    declarations: [
        ConfigManagerComponent,
        MyClusterComponent,
        LoadBalanceComponent,
        CreateConfigComponent,
        DeployNewClusterComponent,
        QueryConfigComponent,
        EditConfigComponent,
        QueryClusterComponent
  ]
})
export class ClusterCenterModule { }

