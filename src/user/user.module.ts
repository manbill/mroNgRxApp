import { ProjectModule } from './projects/project.module';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { reducers } from './reducer/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';
import { CompanyModule } from './companies/company.module';
@NgModule({
  imports: [
    ProjectModule,
    CompanyModule,
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature([UserEffects])
  ]

})
export class UserModule {

}
