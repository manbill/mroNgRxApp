import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { WarehouseEffects } from './effects/warehouse.effects';
@NgModule({
  imports: [
    EffectsModule.forFeature([WarehouseEffects])
  ]
})
export class WarehouseModule {

}
