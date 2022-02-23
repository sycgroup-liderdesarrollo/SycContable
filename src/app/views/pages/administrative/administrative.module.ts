import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrativeRoutingModule } from './administrative-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { ManageVacationsComponent } from './manage-vacations/manage-vacations.component';
import {NgbPaginationModule, NgbAlertModule, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import { InfoUserComponent } from './employees/components/info-user/info-user.component';
import { AdminCovenantComponent } from './covenants/admin-covenant/admin-covenant.component';
import { AssingCovenantComponent } from './covenants/assing-covenant/assing-covenant.component';
import { SliderComponent } from './covenants/slider/slider.component';
import { SwiperModule } from 'swiper/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    EmployeesComponent,
    ManageVacationsComponent,
    InfoUserComponent,
    AdminCovenantComponent,
    AssingCovenantComponent,
    SliderComponent,
  ],
  imports: [
    CommonModule,
    AdministrativeRoutingModule,
    SwiperModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule
    
  ]
})
export class AdministrativeModule { }
