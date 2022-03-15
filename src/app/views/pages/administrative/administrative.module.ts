import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrativeRoutingModule } from './administrative-routing.module';
import { ManageVacationsComponent } from './employees/components/manage-vacations/manage-vacations.component';
import { NgbPaginationModule, NgbAlertModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { InfoUserComponent } from './employees/components/profile-user/info-user/info-user.component';
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
import { GeneralBusinessComponent } from './employees/components/profile-user/general-business/general-business.component';
import { GeneralUserComponent } from './employees/components/profile-user/general-user/general-user.component';
import { GeneralContactComponent } from './employees/components/profile-user/general-contact/general-contact.component';
import { GeneralSegurityComponent } from './employees/components/profile-user/general-segurity/general-segurity.component';
import { ChangeImgModalComponent } from './employees/components/profile-user/change-img-modal/change-img-modal.component';
import { ModalAssignVacationComponent } from './employees/components/modal-assign-vacation/modal-assign-vacation.component';

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
    GeneralBusinessComponent,
    GeneralUserComponent,
    GeneralContactComponent,
    GeneralSegurityComponent,
    ChangeImgModalComponent,
    ModalAssignVacationComponent,
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
