import { Injectable } from '@angular/core';
import { Effect, Actions } from "@ngrx/effects";
import { MroHttpWithApis } from '../../../providers/api/mro.http-apis';
import * as DictionaryActions from "../actions/dictionary.actions";
import { Db } from '../../../providers/db/db';
import { tableNames } from '../../../providers/db/mro.tables';
import { MroUtils } from '../../../shared/utils';
import { Dictionary } from '../../../modals/dictionary/dictionary.modal';
import { LOGIN_SUCCESS } from '../../../pages/login/actions/login.actions';
import { MroError, MroErrorCode } from '../../../app/mro-error-handler';
import { Observable } from 'rxjs/Observable';
import * as AppActions from "../../../app/actions/app.actions";
@Injectable()
export class DictionaryEffects {
  constructor(private action$: Actions, private httpApi: MroHttpWithApis, private db: Db) { }
  @Effect()
  fetchDict$ = this.action$.ofType(DictionaryActions.FETCH_DICTIONARY_DATA, LOGIN_SUCCESS)
    .switchMap(() => {
      return this.db.executeSql(`select * from ${tableNames.eam_sync_actions} where syncAction=?`, [DictionaryActions.FETCH_DICTIONARY_DATA])
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
        .switchMap(({ lastsyncTime, curServerTime }) => {
          return this.httpApi.http.post(this.httpApi.apis.fetchDictionaryApi, {
            startDate: lastsyncTime,
            endDate: curServerTime
          })
            .map(res => res['data'] as Dictionary[])
        }, (lastTimeAndCurTime, dicts) => ({ lastTimeAndCurTime, dicts }))
        .switchMap(({ lastTimeAndCurTime, dicts }) => {
          // console.log('字典数据：', dicts)
          const insertSql = `insert into ${tableNames.eam_sync_dictionary_detail}(
            detailId,
            detailName,
            dictionaryId ,
            paraType,
            detailCode,
            detailComment,
            activeFlag,
            createBy,
            createOn,
            lastUpdBy,
            lastUpdOn)values(?,?,?,?,?,?,?,?,?,?,?)`;
          const sqls = [];
          sqls.push(`delete from ${tableNames.eam_sync_dictionary_detail} where detailId in (${dicts.map(dict => dict.detailId)})`);
          dicts.forEach(dict => {
            const values = [];
            values.push(dict.detailId);
            values.push(dict.detailName);
            values.push(dict.dictionaryId);
            values.push(dict.paraType);
            values.push(dict.detailCode);
            values.push(dict.detailComment);
            values.push(dict.activeFlag || 0);
            values.push(dict.createBy);
            values.push(dict.createOn);
            values.push(dict.lastUpdBy);
            values.push(dict.lastUpdOn);
            sqls.push([insertSql, values]);
          });
          const updateActionSql = `update ${tableNames.eam_sync_actions} set lastSyncSuccessTime=?,syncStatus=? where syncAction=?`;
          sqls.push([updateActionSql, [lastTimeAndCurTime.curServerTime, 1, DictionaryActions.FETCH_DICTIONARY_DATA]]);
          return this.db.sqlBatch(sqls);
        })
        .switchMap(() => {
          return this.db.executeSql(`select * from ${tableNames.eam_sync_dictionary_detail}`)
            .map(res => MroUtils.changeDbResult2Array(res) as Dictionary[])
        }, (r, records) => ({ r, records }))
        // .do(({records})=>console.log('数据库拉取回来的字典数据：',records))
        .map(({ records }) => new DictionaryActions.FetchDictionaryDataSuccess(records))
        .catch(e => {
          console.error(e);
          const err: MroError = {
            errorCode: MroErrorCode.dictionary_error_code,
            errorMessage: '获取字典数据失败',
            errorReason: JSON.stringify(e)
          };
          return Observable.of(new AppActions.AppThrowsError(err));
        })
    })
}
