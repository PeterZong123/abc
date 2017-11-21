import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ClusterRoutes } from './cluster-center.router';

import { ConfigManagerComponent } from './config-manager/config-manager.component';
import { MyClusterComponent } from './my-cluster/my-cluster.component';
import { CreateConfigComponent } from './create-config/create-config.component';
import { DeployNewClusterComponent } from './deploy-new-cluster/deploy-new-cluster.component';
import { EditClusterComponent } from './edit-cluster/edit-cluster.component';
import { QueryConfigComponent } from './query-config/query-config.component';
import { QueryClusterComponent } from './query-cluster/query-cluster.component';
import { EditConfigComponent } from './edit-config/edit-config.component';
import { LoadBalanceComponent } from './load-balance/loadbalance.component';

@NgModule({
    declarations: [
        ConfigManagerComponent,
        MyClusterComponent,
        CreateConfigComponent,
        DeployNewClusterComponent,
        EditClusterComponent,
        QueryConfigComponent,
        QueryClusterComponent,
        EditConfigComponent,
        LoadBalanceComponent
    ],
    imports: [
        SharedModule,
        ClusterRoutes
    ],
    exports: []
})

export class ClusterCenterModule { }