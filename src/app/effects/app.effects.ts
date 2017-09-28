import { Injectable } from '@angular/core';
import { Db } from '../../providers/db/db';
import * as AppActions from "../actions/app.actions";
import { Actions, Effect } from "@ngrx/effects";
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import * as BaseDataActions from "../../base-data/base-actions/base-data.actions";
import * as BusinessDataActions from "../../business-data/business-actions/business.actions";
import { tableNames } from '../../providers/db/mro.tables';
import { MroUtils } from '../../shared/utils';
import * as fromUser from "../../user/reducer/user.reducer";
import * as fromBaseData from "../../base-data/base-reducer/base.reducer";
@Injectable()
export class AppEffects {
  constructor(private db: Db, private action$: Actions, private alertCtrl: AlertController) { }
  @Effect({ dispatch: false })
  initTables$ = this.action$.ofType(AppActions.INIT_MRO_TABLES)
    .switchMap(
    () => this.db.initSqlVersions()
      .switchMap(() => {
        return this.db.executeSql(`select * from ${tableNames.eam_sync_base_data_state}`)
          .map(res => MroUtils.changeDbResult2Array(res))
          .switchMap((baseStateRecords) => {
            return this.db.executeSql(`select * from ${tableNames.eam_user}`)
              .map(res => MroUtils.changeDbResult2Array(res))
          }, (baseStateRecords, userStateRecords) => ({ baseStateRecords, userStateRecords }))
      })
      .switchMap(({ baseStateRecords, userStateRecords }) => {
        const sqls = [];
        const initUserState = fromUser.initState;
        const initBaseDataState=fromBaseData.initBaseDataState;
        const insertUserStateSql=`insert into ${}`;
        const insertBaseStateSql=`insert into ${}`;
        if (baseStateRecords.length===0){

        }else{

        }
        return this.db.sqlBatch(sqls);
      })
      .switchMap(() => {
        return this.db.executeSql(`select * from ${tableNames.eam_sync_actions}`)
          .map(res => MroUtils.changeDbResult2Array(res))
      })
      .switchMap((records) => {
        const syncActions = BaseDataActions.BaseDataFetchActions.concat(BusinessDataActions.BusinessDataFetchActions).filter(a => MroUtils.isNotEmpty(a.syncAction));
        const sqls = [];
        syncActions.filter(a => {
          return !records.some((r => r['syncAction'] === a.syncAction))
        })
          .forEach(a => {
            sqls.push([`insert into ${tableNames.eam_sync_actions}(syncAction,lastSyncSuccessTime,syncStatus)values(?,?,?)`, [a.syncAction, 0, 0]]);
          })
        return this.db.sqlBatch(sqls);
      })
      .mapTo(new AppActions.InitTablesSuccess('initTablesSuccess'))
      .catch(e => {
        console.error(e);
        return Observable.throw(e);
      })
    );

}
