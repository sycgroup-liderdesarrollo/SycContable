import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NominaRoutingModule } from './nomina-routing.module';
import { CargarDeduccionesComponent } from './cargar-deducciones/cargar-deducciones.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { ModalSeleccionarComponent } from './modal-seleccionar/modal-seleccionar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { DeduccionesPorConveniosyPeriodosComponent } from './deducciones-por-conveniosy-periodos/deducciones-por-conveniosy-periodos.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    CargarDeduccionesComponent,
    ModalSeleccionarComponent,
    DeduccionesPorConveniosyPeriodosComponent,
  ],

  imports: [
    CommonModule,
    NominaRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatMenuModule,
    MatToolbarModule,
    MatGridListModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule
  ]
  
})
export class NominaModule {}
