/**
 * Created by liangzhifeng on 2017/10/22.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { MyImageComponent } from './my-image/my-image.component';
import { CreateImageComponent } from './create-image/create-image.component';
import { CanActivateGuard } from '../../shared/routerControl/can-activate-guard';
import { BaseImageComponent } from './base-image/base-image.component';
import { QueryImageComponent } from './query-image/query-image.component';

const routes:Routes = [
    {
        path: '',
        children: [
            {
                path: '',//我的镜像
                component: MyImageComponent,
                canActivate: [CanActivateGuard]
            },
            {
                path:'createImage',//我的镜像-- 创建新镜像
                component:CreateImageComponent,
                canActivate: [CanActivateGuard]
            },
            {
                path: 'baseImage',//基础镜像
                component: BaseImageComponent,
                canActivate: [CanActivateGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImageCenterRoutingModule {
}

