import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { InstructorEffects } from "./effects/intructor.effects";
@NgModule({
  imports:[
    EffectsModule.forFeature([InstructorEffects])
  ]
})
export class IntructorModule{

}
