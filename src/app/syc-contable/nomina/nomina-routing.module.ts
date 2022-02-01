import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargarDeduccionesComponent } from './cargar-deducciones/cargar-deducciones.component';
import { DeduccionesPorConveniosyPeriodosComponent } from './deducciones-por-conveniosy-periodos/deducciones-por-conveniosy-periodos.component';
import { ModalSeleccionarComponent } from './modal-seleccionar/modal-seleccionar.component';

const routes: Routes = [
{
  path:'cargarDeducciones', component: CargarDeduccionesComponent
},
{
  path:'modal-seleccionar', component: ModalSeleccionarComponent
},
{
  path:'consultar-convenios-periodos', component: DeduccionesPorConveniosyPeriodosComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NominaRoutingModule { }
