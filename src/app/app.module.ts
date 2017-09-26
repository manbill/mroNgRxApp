import { StoreModule, Store } from '@ngrx/store';
import { MroApiProvider } from './../providers/api/api';
import { LoginPageModule } from './../pages/login/login.module';
import { NgModule, ErrorHandler, Inject, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpInterceptorModule, HttpInterceptorService } from "ng-http-interceptor";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Db, DbProvider } from '../providers/db/db';
import { SQLite } from "@ionic-native/sqlite";
import { MroErrorHandler } from "./mro-error-handler";
import { ReactiveFormsModule } from "@angular/forms";
import { Http } from '@angular/http';
import { AppState, RootReducers, metaReducers, isDebug } from './reducers/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpProvider } from '../providers/mro-http-interceptor/http-interceptor';
import { EffectsModule } from "@ngrx/effects";
import { AppEffects } from './effects/app.effects';
import { MroComponentsModule } from '../components/components.module';
@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpInterceptorModule,
        LoginPageModule,
        ReactiveFormsModule,
        StoreModule.forRoot(RootReducers, { metaReducers }),
        // Note that you must instrument after importing StoreModule
        isDebug ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([AppEffects]),
        MroComponentsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: MroErrorHandler },
        MroApiProvider,
        SQLite,
        DbProvider,
        HttpProvider,
    ]
})
export class AppModule { }
