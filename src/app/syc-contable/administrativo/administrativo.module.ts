import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrativoRoutingModule } from './administrativo-routing.module';
import { EmpleadoComponent } from './empleado/empleado.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ConveniosComponent } from './convenios/convenios.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ModalempleadoComponent } from './empleado/modalempleado/modalempleado.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalconveniosComponent } from './convenios/modalconvenios/modalconvenios.component';
import { ModalproveedoresComponent } from './proveedores/modalproveedores/modalproveedores.component';
import {MatSelectModule} from '@angular/material/select';
import { ShareModule } from 'src/app/share/share.module';
import { AsignarConvenioComponent } from './convenios/asignar-convenio/asignar-convenio.component';
import { ModalAsignarConvenioComponent } from './convenios/asignar-convenio/modal-asignar-convenio/modal-asignar-convenio.component';

@NgModule({
  declarations: [
    EmpleadoComponent,
    ProveedoresComponent,
    ModalempleadoComponent,
    ModalconveniosComponent,
    ConveniosComponent,
    ModalproveedoresComponent,
    AsignarConvenioComponent,
    ModalAsignarConvenioComponent,
  ],

  imports: [
    CommonModule,
    AdministrativoRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatDialogModule, 
    MatSelectModule,
    ShareModule
  ]
})

export class AdministrativoModule { }
