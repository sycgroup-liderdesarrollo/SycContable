import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrativeRoutingModule } from './administrative-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { ManageVacationsComponent } from './manage-vacations/manage-vacations.component';
import { NgbPaginationModule, NgbAlertModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { InfoUserComponent } from './employees/components/info-user/info-user.component';
import { AdminCovenantComponent } from './covenants/components/admin-covenant/admin-covenant.component';
import { SliderComponent } from './covenants/components/slider/slider.component';
import { SwiperModule } from 'swiper/angular';
import { CovenantUsersTableComponent } from './covenants/components/covenant-users-table/covenant-users-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CovenantModalsComponent } from './covenants/components/covenant-modals/covenant-modals.component';
import { UserAssigCovenantModalComponent } from './covenants/components/user-assig-covenant-modal/user-assig-covenant-modal.component';
import { ConfirmationModalComponent } from './covenants/components/confirmation-modal/confirmation-modal.component';

import { PipefilterPipe } from './pipes/pipefilter.pipe';
import { ModalAddEmployeesComponent } from './employees/modal-add-employees/modal-add-employees.component';
// modulos material
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    EmployeesComponent,
    ManageVacationsComponent,
    InfoUserComponent,
    AdminCovenantComponent,
    SliderComponent,
    CovenantUsersTableComponent,
    CovenantModalsComponent,
    UserAssigCovenantModalComponent,
    ConfirmationModalComponent,
    PipefilterPipe,
    ModalAddEmployeesComponent,

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdministrativeRoutingModule,
    SwiperModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    MatDialogModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ]
})
export class AdministrativeModule { }
