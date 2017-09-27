import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CompanyEffects } from './effects/company.effects';
@NgModule({
  imports: [
    EffectsModule.forFeature([CompanyEffects])
  ]
})
export class CompanyModule {

}
