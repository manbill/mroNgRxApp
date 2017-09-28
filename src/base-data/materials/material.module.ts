import { StoreModule } from '@ngrx/store';
import { MaterialEffects } from './effects/material.effects';
import { EffectsModule } from '@ngrx/effects';
import * as fromMaterial from "../materials/reducers/material.reducer";
import { NgModule } from '@angular/core';
@NgModule({
  imports:[
    EffectsModule.forFeature([MaterialEffects]),
  ]
})
export class MaterialModule{

}
