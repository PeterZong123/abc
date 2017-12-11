import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ServiceRoutes } from './service-center.router';
import { MyServiceComponent } from './my-service/my-service.component';
import { PlatServiceComponent } from './plat-service/plat-service.component';

@NgModule({
    declarations: [
        MyServiceComponent,
        PlatServiceComponent,
    ],
    imports: [
        ServiceRoutes,
        SharedModule,
    ],
    exports: [],
})

export class ServiceCenterModule { }