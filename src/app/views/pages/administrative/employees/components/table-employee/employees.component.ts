import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeInterface } from '../../interfaces/employee-interface';
import { EmployeesService } from '../../services/service-employees.service';
import { ModalAddEmployeesComponent } from '../modal-add-employees/modal-add-employees.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})

export class EmployeesComponent implements OnInit {

  users:EmployeeInterface[];
  page = 1;
  pageSize = 4;

  constructor(
    private serviceEmployees:EmployeesService,
    public modal:NgbModal,
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees(){
    this.serviceEmployees.getEmployed().subscribe(res =>{
      this.users = res.data;
    })
  }
  open() {
    const openmodalRef = this.modal.open(ModalAddEmployeesComponent);
    openmodalRef.componentInstance.dataEmployees = this.users;
  }
}
