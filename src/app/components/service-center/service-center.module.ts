import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ServiceRoutes } from './service-center.router';
import { CacheServiceComponent } from './cache-service/cache-service.component';
import { CommonServiceComponent } from './common-service/common-service.component';
import { DataServiceComponent } from './data-service/data-service.component';

@NgModule({
    declarations: [
        CacheServiceComponent,
        CommonServiceComponent,
        DataServiceComponent,
    ],
    imports: [
        ServiceRoutes,
        SharedModule,
    ],
    exports: [],
})

export class ServiceCenterModule { }