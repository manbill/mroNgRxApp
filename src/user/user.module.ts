import { RootReducers, metaReducers } from './../app/reducers/app.reducer';
import { ProjectModule } from './projects/project.module';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
@NgModule({
  imports: [
    ProjectModule,
    StoreModule.forRoot(RootReducers, { metaReducers })
  ]

})
export class UserModule {

}
