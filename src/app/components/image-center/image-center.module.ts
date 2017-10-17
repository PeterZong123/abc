/**
 * Created by liangzhifeng on 2017/10/22.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageCenterRoutingModule}  from './image-center.routes';

import { MyImageComponent } from './my-image/my-image.component';
import { CreateImageComponent } from './create-image/create-image.component';
import { CanActivateGuard } from '../../shared/routerControl/can-activate-guard';
import { BaseImageComponent } from './base-image/base-image.component';
import { QueryImageComponent } from './query-image/query-image.component';


@NgModule({
    imports: [
        CommonModule
    ],
    exports:[],
    declarations: [
        MyImageComponent,
        CreateImageComponent,
        BaseImageComponent,
        QueryImageComponent,
  ]
})
export class ImageCenterModule { }

