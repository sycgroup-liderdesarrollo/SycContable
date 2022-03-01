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
import { InfoPayrollComponent } from '../payroll/components/info-payroll/info-payroll.component';


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
    InfoPayrollComponent,
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
  ]
})
export class AdministrativeModule { }