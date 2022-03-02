import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { InfoPayrollComponent } from './components/info-payroll/info-payroll.component';
import { AddConceptModalComponent } from './components/add-concept-modal/add-concept-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    SearchUserComponent,
    InfoPayrollComponent,
    AddConceptModalComponent,
  ],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,

  ]
})
export class PayrollModule { }
