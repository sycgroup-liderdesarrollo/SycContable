import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmacionComponent } from 'src/app/share/confirmacion/confirmacion.component';
import { AsignarConvenioComponent } from './convenios/asignar-convenio/asignar-convenio.component';
import { ModalAsignarConvenioComponent } from './convenios/asignar-convenio/modal-asignar-convenio/modal-asignar-convenio.component';
import { ConveniosComponent } from './convenios/convenios.component';
import { AsignarVacacionesComponent } from './empleado/asignar-vacaciones/asignar-vacaciones.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ModalempleadoComponent } from './empleado/modalempleado/modalempleado.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';

const routes: Routes = [
{
  path:'empleado', component: EmpleadoComponent 
},
 {
   path:'convenios', component: ConveniosComponent
 },
 {
   path:'proveedores', component: ProveedoresComponent
 },
 {
  path:'modalempleado', component: ModalempleadoComponent
},
{
  path:'asignarConvenio', component: AsignarConvenioComponent
},
{
  path:'modal-asignarCovenio', component: ModalAsignarConvenioComponent
},
{
  path:'asignar-vacaciones', component: AsignarVacacionesComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativoRoutingModule { }
