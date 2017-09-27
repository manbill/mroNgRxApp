import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { DictionaryEffects } from './effects/dictionary.effects';
@NgModule({
  imports:[
    EffectsModule.forFeature([DictionaryEffects])
  ]
})
export class DictionaryModule{

}
