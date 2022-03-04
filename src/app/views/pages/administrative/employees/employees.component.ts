import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { EmployeeInterface } from 'src/app/interfaces/employee-interface';
import { ModalAddEmployeesComponent } from './modal-add-employees/modal-add-employees.component';
import { ServiceEmployeesService } from './services/service-employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [NgbModalConfig, NgbModal]

})
export class EmployeesComponent implements OnInit {

  @Input() id:any;
  @Input() isEdit: boolean = false;
  form:FormGroup;
  filterUsers:'';
  users:EmployeeInterface[];
  allUsers:EmployeeInterface[];
  collectionSize: number;
  page = 1;
  pageSize = 4;
  total:number;
  user:any;

  constructor(
    config: NgbTypeaheadConfig,

    private router:Router,
    private serviceEmployees:ServiceEmployeesService,
    private fb:FormBuilder,
    public modal:NgbModal,
  ) {
    config.showHint = true;}

  ngOnInit(): void {
    this.getEmployees();
    this.crearform();
  }

  crearform(dataEmployees?:any){

    this.form = this.fb.group({
      name:                     [dataEmployees?.name ?? '', Validators.required],
      last_name:                [dataEmployees?.last_name ?? '', Validators.required],
      identification_number:    [dataEmployees?.identification_number ?? '', Validators.compose([
                                  Validators.required,
                                ])],
      email:                    [dataEmployees?.email ?? '',Validators.compose([
                                  Validators.required,Validators.email,
                                ])],
      base_salary:              [dataEmployees?.base_salary ?? '', Validators.required],
      position:                 [dataEmployees?.position ?? '', Validators.required],
    });
  }

  getEmployees(){
    this.serviceEmployees.getEmployed().subscribe(res =>{
      this.users = res.data;
    })
  }

  verProfile(userId:number){
    this.router.navigate(["/administrative/info-user",userId])
  }

  open() {
    const openmodalRef = this.modal.open(ModalAddEmployeesComponent);
    openmodalRef.componentInstance.dataEmployees = this.users;
  }

    search(filter: Observable<string>){
      filter.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => term.length < 2 ? []
          : this.users.filter(v => v.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10))
      )
    }

}
