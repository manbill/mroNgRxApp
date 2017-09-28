import { MaterialModule } from './materials/material.module';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from "./base-reducer/base.reducer";
import { IntructorModule } from './manual-instrutors/instructor.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { WarehouseModule } from './warehouse/warehouse.module';
@NgModule({
  imports: [
    StoreModule.forFeature('baseData', reducers),
    IntructorModule,
    DictionaryModule,
    MaterialModule,
    WarehouseModule
  ]
})
export class BaseDataModule {

}
