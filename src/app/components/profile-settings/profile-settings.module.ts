import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ProfileRoutes } from './profile-settings.router';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
    declarations: [
        EditPasswordComponent,
        EditProfileComponent
    ],
    imports: [
        ProfileRoutes,
        SharedModule,
        ImageCropperModule
    ],
    exports: [],
})

export class ProfileSettingsModule { }