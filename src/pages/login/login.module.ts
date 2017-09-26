import { StoreModule } from '@ngrx/store';
import { LoginEffects } from './effects/login.effects';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { reducer } from "./reducer/login.reducer";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    EffectsModule.forFeature([LoginEffects]),
    StoreModule.forFeature('login',reducer)
  ],
  providers:[

  ],
  entryComponents:[
    LoginPage,
  ]
})
export class LoginPageModule {}
