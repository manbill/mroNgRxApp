import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AppState } from './reducers/app.reducer';
import { Store } from '@ngrx/store';
import * as AppActions from "../app/actions/app.actions";
import * as fromRoot from "../app/reducers/app.reducer";
import * as fromLogin from "../pages/login/reducer/login.reducer";
import * as fromUser from "../user/reducer/user.reducer";
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../pages/login/login';
import { getLoggedIn } from '../user/reducer/user.reducer';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  @ViewChild('nav') nav: NavController;
  login$: Observable<boolean>;
  user$: Observable<fromUser.UserState>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private store: Store<fromRoot.AppState>) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.nav.setRoot(LoginPage);
      this.login$ = this.store.select(fromUser.getLoggedIn);
      // console.log(this.store);
      const subscription = this.login$.subscribe(loggedIn => {
        console.log(loggedIn);
        if (!loggedIn) {
          this.nav.setRoot(LoginPage);
          // subscription.unsubscribe();
        }
      })
      this.store.dispatch(new AppActions.InitTables('initTables'));//初始化数据库表格
    });
  }
}
