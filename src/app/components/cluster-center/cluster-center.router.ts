import { Routes, RouterModule } from '@angular/router';
import { ConfigManagerComponent } from './config-manager/config-manager.component';
import { MyClusterComponent } from './my-cluster/my-cluster.component';
import { CreateConfigComponent } from './create-config/create-config.component';
import { DeployNewClusterComponent } from './deploy-new-cluster/deploy-new-cluster.component';
import { QueryConfigComponent } from './query-config/query-config.component';
import { QueryClusterComponent } from './query-cluster/query-cluster.component';
import { EditConfigComponent } from './edit-config/edit-config.component';
import { LoadBalanceComponent } from './load-balance/loadbalance.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'configManager',
    pathMatch: 'full'
  },
  {
    path: 'configManager',  //配置管理
    component: ConfigManagerComponent,
  },
  {
    path: 'createConfig',  //配置管理--创建新配置
    component: CreateConfigComponent,
  },
  {
    path: 'queryConfig/:id', //配置管理--查询配置
    component: QueryConfigComponent,
  },
  {
    path: 'editConfig/:id', //配置管理--修改配置
    component: EditConfigComponent,
  },
  {
    path: 'myCluster',  //我的应用
    component: MyClusterComponent,
  },
  {
    path: 'deployCluster',  //我的应用－－部署新集群
    component: DeployNewClusterComponent,
  },
  {
    path: 'queryCluster/:id', //我的应用--查询集群
    component: QueryClusterComponent,
  },
  {
    path: 'loadBalance', //负载均衡
    component: LoadBalanceComponent,
  },
]

export const ClusterRoutes = RouterModule.forChild(routes);