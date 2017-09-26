import { Injectable } from '@angular/core';
import { Db } from '../../providers/db/db';
import * as AppActions from "../actions/app.actions";
import { Actions, Effect } from "@ngrx/effects";
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppEffects {
  constructor(private db: Db, private action$: Actions) { }
  @Effect({ dispatch: false })
  initTables$ = this.action$.ofType(AppActions.INIT_MRO_TABLES)
    .switchMap(
    () => this.db.initSqlVersions()
      .mapTo(new AppActions.InitTablesSuccess('initTablesSuccess'))
      .catch(e => {
        console.error(e);
        return Observable.throw(e)
      })
    );

}
