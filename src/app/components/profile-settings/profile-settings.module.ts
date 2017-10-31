import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProfileRoutes } from './profile-settings.router';
import { ProfileSettingsComponent } from './profile-settings.component';

@NgModule({
    declarations: [
        ProfileSettingsComponent,
    ],
    imports: [
        ProfileRoutes,
        SharedModule,
    ],
    exports: [],
})

export class ProfileSettingsModule { }