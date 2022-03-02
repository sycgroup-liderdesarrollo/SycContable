import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-info-payroll',
  templateUrl: './info-payroll.component.html',
  styleUrls: ['./info-payroll.component.scss']
})
export class InfoPayrollComponent implements OnInit, OnChanges {

  @Input() payroll_data:any;
  isEmpty:boolean = false;
  totalAccrued:number;
  totalDeducted:number;
  totalPaid:number;
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
     if (changes.payroll_data.currentValue) {
     if (this.payroll_data.concepts == 0) {
      this.isEmpty = true,
      this.totalAccrued = 0,
      this.totalDeducted = 0,
      this.totalPaid = 0
     }else{
      this.isEmpty = false
      this.calcOfPayroll();
     }

    }
  }
  calcOfPayroll(){
    this.totalAccrued = 0,
    this.totalDeducted = 0,
    this.totalPaid = 0
    this.payroll_data.concepts.forEach((concept:any) => {
      console.log(concept);
      if (concept.concept_type_id == 1) {
        this.totalAccrued += concept.pivot.total_value;
      }else{
        this.totalDeducted += concept.pivot.total_value;
      }
    });
    this.totalPaid = this.totalAccrued - this.totalDeducted;
    console.log(this.totalPaid);
  }
}
