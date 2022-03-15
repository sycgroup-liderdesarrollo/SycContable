import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfirmationModalComponent } from '../../../covenants/components/confirmation-modal/confirmation-modal.component';
import { EmployeeInterface } from '../../interfaces/employee-interface';
import { VacationInterface } from '../../interfaces/vacation-interface';
import { EmployeesService } from '../../services/service-employees.service';
import { VacationService } from '../../services/vacation.service';
import { ModalAssignVacationComponent } from '../modal-assign-vacation/modal-assign-vacation.component';

@Component({
  selector: 'app-manage-vacations',
  templateUrl: './manage-vacations.component.html',
  styleUrls: ['./manage-vacations.component.scss']
})
export class ManageVacationsComponent implements OnInit {

  length = 10;
  pageSize = 10;
  pageNumber = 1;
  pageSizeOptions: number[] = [5, 10];

  users: EmployeeInterface[];
  isUsersEmpty: boolean = false;
  vacations: VacationInterface[];
  isVacationEmpty: boolean = false;

  constructor(
    public modal: NgbModal,
    private serviceUser: EmployeesService,
    private serviceVacation: VacationService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getVacations();
  }

  handlePage(event: PageEvent){
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.getUsers('', this.pageSize, this.pageNumber)
  }
  handlePageVacation(event: PageEvent){
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.getVacations(this.pageSize, this.pageNumber)
  }
  getUsers(filter?:string, pageSize?:number, pageNumber?:number){
    this.serviceUser.getUsers(filter, pageSize, pageNumber).pipe(
      map( (element:any) =>{
        element.data.forEach((user:any) => {
          user.image = `${environment.base_API_url}${user.image}`;
        });
        this.length = element.meta?.total ?? 10;
        return element.data;
      }),
    ).subscribe(resp => {
      this.users = resp;
      this.users.length > 0 ? this.isUsersEmpty = false : this.isUsersEmpty = true;
    })
  }

  filterUser(e: any){
    this.getUsers(e.target.value);
  }
  openModalAssign(user_data: EmployeeInterface){
    const modalRef = this.modal.open(ModalAssignVacationComponent);
    modalRef.componentInstance.user_data = user_data;
    modalRef.componentInstance.refresh_vacations.subscribe(() => {
      this.getVacations();
    })
  }
  openModalUpdate(vacation_data: VacationInterface){
    const modalRef = this.modal.open(ModalAssignVacationComponent)
    modalRef.componentInstance.vacation_data = vacation_data;
    modalRef.componentInstance.refresh_vacations.subscribe(() => {
      this.getVacations();
    })
  }
  getVacations(pageSize?: number, pageNumber?: number){
    this.serviceVacation.getVacations(pageSize, pageNumber).subscribe(resp => {
      this.vacations = resp.data
      this.length = resp.meta?.total ?? 10;
      this.vacations.length > 0 ? this.isVacationEmpty = false : this.isVacationEmpty = true;
    })
  }
  openDeleteVacationModal(vacation_id: number){
    const modalRef = this.modal.open(ConfirmationModalComponent);
    modalRef.componentInstance.vacation_id = vacation_id
    modalRef.componentInstance.change_vacations.subscribe(() => {
      this.getVacations();
    })
  }
}
