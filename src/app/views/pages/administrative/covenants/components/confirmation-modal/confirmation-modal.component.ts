import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceEmployeesService } from '../../../employees/services/service-employees.service';
import { CovenantsService } from '../../services/covenants.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @Input() covenant_id:number
  @Input() user_data:any;

  @Output() change_covenant = new EventEmitter();

  alertSuccess:boolean = false;
  isUser:boolean=false;

  constructor(
    public modal:NgbModal,
    private serviceCovenant: CovenantsService,
    private serviceUser:ServiceEmployeesService
  ) { }

  ngOnInit(): void {
    this.user_data ? this.isUser = true : 0;
  }

  deleteCovenant(){

    this.serviceCovenant.deleteCovenant(this.covenant_id).subscribe(resp =>{
      this.alertSuccess = true;
      setTimeout(()=>{this.alertSuccess = false; this.modal.dismissAll()}, 3000);
      this.change_covenant.emit(this.covenant_id);
    })
  }
  deleteUser(){
    let pivot_id = this.user_data.pivot.id
    this.serviceUser.deleteUserCovenant(this.user_data.id, pivot_id).subscribe(resp =>{
      this.alertSuccess = true;
      setTimeout(()=>{this.alertSuccess = false; this.modal.dismissAll()}, 3000);
      this.change_covenant.emit(this.user_data.pivot.covenant_id);
    })
  }
}
