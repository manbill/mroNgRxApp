import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MroHttpWithApis } from '../../../providers/api/mro.http-apis';
import * as InstructorActions from "../actions/instructor.actions";
import { Db } from '../../../providers/db/db';
import { tableNames } from '../../../providers/db/mro.tables';
import { MroUtils } from '../../../shared/utils';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/repeatWhen';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/zip';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/filter';
import { ManualInstructor } from '../../../modals/instructor/instructor.modal';
import 'rxjs/add/operator/takeLast';
import * as AppActions from "../../../app/actions/app.actions";
import { MroError, MroErrorCode } from '../../../app/mro-error-handler';
import { LOAD_PAGENATION } from '../../../shared/common';
import { LOGIN_SUCCESS } from '../../../pages/login/actions/login.actions';
import * as moment from "moment/moment";
@Injectable()
export class InstructorEffects {
  constructor(private action$: Actions, private httpApi: MroHttpWithApis, private db: Db) { }
  @Effect()
  fetchInstructors$ = this.action$.ofType(InstructorActions.FETCH_INSTRUCTOR_DATA/* , LOGIN_SUCCESS */)
    .switchMap(() => {
      return this.db.executeSql(`select * from ${tableNames.eam_sync_actions} where syncAction=?`, [InstructorActions.FETCH_INSTRUCTOR_DATA])
        .map(res => MroUtils.changeDbResult2Array(res))
        .map(res => {
          let lastSyncTime = 0;
          if (res.length > 0) {
            lastSyncTime = res[0]['lastSyncSuccessTime'];
          }
          return lastSyncTime;
        })
        .switchMap(lastSyncTime => {
          return this.httpApi.http.get(this.httpApi.apis.getCurServerTimeApi)
            .map(res => res['data']);
        }, (lastSyncTime, curServerTime) => ({ lastSyncTime, curServerTime }))
        .switchMap(({ lastSyncTime, curServerTime }) => {
          const params = {
            page: 0,
            startDate: moment(lastSyncTime).format('YYYY-MM-DD HH:mm:ss'),
            endDate: moment(curServerTime).format("YYYY-MM-DD HH:mm:ss")
          }
          const repeat$ = new Subject();
          const maxRetryCount = 3;
          const retryInterval = 2000;
          const bufferCount = 10;
          return Observable.empty().startWith('fetchManualInstructors')
            .switchMap(() => {
              return this.httpApi.http.post(this.httpApi.apis.fetchManualInstrutorApi, params)
                .retryWhen(err$ => Observable.range(0, maxRetryCount)
                  .zip(err$, (i, err) => ({ i, err }))
                  .mergeMap(({ i, err }) => {
                    if (i === maxRetryCount - 1) {
                      return Observable.throw(err);
                    }
                    return Observable.timer(i * retryInterval);
                  })
                )
                .repeatWhen(() => repeat$.asObservable())
                .pluck('data', 'dataObject')
                .do((res) => console.log('指导书:', res))
                .map(res => {
                  if (res['manualInfoDTO']) {
                    params.page++;
                    setTimeout(() => repeat$.next(), 0);
                  } else {
                    setTimeout(() => repeat$.complete(), 0);
                  }
                  return res;
                });
            })
            .filter(r => MroUtils.isNotEmpty(r['manualInfoDTO']))
            .bufferCount(bufferCount)
            .do((r) => console.log('after buffering ', r))
            .mergeMap((instructors: ManualInstructor[]) => {
              const sqls = [];
              const insertSql = `insert into ${tableNames.eam_sync_manual_instructor}(manualId,manualInstructorJson)values(?,?)`;
              sqls.push(`delete from ${tableNames.eam_sync_manual_instructor} where manualId in (${instructors.map(i => i.manualInfoDTO.manualId)})`);
              instructors.forEach(instructor => {
                const values = [];
                values.push(instructor.manualInfoDTO.manualId);
                values.push(JSON.stringify(instructor));
                sqls.push([insertSql, values]);
              });
              return this.db.sqlBatch(sqls);
            })
            .takeLast(1)
            .switchMap(() => {
              return this.db.executeSql(`update ${tableNames.eam_sync_actions} set lastSyncSuccessTime=?,syncStatus=?  where syncAction=?`, [curServerTime, 1, InstructorActions.FETCH_INSTRUCTOR_DATA])
            })
            .do(() => console.log('完成指导书下载'))
            .switchMap(() => {
              return this.db.executeSql(`select * from ${tableNames.eam_sync_manual_instructor} limit 0,${LOAD_PAGENATION}`)
            })
            .map(res => {
              const results = MroUtils.changeDbResult2Array(res);
              return results.map(r => JSON.parse(r['manualInstructorJson']));
            })
            .do(r => console.log('数据库拉取的指导书数据：', r))
            .map((instructors: ManualInstructor[]) => new InstructorActions.FetchInstructorDataSuccess(instructors))
        })
        .catch(e => {
          console.error(e);
          const err = new MroError({ errorCode: MroErrorCode.instructor_error_code, errorMessage: '获取指导书失败', errorReason: JSON.stringify(e) });
          return Observable.of(new AppActions.AppThrowsError(err));
        })
    })
  // const params = {
  //   page: -1,
  //   startDate: new Date(last_update_time).format("yyyy-MM-dd hh:mm:ss"),
  //   endDate: new Date(now_server_date).format("yyyy-MM-dd hh:mm:ss")
  // }
}
