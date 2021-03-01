import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TituloDividasResolver } from './titulo/titulo-dividas/titulo-dividas.resolver';
import { TituloComponent } from './titulo/titulo.component';
import { TituloResolver } from './titulo/titulo.resolver';


const routes: Routes = [
  {
    path: '',
    component: TituloComponent,
    resolve: {
      tituloservice: TituloResolver,
      titulodividasservice: TituloDividasResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeloRoutingModule { }
