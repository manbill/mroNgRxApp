import { UserModule } from './../user/user.module';
import { StoreModule, Store } from '@ngrx/store';
import { MroHttpWithApisProvider } from './../providers/api/mro.http-apis';
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
import { HttpModule } from '@angular/http';
import { isDebug, RootReducers, metaReducers } from './reducers/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from "@ngrx/effects";
import { AppEffects } from './effects/app.effects';
import { MroComponentsModule } from '../components/components.module';
import { BaseDataModule } from '../base-data/base-data.module';
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
    UserModule,
    MroComponentsModule,
    BaseDataModule
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
    SQLite,
    DbProvider,
    // HttpInterceptorService,
    HttpModule,
    MroHttpWithApisProvider
  ]
})
export class AppModule { }
