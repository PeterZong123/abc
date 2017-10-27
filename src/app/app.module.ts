import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { StartupService } from './core/services/startup.service';
import { MenuService } from './core/services/menu.service';
import { TranslatorService } from './core/translator/translator.service';
import { SettingsService } from './core/services/settings.service';
import { TokenInterceptor } from '@core/net/token/token.interceptor';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './pages/login.component';

import { LoginService } from './pages/service/login.service';
import { FormValidatorService } from './shared/formValidator.service';
import { HttpModule } from '@angular/http';
import { CanActivateGuard } from './shared/routerControl/can-activate-guard';
import { AppRoute } from './app.router';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, `assets/i18n/`, '.json');
}

export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load();
}

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        LoginComponent,
        DashboardComponent,
],
    imports: [
        HttpModule,
        AppRoute,
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule.forRoot(),
        CoreModule,
        LayoutModule,
        // i18n
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [],
    providers: [
        // code see: https://github.com/unicode-cldr/cldr-core/blob/master/availableLocales.json
        { provide: LOCALE_ID, useValue: 'zh-Hans' },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        StartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        },

        //add by liangzhifeng
        CanActivateGuard,
        LoginService,
        AuthHttp,
        FormValidatorService
        //end
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
