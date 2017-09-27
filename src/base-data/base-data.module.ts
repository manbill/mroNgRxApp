import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from "./base-reducer/base.reducer";
@NgModule({
  imports:[
    StoreModule.forFeature('baseData',reducers)
  ]
})
export class BaseDataModule{

}
