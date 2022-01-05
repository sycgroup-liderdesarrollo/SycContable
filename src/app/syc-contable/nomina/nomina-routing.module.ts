import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargarDeduccionesComponent } from './cargar-deducciones/cargar-deducciones.component';
import { ModalSeleccionarComponent } from './modal-seleccionar/modal-seleccionar.component';

const routes: Routes = [
{
  path:'cargarDeducciones', component: CargarDeduccionesComponent
},
{
  path:'modal-seleccionar', component: ModalSeleccionarComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NominaRoutingModule { }
