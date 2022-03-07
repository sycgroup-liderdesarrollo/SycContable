import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrativeRoutingModule } from './administrative-routing.module';
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
import { ModalAddEmployeesComponent } from './employees/components/modal-add-employees/modal-add-employees.component';
// modulos material
import { EmployeesComponent } from './employees/components/table-employee/employees.component';
import {MatPaginatorModule} from '@angular/material/paginator';

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
    NgbNavModule,
    MatPaginatorModule
  ]
})
export class AdministrativeModule { }
