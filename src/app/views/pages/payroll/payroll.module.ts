import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { InfoPayrollComponent } from './components/info-payroll/info-payroll.component';


@NgModule({
  declarations: [
    SearchUserComponent,
    InfoPayrollComponent
  ],
  imports: [
    CommonModule,
    PayrollRoutingModule
  ]
})
export class PayrollModule { }
