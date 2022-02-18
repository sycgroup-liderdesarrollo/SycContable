import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { InfoUserComponent } from './employees/components/info-user/info-user.component';
import { ManageVacationsComponent } from './manage-vacations/manage-vacations.component';

const routes: Routes = [
  {
    path:'employees', component:EmployeesComponent
  },

  {
    path:'manage-vacations',component:ManageVacationsComponent
  },
  {
    path:'info-user/:id', component:InfoUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativeRoutingModule { }
