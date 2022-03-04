import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConceptInterface } from 'src/app/interfaces/concept-interface';
import { PayrollService } from '../../service/payroll.service';

@Component({
  selector: 'app-add-concept-modal',
  templateUrl: './add-concept-modal.component.html',
  styleUrls: ['./add-concept-modal.component.scss']
})
export class AddConceptModalComponent implements OnInit {

  @Input() concept_type_id:number;
  @Input() payroll_id:number;
  @Output() payroll_refresh = new EventEmitter();

  form:FormGroup;
  isSelected:boolean = false;
  concepts:ConceptInterface[];
  concept_id:number;
  isAdd:boolean = false;
  isAgain:boolean = false;

  constructor(
    private fb: FormBuilder,
    private servicePayroll:PayrollService,
    public modal:NgbModal
  ) { }

  ngOnInit(): void {
    this.makeForm();
    this.concept_type_id == 1 ? this.getConcepts(1) : this.getConcepts(2);
  }

  makeForm(){
    this.form = this.fb.group({
      concept_id: ['', Validators.required],
      count:      ['', Validators.required],
      unit_value: ['', Validators.required]
    })
  }

  conceptSelected(concept_id:number){
    this.isSelected = true;
    this.concept_id = concept_id;
  }

  getConcepts(concept_type_id?:number, concept_name?:any){
    if (concept_name) {
      this.servicePayroll.getConcetps(concept_type_id, concept_name.target.value).subscribe(resp =>{
        this.concepts = resp.data;
      })
    }else{
      this.servicePayroll.getConcetps(concept_type_id).subscribe(resp =>{
        this.concepts = resp.data;
      })
    }
  }
  addConcept(form:any){
    form.concept_id = this.concept_id
    this.servicePayroll.addConcept(this.payroll_id, form).subscribe(resp => {
      this.payroll_refresh.emit();
      this.isAdd = true
      setTimeout(() => {
        this.back()
        this.isAdd = false;
        this.isAgain = true;
      }, 3000);
      setTimeout(() => {
        this.isAgain = false;
      }, 8000);
    })
  }

  back(){
    this.isSelected = false;
    this.form.reset();
    this.makeForm();
  }
}
