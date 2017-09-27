import { Injectable } from '@angular/core';
import { Effect, Actions } from "@ngrx/effects";
import { MroHttpWithApis } from '../../../providers/api/mro.http-apis';
import * as DictionaryActions from "../actions/dictionary.actions";
import { Db } from '../../../providers/db/db';
import { tableNames } from '../../../providers/db/mro.tables';
import { MroUtils } from '../../../shared/utils';
@Injectable()
export class DictionaryEffects {
  constructor(private action$: Actions, private httpApi: MroHttpWithApis, private db: Db) { }
  @Effect()
  fetchDict$ = this.action$.ofType(DictionaryActions.FETCH_DICTIONARY_DATA)
    .switchMap(() => {
      return this.db.executeSql(`select * from ${tableNames.eam_sync_actions} where syncAction=?`,[DictionaryActions.FETCH_DICTIONARY_DATA])
        .map(r => MroUtils.changeDbResult2Array(r))
        .map(res => {
          let lastsyncTime = 0;
          if (res.length > 0) {
            lastsyncTime = res[0]['lastSyncSuccessTime'];
          }
          return lastsyncTime;
        })
        .switchMap((lastsyncTime) => {
          return this.httpApi.http.get(this.httpApi.apis.getCurServerTimeApi)
            .map(r => r['data']);
        }, (lastsyncTime, curServerTime) => ({ lastsyncTime, curServerTime }))
        .switchMap(({ lastsyncTime, curServerTime })=>{
          return this.httpApi.http.post(this.httpApi.apis.fetchDictionaryApi,{

          })
        })
    })
}
