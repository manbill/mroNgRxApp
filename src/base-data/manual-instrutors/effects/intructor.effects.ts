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

@Injectable()
export class InstructorEffects {
  constructor(private action$: Actions, private httpApi: MroHttpWithApis, private db: Db) { }
  @Effect()
  fetchInstructors$ = this.action$.ofType(InstructorActions.FETCH_INSTRUCTOR_DATA)
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
            startDate: '',
            endDate: ''
          }
          const repeat$ = new Subject();
          const maxRetryCount = 3;
          return Observable.empty().startWith('fetchManualInstructors')
            .switchMap(() => {
              return this.httpApi.http.post(this.httpApi.apis.fetchManualInstrutorApi, params)
                .retryWhen(err$ => Observable.range(0, maxRetryCount)
                  .zip(err$,(i,err)=>({i,err}))
                  .mergeMap(({i,err})=>{
                    if(i===maxRetryCount-1){
                      return Observable.throw(err);
                    }
                    return Observable.timer(i*)
                  })
                )
                .repeatWhen(() => repeat$.asObservable())
            })
        })
    })
  // const params = {
  //   page: -1,
  //   startDate: new Date(last_update_time).format("yyyy-MM-dd hh:mm:ss"),
  //   endDate: new Date(now_server_date).format("yyyy-MM-dd hh:mm:ss")
  // }
}
