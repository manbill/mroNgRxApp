import { LOGIN_SUCCESS } from './../../../pages/login/actions/login.actions';
import { MroError, MroErrorCode } from './../../../app/mro-error-handler';
import { LOAD_PAGENATION } from './../../../shared/common';
import { Material } from './../../../modals/material/material.modal';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { MroUtils } from './../../../shared/utils';
import { tableNames } from './../../../providers/db/mro.tables';
import { Actions, Effect } from '@ngrx/effects';
import { MroHttpWithApis } from './../../../providers/api/mro.http-apis';
import { Db } from './../../../providers/db/db';
import { Injectable } from '@angular/core';
import * as MaterialActions from "../actions/material.actions";
import * as AppActions from "../../../app/actions/app.actions";
@Injectable()
export class MaterialEffects {
  constructor(private db: Db, private httpApi: MroHttpWithApis, private action$: Actions) { }
  @Effect()
  fetchMaterial$ = this.action$.ofType(MaterialActions.FETCH_MATERIALS_DATA/* , LOGIN_SUCCESS */)
    .switchMap(() => {
      return this.db.executeSql(`select * from ${tableNames.eam_sync_actions} where syncAction=?`, [MaterialActions.FETCH_MATERIALS_DATA])
        .map(res => {
          let lastSyncTime = 0;
          const results = MroUtils.changeDbResult2Array(res);
          if (results.length > 0) {
            lastSyncTime = results[0]['lastSyncSuccessTime'];
          }
          return lastSyncTime;
        })
        .switchMap(lastSyncTime => {
          return this.httpApi.http.get(this.httpApi.apis.getCurServerTimeApi)
            .pluck('data')
        }, (lastSyncTime, curServerTime) => ({ lastSyncTime, curServerTime }))
        .switchMap(({ lastSyncTime, curServerTime }) => {
          const params = {
            startDate: lastSyncTime,
            endDate: curServerTime,
            page: 1
          }
          const repeat$ = new Subject();
          const maxRetryCount = 4;
          const timerInterval = 2000;
          const bufferCount = 1;//这里是1000的倍数
          return Observable.empty().startWith('fetchMaterials')
            .switchMap(() => {
              return this.httpApi.http.post(this.httpApi.apis.fetchMaterialApi, params)
                .repeatWhen(() => repeat$.asObservable())
                .retryWhen(err$ => Observable.range(0, maxRetryCount)
                  .zip(err$, (i, err) => ({ i, err }))
                  .mergeMap(({ i, err }) => {
                    if (i === maxRetryCount - 1) {
                      return Observable.throw(err);
                    }
                    return Observable.timer(i * timerInterval);
                  })
                )
                .pluck('data')
                .map((materials: Material[]) => {
                  if (materials!.length > 0) {
                    params.page++;
                    setTimeout(() => repeat$.next(), 0);
                  } else {
                    setTimeout(() => repeat$.complete(), 0);
                  }
                  return materials;
                })
            })
            .filter(values => values.length > 0)
            .bufferCount(bufferCount)
            .do((res) => console.log(res))
            .mergeMap((materialsArr: Array<Material[]>) => {
              const sqls = [];
              const insertSql = `insert into ${tableNames.eam_sync_material}( materialId, materialName, unit, materialSno, materialType, materialTypeText, materialSuite, machine_model, materialFileid, materialValue, marterialExpiredate, materialComment, materialSupplier, materialFilePath, qrcodeFileid, materialQrFilePath, material_replace, comment, materialVendor, machineModel, machineModelId, materialReplace, activeFlag, sapInventoryFlag, json )values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
              sqls.push(`delete from ${tableNames.eam_sync_material} where materialId in (${materialsArr.map(materials => materials.map(m => m.materialId))})`);
              materialsArr.forEach(materials => {
                materials.forEach(material => {
                  const vals = [];
                  vals.push(material.materialId);
                  vals.push(material.materialName);
                  vals.push(material.unit);
                  vals.push(material.materialSno);
                  vals.push(material.materialType);
                  vals.push(material.materialTypeText);
                  vals.push(material.materialSuite);
                  vals.push(material.machine_model);
                  vals.push(material.materialFileid);
                  vals.push(material.materialValue);
                  vals.push(material.marterialExpiredate);
                  vals.push(material.materialComment);
                  vals.push(material.materialSupplier);
                  vals.push(material.materialFilePath);
                  vals.push(material.qrcodeFileid);
                  vals.push(material.materialQrFilePath);
                  vals.push(material.material_replace);
                  vals.push(material.comment);
                  vals.push(material.materialVendor);
                  vals.push(material.machineModel);
                  vals.push(material.machineModelId);
                  vals.push(material.materialReplace);
                  vals.push(material.activeFlag);
                  vals.push(1);
                  vals.push(JSON.stringify(material));
                  sqls.push([insertSql, vals]);
                })
              })
              return this.db.sqlBatch(sqls);
            })
            .takeLast(1)
            .do(() => console.log("完成所有物料缓存操作"))
            .switchMap(() => {
              const sqls = []
              sqls.push([`update ${tableNames.eam_sync_actions} set lastSyncSuccessTime=?,syncStatus=? where syncAction=?`, [curServerTime, 1, MaterialActions.FETCH_MATERIALS_DATA]])
              return this.db.sqlBatch(sqls)
                .switchMap(() => {
                  return this.db.executeSql(`select * from ${tableNames.eam_sync_material} limit 0,${LOAD_PAGENATION}`)
                    .map(res => {
                      const results = MroUtils.changeDbResult2Array(res);
                      return results.map(r => JSON.parse(r['json']));
                    })
                })
            })
            .map((materials) => new MaterialActions.FetchMaterialsDataSuccess(materials))
            .catch(e => {
              console.error(e);
              const err: MroError = {
                errorCode: MroErrorCode.materials_error_code,
                errorMessage: '获取物料信息失败',
                errorReason: JSON.stringify(e)
              }
              return Observable.of(new AppActions.AppThrowsError(err));
            })
        })
    })
}
