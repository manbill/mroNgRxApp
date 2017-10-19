import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MroHttpWithApis } from '../../../providers/api/mro.http-apis';
import * as WarehouseActions from "../actions/warehouse.actions";
import { Db } from '../../../providers/db/db';
import { tableNames } from '../../../providers/db/mro.tables';
import { MroUtils } from '../../../shared/utils';
import { Warehouse } from '../../../modals/warehouse/warehouse.modal';
import { MroError, MroErrorCode } from '../../../app/mro-error-handler';
import { Observable } from 'rxjs/Observable';
import * as AppActions from "../../../app/actions/app.actions";
import { LOAD_PAGENATION } from "../../../shared/common";
@Injectable()
export class WarehouseEffects {
  constructor(private action$: Actions, private httpApi: MroHttpWithApis, private db: Db) { }
  @Effect()
  fetchWarehouse$ = this.action$.ofType(WarehouseActions.FETCH_WAREHOUSE_DATA)
    .switchMap(() => {
      return this.db.executeSql(`select * from ${tableNames.eam_sync_actions} where syncAction=?`, [WarehouseActions.FETCH_WAREHOUSE_DATA])
        .map(r => {
          let lastSyncTime = 0;
          const res = MroUtils.changeDbResult2Array(r);
          if (res.length > 0) {
            lastSyncTime = res[0]['lastSyncSuccessTime'];
          }
          return lastSyncTime;
        })
        .switchMap(lastSyncTime => {
          return this.httpApi.http.get(this.httpApi.apis.getCurServerTimeApi)
            .pluck('data')
            .map((curServerTime) => ({ lastSyncTime, curServerTime }))
        })
        .switchMap(({ lastSyncTime, curServerTime }) => {
          const params = {};
          return this.httpApi.http.post(this.httpApi.apis.fetchWarehouse, params)
            .pluck('data')
            .switchMap((whs: Warehouse[]) => {
              const insertSql = `insert into ${tableNames.eam_sync_warehouse}(
                repertoryId,
                repertoryNo,
                repertoryName,
                repertoryLinkman,
                repertoryLinkmanId,
                repertoryContactNum,
                email,
                repertoryAddress,
                isBlockUp,
                isQuery,
                repertoryLevel,
                repertoryLimit,
                belongArea,
                belongAreaName,
                amount,
                projectId,
                projectName,
                repertoryLevelName,
                selProjects,
                isBlockUpName,
                isQueryName,
                consumeMoney,
                consumeNum
              )values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
              const sqls = [];
              sqls.push(`delete from ${tableNames.eam_sync_warehouse} where repertoryId in (${whs.map(w => w.repertoryId)})`);
              whs.forEach(w => {
                const values = [];
                values.push(w.repertoryId);
                values.push(w.repertoryNo);
                values.push(w.repertoryName);
                values.push(w.repertoryLinkman);
                values.push(w.repertoryLinkmanId);
                values.push(w.repertoryContactNum);
                values.push(w.email);
                values.push(w.repertoryAddress);
                values.push(w.isBlockUp);
                values.push(w.isQuery);
                values.push(w.repertoryLevel);
                values.push(w.repertoryLimit);
                values.push(w.belongArea);
                values.push(w.belongAreaName);
                values.push(w.amount);
                values.push(w.projectId);
                values.push(w.projectName);
                values.push(w.repertoryLevelName);
                values.push(w.selProjects);
                values.push(w.isBlockUpName);
                values.push(w.isQueryName);
                values.push(w.consumeMoney);
                values.push(w.consumeNum);
                sqls.push([insertSql, values]);
              });
              const updateActionSql = `update ${tableNames.eam_sync_actions} set lastSyncSuccessTime=?,syncStatus=? where syncAction=?`;
              sqls.push([updateActionSql, [curServerTime, 1, WarehouseActions.FETCH_WAREHOUSE_DATA]]);
              return this.db.sqlBatch(sqls);
            })
        })
        .switchMap(() => this.db.executeSql(`select * from ${tableNames.eam_sync_warehouse} limit 0,${LOAD_PAGENATION}`))
        .map(MroUtils.changeDbResult2Array)
        .map((res) => new WarehouseActions.FetchWarehouseDataSuccess(res))
        .catch(e => {
          console.error(e);
          const err: MroError = {
            errorCode: MroErrorCode.warehouse_error_code,
            errorMessage: '获取仓库信息失败',
            errorReason: JSON.stringify(e)
          };
          return Observable.of(new AppActions.AppThrowsError(err));
        })
    })
}
