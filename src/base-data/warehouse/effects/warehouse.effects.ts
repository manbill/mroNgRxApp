import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { MroHttpWithApis } from '../../../providers/api/mro.http-apis';
@Injectable()
export class WarehouseEffects{
  constructor(private action$:Actions,private httpApi:MroHttpWithApis){}
}
