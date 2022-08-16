import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroCompletadoPipe } from './filtro-completado.pipe';



@NgModule({
  declarations: [
    FiltroCompletadoPipe
  ],exports:[FiltroCompletadoPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
