import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayrollService } from 'src/app/views/pages/payroll/service/payroll.service';
import { EmployeeInterface } from '../../../employees/interfaces/employee-interface';
import { EmployeesService } from '../../../employees/services/service-employees.service';
import { VacationService } from '../../../employees/services/vacation.service';
import { CovenantsService } from '../../services/covenants.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @Input() payroll_id: number;
  @Input() vacation_id: number;
  @Input() covenant_id: number;
  @Input() user_table_id: number;
  @Input() concept_pivot_id: number;
  @Input() user_data: EmployeeInterface;

  @Output() change_users = new EventEmitter();
  @Output() change_payroll = new EventEmitter();
  @Output() change_covenant = new EventEmitter();
  @Output() change_vacations = new EventEmitter();

  isUser: boolean = false;
  isConcept: boolean = false;
  isCovenant:boolean = false;
  isVacation: boolean = false;
  isUserTable: boolean = false;
  alertSuccess: boolean = false;

  constructor(
    public modal: NgbModal,
    private serviceUser: EmployeesService,
    private servicePayroll: PayrollService,
    private serviceVacation: VacationService,
    private serviceCovenant: CovenantsService,
  ) { }

  ngOnInit(): void {
    this.user_data ? this.isUser = true : this.isUser = false;
    this.covenant_id ? this.isCovenant = true : this.isCovenant = false;
    this.vacation_id ? this.isVacation = true : this.isVacation = false;
    this.user_table_id ? this.isUserTable = true : this.isUserTable = false;
    this.concept_pivot_id ? this.isConcept = true : this.isConcept = false;
  }

  deleteCovenant(){
    this.serviceCovenant.deleteCovenant(this.covenant_id).subscribe(() =>{
      this.alertSuccess = true;
      setTimeout(()=>{this.alertSuccess = false; this.modal.dismissAll()}, 3000);
      this.change_covenant.emit(this.covenant_id);
    })
  }
  deleteUser(){
    let pivot_id = this.user_data.pivot.id
    this.serviceUser.deleteUserCovenant(this.user_data.id, pivot_id).subscribe(() =>{
      this.alertSuccess = true;
      setTimeout(()=>{this.alertSuccess = false; this.modal.dismissAll()}, 3000);
      this.change_covenant.emit(this.user_data.pivot.covenant_id);
    })
  }
  deleteConcept(){
    this.servicePayroll.deleteConcept(this.payroll_id, this.concept_pivot_id).subscribe(() =>{
      this.alertSuccess = true;
      setTimeout(()=>{this.alertSuccess = false; this.modal.dismissAll()}, 3000);
      this.change_payroll.emit();
    })
  }
  deleteUserTable(){
    this.serviceUser.deleteUser(this.user_table_id).subscribe(() => {
      this.alertSuccess = true;
      setTimeout(()=>{this.alertSuccess = false; this.modal.dismissAll()}, 3000);
      this.change_users.emit();
    });
  }
  deleteUserVacation(){
    this.alertSuccess = true;
    this.serviceVacation.deleteVacation(this.vacation_id).subscribe(() => {
      setTimeout(()=>{this.alertSuccess = false; this.modal.dismissAll()}, 3000);
      this.change_vacations.emit();
    })
  }
}
