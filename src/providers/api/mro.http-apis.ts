import { Store } from '@ngrx/store';
import { AppState } from './../../app/reducers/app.reducer';
import { MroError, MroErrorCode } from './../../app/mro-error-handler';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { HttpInterceptorService } from 'ng-http-interceptor';
import { Injectable, Provider } from '@angular/core';
import 'rxjs/add/operator/map';
import * as Apis from "./api-urls";
import * as LoginActions from "../../pages/login/actions/login.actions";
/*
  Generated class for the MroApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
export interface MroApiEntities {
  loginApi: string;
  logoutApi: string;
  fetchProjectsApi: string;
  fetchCompaniesApi: string;
  fetchWarehouse: string;
  fetchDictionaryApi: string;
  getCurServerTimeApi: string;
  fetchMaterialApi: string;
  fetchManualInstrutorApi: string;
  uploadWorkOrdersApi: string;
  uploadFilesApi: string;
  getBatchWorkorderListApi: string;
  getWorkorderFullInfoListApi: string;
  fetchMachineList: string;
  fetchMachineDetails: string;
}
@Injectable()
export class MroHttpWithApis {
  apis: MroApiEntities = {
    loginApi: Apis.Api_login,
    logoutApi: Apis.Api_logout,
    fetchCompaniesApi: "todo",
    fetchProjectsApi: Apis.Api_getUserProject,
    fetchWarehouse: Apis.Api_getWarehouse,
    fetchDictionaryApi: Apis.Api_getDictionaryDetail,
    getCurServerTimeApi: Apis.Api_getSystemTime,
    fetchMaterialApi: Apis.Api_getMaterial,
    fetchManualInstrutorApi: Apis.Api_get_common_manual_url,
    uploadFilesApi: Apis.Api_updateUploadFiles,
    uploadWorkOrdersApi: Apis.Api_uploadWorkOrder,
    getBatchWorkorderListApi: Apis.Api_getBatchWorkorderList,
    getWorkorderFullInfoListApi: Apis.Api_getWorkorderFullInfoList,
    fetchMachineList: Apis.Api_getMachineList,
    fetchMachineDetails: Apis.Api_getEquipmentsTreeAndDetails
  }
  constructor(httpInterceptor: HttpInterceptorService, public http: Http, store: Store<AppState>) {
    httpInterceptor.request().addInterceptor((data, method) => {
      console.debug("请求拦截：", data);
      const url = data[0];
      if(method.toLowerCase()==='get'){

      }else if(method.toLowerCase()==='post'){

      }
      return data;
    });
    httpInterceptor.response().addInterceptor((data, method) => {
      return data
        .do((res) => console.debug('接收拦截：', res.json()))
        .switchMap(res => {
          const result: MroResponse = res.json();
          if (result.retCode !== '00000') {
            const err = new MroError({ errorCode: MroErrorCode.response_error_code, errorMessage: result.retInfo, errorReason: JSON.stringify(result) });
            if (result.retCode === '10008') {//token失效
              store.dispatch(new LoginActions.LoginFailure(err));
            }
            return Observable.throw(err);
          }
          return Observable.of(res.json());
        }
        );
    })
  }

}
export const MroHttpWithApisProvider: Provider = {
  provide: MroHttpWithApis,
  useFactory: (httpInterceptor: HttpInterceptorService, http, store) => new MroHttpWithApis(httpInterceptor, http, store),
  deps: [HttpInterceptorService, Http, Store]
}
export class MroResponse extends Response {
  retCode: string;
  retInfo: string;
  data: any;
}
