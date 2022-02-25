import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceEmployeesService } from '../../../employees/services/service-employees.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { UserAssigCovenantModalComponent } from '../user-assig-covenant-modal/user-assig-covenant-modal.component';

@Component({
  selector: 'app-covenant-users-table',
  templateUrl: './covenant-users-table.component.html',
  styleUrls: ['./covenant-users-table.component.scss']
})
export class CovenantUsersTableComponent implements OnInit {

  @Input() covenant:any;
  
  constructor(
    public modal:NgbModal,
  ) { }

  ngOnInit(): void {
  }

  openModal(){
    const modalRef = this.modal.open(UserAssigCovenantModalComponent);
    modalRef.componentInstance.covenantData = this.covenant;
  }
  openDeleteModal(userData:any){
    const modalRef = this.modal.open(ConfirmationModalComponent);
    modalRef.componentInstance.user_data = userData;
  }

}
