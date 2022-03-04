import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CovenantInterface } from 'src/app/interfaces/covenants-interface';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { UserAssigCovenantModalComponent } from '../user-assig-covenant-modal/user-assig-covenant-modal.component';

@Component({
  selector: 'app-covenant-users-table',
  templateUrl: './covenant-users-table.component.html',
  styleUrls: ['./covenant-users-table.component.scss']
})
export class CovenantUsersTableComponent implements OnInit, OnChanges {

  @Input() covenant:CovenantInterface;
  @Output() covenantId = new EventEmitter<number>();

  isPermanent:boolean = false;
  isActive:boolean = true;
  isEmpty:boolean;
  constructor(
    public modal:NgbModal,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.covenant.currentValue) {
      this.covenant.covenantType.id == 2 ? this.isPermanent = true : this.isPermanent = false;
      this.covenant.active == 1 ? this.isActive = true : this.isActive = false;
      this.covenant.users.length == 0 ? this.isEmpty = true : this.isEmpty = false;
    }
  }

  openModal(){
    const modalRef = this.modal.open(UserAssigCovenantModalComponent);
    modalRef.componentInstance.covenantData = this.covenant;
    modalRef.componentInstance.user_covenant.subscribe(($e:any) => {
      this.covenantId.emit(this.covenant.id);
    })
  }
  openDeleteModal(userData:any){
    const modalRef = this.modal.open(ConfirmationModalComponent);
    modalRef.componentInstance.user_data = userData;
    modalRef.componentInstance.change_covenant.subscribe(($e:any) => {
      this.covenantId.emit($e);
    })
  }
}
