import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from "./business-reducer/business.reducer";
@NgModule({
  imports: [
    StoreModule.forFeature('businessData', reducers)
  ]
})
export class BusinessModule {

}
