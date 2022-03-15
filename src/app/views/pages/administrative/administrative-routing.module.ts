import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageVacationsComponent } from './employees/components/manage-vacations/manage-vacations.component';
import { SliderComponent } from './covenants/components/slider/slider.component';
import { EmployeesComponent } from './employees/components/table-employee/employees.component';
import { InfoUserComponent } from './employees/components/profile-user/info-user/info-user.component';

const routes: Routes = [
  {
    path:'employees', component:EmployeesComponent
  },
  {
    path:'manage-vacations',component:ManageVacationsComponent
  },
  {
    path:'info-user/:id', component:InfoUserComponent
  },
  {
    path:'admin-covenant',
    component: SliderComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativeRoutingModule { }
