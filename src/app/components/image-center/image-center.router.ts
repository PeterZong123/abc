import { Routes, RouterModule } from '@angular/router';
import { MyImageComponent } from './my-image/my-image.component';
import { CreateImageComponent } from './create-image/create-image.component';
import { QueryImageComponent } from './query-image/query-image.component';
import { BaseImageComponent } from './base-image/base-image.component';

const routes: Routes = [
    {
        path: 'myImage', //我的镜像
        children: [
            {
                path: '', //我的镜像
                component: MyImageComponent,
            },
            {
                path: 'createImage', //我的镜像-- 创建新镜像
                component: CreateImageComponent,
            },
            {
                path: 'queryImage/:id', //我的镜像--查询镜像
                component: QueryImageComponent,
            },
        ]
    },
    {
        path: 'baseImage', //基础镜像
        component: BaseImageComponent,
    },
    
]

export const ImageRoutes = RouterModule.forChild(routes);