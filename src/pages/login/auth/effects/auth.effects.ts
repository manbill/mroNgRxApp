import { Observable } from 'rxjs/Observable';
import { AuthService } from './../service/auth.service';
import { Injectable } from '@angular/core';
import { Effect,Actions } from "@ngrx/effects";
import * as AuthActions from "../actions/auth.actions";
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthEffects{
  constructor(private authService:AuthService,private action$:Actions){};
  @Effect()
  login$=this.action$.ofType(AuthActions.LOGIN)
  .map((action:AuthActions.Login)=>action.payload)
  .switchMap((auth)=>{
    return this.authService.login(auth)
    .map(user=>new AuthActions.LoginSuccess(user))
    .catch(e=>{
      console.error(e);
      return Observable.throw(e);
    })
  })

}
