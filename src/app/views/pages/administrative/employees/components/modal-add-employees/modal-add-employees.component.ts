import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeInterface } from '../../interfaces/employee-interface';
import { ServiceEmployeesService } from '../../services/service-employees.service';

@Component({
  selector: 'app-modal-add-employees',
  templateUrl: './modal-add-employees.component.html',
  styleUrls: ['./modal-add-employees.component.scss']
})
export class ModalAddEmployeesComponent implements OnInit {

  // isLoading:boolean = true;
  @Input() id:any;
  @Input() isEdit: boolean = false;
  users:EmployeeInterface[];
  form: FormGroup;
  user:any;

  constructor( private router:Router,
    private serviceEmployees:ServiceEmployeesService,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  crearform(dataEmployees?:any){
    this.form = this.fb.group({
      name:    [dataEmployees?.name ?? '',[Validators.required, Validators.minLength(3)]],
    });
  }

  getEmployees(){
    this.serviceEmployees.getEmployed().subscribe(res =>{
      this.users = res.data;
    })
  }


}
