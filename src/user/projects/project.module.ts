import { ProjectEffects } from './effects/project.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { reducer } from "./reducer/project.reducer";
@NgModule({
  imports:[
    StoreModule.forFeature('project',reducer),
    EffectsModule.forFeature([ProjectEffects])
  ]
})
export class ProjectModule{

}
