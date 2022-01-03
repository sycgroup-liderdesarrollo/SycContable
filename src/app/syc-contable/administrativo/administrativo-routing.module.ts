import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmacionComponent } from 'src/app/share/confirmacion/confirmacion.component';
import { ConveniosComponent } from './convenios/convenios.component';
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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativoRoutingModule { }
