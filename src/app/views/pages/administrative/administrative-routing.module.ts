import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { InfoUserComponent } from './employees/components/info-user/info-user.component';
import { ManageVacationsComponent } from './manage-vacations/manage-vacations.component';
import { SliderComponent } from './covenants/components/slider/slider.component';

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