import { MaterialEffects } from './effects/material.effects';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
@NgModule({
  imports:[
    EffectsModule.forFeature([MaterialEffects])
  ]
})
export class MaterialModule{

}
