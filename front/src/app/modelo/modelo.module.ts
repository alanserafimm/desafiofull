import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsModule } from 'src/tools/tools.module';
import { ModeloRoutingModule } from './modelo.routing';
import { TituloComponent } from './titulo/titulo.component';
import { TituloResolver } from './titulo/titulo.resolver';
import { ReactiveFormsModule } from '@angular/forms';
import { TituloDividasComponent } from './titulo/titulo-dividas/titulo-dividas.component';
import { TituloDividasResolver } from './titulo/titulo-dividas/titulo-dividas.resolver';

@NgModule({
  declarations: [
    TituloComponent,
    TituloDividasComponent
  ],
  imports: [
    CommonModule,
    ModeloRoutingModule,
    ToolsModule,
    ReactiveFormsModule
  ],
  exports: [],
  providers: [TituloResolver, TituloDividasResolver]
})
export class ModeloModule { }
