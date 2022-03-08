import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ConfirmationModalComponent } from '../../../administrative/covenants/components/confirmation-modal/confirmation-modal.component';
import { PayrollInterface } from '../../interfaces/payroll-interface';
import { AddConceptModalComponent } from '../add-concept-modal/add-concept-modal.component';

@Component({
  selector: 'app-info-payroll',
  templateUrl: './info-payroll.component.html',
  styleUrls: ['./info-payroll.component.scss']
})
export class InfoPayrollComponent implements OnInit, OnChanges {

  @Input() user_image:string;
  @Input() payroll_data:PayrollInterface;
  @Output() refresh_payroll = new EventEmitter();

  totalAccrued:number;
  totalDeducted:number;
  totalPaid:number;

  constructor(
    public modal: NgbModal
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
     if (changes.payroll_data.currentValue) {
      if (this.payroll_data.concepts.length == 0) {
        this.totalAccrued = 0,
        this.totalDeducted = 0,
        this.totalPaid = 0
      }else{
        this.calcOfPayroll();
      }
    }
  }
  calcOfPayroll(){
    this.totalAccrued = 0,
    this.totalDeducted = 0,
    this.totalPaid = 0
    this.payroll_data.concepts.forEach((concept:any) => {
      if (concept.concept_type_id == 1) {
        this.totalAccrued += concept.pivot.total_value;
      }else{
        this.totalDeducted += concept.pivot.total_value;
      }
    });
    this.totalPaid = this.totalAccrued - this.totalDeducted;
  }
  openAddAccruedModal(){
    const modalRef = this.modal.open(AddConceptModalComponent);
    modalRef.componentInstance.concept_type_id = 1
    modalRef.componentInstance.payroll_id = this.payroll_data.id
    modalRef.componentInstance.payroll_refresh.subscribe(()=>{
      this.refresh_payroll.emit(this.payroll_data.user.id);
    })
  }
  openAddDeductionModal(){
    const modalRef = this.modal.open(AddConceptModalComponent);
    modalRef.componentInstance.concept_type_id = 2
    modalRef.componentInstance.payroll_id = this.payroll_data.id
    modalRef.componentInstance.payroll_refresh.subscribe(()=>{
      this.refresh_payroll.emit(this.payroll_data.user.id);
    })
  }
  openDeleteModal(concept_data:any){
    const modalRef = this.modal.open(ConfirmationModalComponent)
    modalRef.componentInstance.concept_pivot_id = concept_data.pivot.id;
    modalRef.componentInstance.payroll_id = this.payroll_data.id;
    modalRef.componentInstance.change_payroll.subscribe(()=>{
      this.refresh_payroll.emit(this.payroll_data.user.id);
    })
  }
  print(){
    window.open(`${environment.base_API_url}payroll/`+this.payroll_data.id);
  }
}
