import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrativeRoutingModule } from './administrative-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { ManageVacationsComponent } from './manage-vacations/manage-vacations.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { InfoUserComponent } from './employees/components/info-user/info-user.component';
import { AdminCovenantComponent } from './covenants/components/admin-covenant/admin-covenant.component';
import { SliderComponent } from './covenants/components/slider/slider.component';
import { SwiperModule } from 'swiper/angular';
import { AssingCovenantComponent } from './covenants/components/assing-covenant/assing-covenant.component';
import { CovenantUsersTableComponent } from './covenants/components/covenant-users-table/covenant-users-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployeesComponent,
    ManageVacationsComponent,
    InfoUserComponent,
    AdminCovenantComponent,
    AssingCovenantComponent,
    SliderComponent,
    CovenantUsersTableComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdministrativeRoutingModule,
    SwiperModule,
    NgbPaginationModule,
    NgbAlertModule
  ]
})
export class AdministrativeModule { }
