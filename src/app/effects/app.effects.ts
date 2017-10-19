import { Injectable } from '@angular/core';
import { Db } from '../../providers/db/db';
import * as AppActions from "../actions/app.actions";
import * as fromRoot from "../reducers/app.reducer";
import { Actions, Effect } from "@ngrx/effects";
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import * as BaseDataActions from "../../base-data/base-actions/base-data.actions";
import * as BusinessDataActions from "../../business-data/business-actions/business.actions";
import { tableNames } from '../../providers/db/mro.tables';
import { MroUtils } from '../../shared/utils';
import * as fromUser from "../../user/reducer/user.reducer";
import * as fromBaseData from "../../base-data/base-reducer/base.reducer";
import { Store } from '@ngrx/store';
@Injectable()
export class AppEffects {
  constructor(private db: Db, private action$: Actions, private store: Store<fromRoot.AppState>, private alertCtrl: AlertController) { }
  @Effect()
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
        const insertUserStateSql = `insert into ${tableNames.eam_user}(userStateJson,userId)values(?,?)`;
        const insertBaseStateSql = `insert into ${tableNames.eam_sync_base_data_state}(type,stateJson,initActionName)values(?,?,?)`;
        Object.keys(BaseDataActions.BaseStateTypesInitInfos)
          .map(type => BaseDataActions.BaseStateTypesInitInfos[type])
          //仅过滤数据库中尚未记录的需要初始化的状态
          .filter(({ type }) => {
            // console.log(type);
            return !baseStateRecords.some(r => r.type !== type);
          })
          .map(({ type, initAction }) => {
            sqls.push([insertBaseStateSql, [type, JSON.stringify(initAction.payload), initAction.actionName]]);
          });
        if (userStateRecords.length === 0) {
          let store=null;
          this.store.subscribe(s=>store=s,console.error);
          const user = fromUser.getLoginUser(store);
          console.log(user);
          const userId = user ? user.id : null;
          console.log("fromUser.getLoginUser(this.store).id", userId);
          if (userId) {
            sqls.push([insertUserStateSql, [JSON.stringify(initUserState), userId]]);
          }
        }
        return this.db.sqlBatch(sqls);
      })
      .switchMap(() => {
        return this.db.executeSql(`select * from ${tableNames.eam_sync_actions}`)
          .map(res => MroUtils.changeDbResult2Array(res))
      })
      .switchMap((records) => {//获取数据的所有actions，包括基础数据和业务数据
        const syncActions = BaseDataActions.BaseDataFetchActions.concat(BusinessDataActions.BusinessDataFetchActions).filter(a => MroUtils.isNotEmpty(a.syncAction));
        const sqls = [];
        syncActions.filter(a => {//过滤所有尚未记录在数据库中的actions，即初始化后续开发过程中，需要逐渐添加的下载数据的action到数据eam_sync_actions表格中，并且同步的时间和状态分别记录为0,0
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
