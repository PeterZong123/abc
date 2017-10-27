import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ImageRoutes } from './image-center.router';
import { MyImageComponent } from './my-image/my-image.component';
import { CreateImageComponent } from './create-image/create-image.component';
import { QueryImageComponent } from './query-image/query-image.component';
import { BaseImageComponent } from './base-image/base-image.component';

@NgModule({
    declarations: [
        MyImageComponent,
        CreateImageComponent,
        QueryImageComponent,
        BaseImageComponent
    ],
    imports: [
        ImageRoutes,
        SharedModule,
    ],
    exports: [],
})

export class ImageCenterModule { }