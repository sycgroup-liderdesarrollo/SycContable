import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../../../covenants/components/confirmation-modal/confirmation-modal.component';
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

  length = 10;
  pageSize = 10;
  pageNumber = 1;
  users:EmployeeInterface[];
  pageSizeOptions: number[] = [5, 10];

  constructor(
    private serviceUser:EmployeesService,
    public modal:NgbModal,
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees(pageSize?:number, pageNumber?:number){
    this.serviceUser.getUsers('', pageSize, pageNumber).subscribe(res =>{
      this.users = res.data;
      this.length = res.meta?.total ?? 10;
    })
  }
  userFilter(event:any){
    this.serviceUser.getUsers(event.target.value).subscribe(resp => {
      this.users = resp.data
    })
  }
  openAddModal() {
    const openmodalRef = this.modal.open(ModalAddEmployeesComponent, {size: 'lg'});
    openmodalRef.componentInstance.refresh_users.subscribe(($e:any)=>{
      this.getEmployees();
    })
  }
  handlePage(event: PageEvent){
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.getEmployees(this.pageSize, this.pageNumber);
  }
  openDeleteModal(user_id: number){
    const modalRef = this.modal.open(ConfirmationModalComponent);
    modalRef.componentInstance.user_table_id = user_id;
    modalRef.componentInstance.change_users.subscribe(() =>{
      this.getEmployees();
    })
  }
}
