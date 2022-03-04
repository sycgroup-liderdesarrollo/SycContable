import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayrollService } from 'src/app/views/pages/payroll/service/payroll.service';
import { EmployeeInterface } from '../../../employees/interfaces/employee-interface';
import { ServiceEmployeesService } from '../../../employees/services/service-employees.service';
import { CovenantsService } from '../../services/covenants.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @Input() covenant_id:number
  @Input() user_data:EmployeeInterface;
  @Input() concept_pivot_id:number;
  @Input() payroll_id:number;

  @Output() change_covenant = new EventEmitter();
  @Output() change_payroll = new EventEmitter();

  alertSuccess:boolean = false;
  isUser:boolean = false;
  isCovenant:boolean = false;
  isConcept:boolean = false;

  constructor(
    public modal:NgbModal,
    private serviceCovenant: CovenantsService,
    private serviceUser:ServiceEmployeesService,
    private servicePayroll: PayrollService,
  ) { }

  ngOnInit(): void {
    this.user_data ? this.isUser = true : this.isUser = false;
    this.concept_pivot_id ? this.isConcept = true : this.isConcept = false;
    this.covenant_id ? this.isCovenant = true : this.isCovenant = false;
  }

  deleteCovenant(){
    this.serviceCovenant.deleteCovenant(this.covenant_id).subscribe(resp =>{
      this.alertSuccess = true;
      setTimeout(()=>{this.alertSuccess = false; this.modal.dismissAll()}, 3000);
      this.change_covenant.emit(this.covenant_id);
    })
  }
  deleteUser(){
    let pivot_id = this.user_data.pivot.id
    this.serviceUser.deleteUserCovenant(this.user_data.id, pivot_id).subscribe(resp =>{
      this.alertSuccess = true;
      setTimeout(()=>{this.alertSuccess = false; this.modal.dismissAll()}, 3000);
      this.change_covenant.emit(this.user_data.pivot.covenant_id);
    })
  }
  deleteConcept(){
    this.servicePayroll.deleteConcept(this.payroll_id, this.concept_pivot_id).subscribe(resp =>{
      this.alertSuccess = true;
      setTimeout(()=>{this.alertSuccess = false; this.modal.dismissAll()}, 3000);
      this.change_payroll.emit();
    })
  }
}
