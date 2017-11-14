import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AngularEchartsModule } from 'ngx-echarts';
import { OperationRoutes } from './operation-center.router';
import { HistoryComponent } from './history/history.component';
import { LogComponent } from './log/log.component';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorDetailComponent } from './monitor-detail/monitor-detail.component';

@NgModule({
    declarations: [
        HistoryComponent,
        LogComponent,
        MonitorComponent,
        MonitorDetailComponent
    ],
    imports: [
        OperationRoutes,
        AngularEchartsModule,
        SharedModule,
    ],
    exports: [],
})

export class OperationCenterModule { }