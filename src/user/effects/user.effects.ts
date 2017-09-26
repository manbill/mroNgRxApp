import { Observable } from 'rxjs/Observable';
import { Actions } from '@ngrx/effects';
import { MroHttpWithApis, MroResponse } from './../../providers/api/mro.http-apis';
import { Injectable } from '@angular/core';
import * as UserActions from "../actions/user.actions";
import * as LoginActions from "../../pages/login/actions/login.actions";
import * as AppActions from "../../app/actions/app.actions";
@Injectable()
export class UserEffects {
  constructor(private httpApi: MroHttpWithApis, private action$: Actions) { }
}
