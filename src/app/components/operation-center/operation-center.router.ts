import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { LogComponent } from './log/log.component';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorDetailComponent } from './monitor-detail/monitor-detail.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'monitor',
        pathMatch: 'full'
    },
    {
        path: 'history', //操作历史
        component: HistoryComponent,
    },
    {
        path: 'log', //日志服务
        component: LogComponent,
    },
    {
        path: 'monitor', //监控告警
        children: [
            {
                path: '',
                component: MonitorComponent,
            },
            {
                path: ':name',
                component:MonitorDetailComponent,
            }
        ]
    }
       
]

export const OperationRoutes = RouterModule.forChild(routes);