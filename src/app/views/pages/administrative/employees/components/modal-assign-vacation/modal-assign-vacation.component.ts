import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeInterface } from '../../interfaces/employee-interface';
import { VacationInterface } from '../../interfaces/vacation-interface';
import { VacationService } from '../../services/vacation.service';

@Component({
  selector: 'app-modal-assign-vacation',
  templateUrl: './modal-assign-vacation.component.html',
  styleUrls: ['./modal-assign-vacation.component.scss']
})
export class ModalAssignVacationComponent implements OnInit {

  @Input() user_data: EmployeeInterface;
  @Input() vacation_data: VacationInterface;

  @Output() refresh_vacations = new EventEmitter();

  form: FormGroup;
  actualDate: Date;
  messageText: string = " ";
  messageAlert: boolean;

  constructor(
    public modal: NgbModal,
    private fb: FormBuilder,
    private serviceVacation: VacationService
  ) { }

  ngOnInit(): void {
    console.log(this.vacation_data);

    this.vacation_data ? this.makeForm(this.vacation_data) : this.makeForm();
  }

  makeForm(vacation_data?: VacationInterface){
    this.form = this.fb.group({
      start_date: [vacation_data?.start_date ?? '', Validators.required],
      end_date:   [vacation_data?.end_date ?? '', Validators.required],
      user_id:    [this.user_data?.id ?? this.vacation_data?.user.id]
    })
  }
  assignVacation(form: any){
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let hours = "T00:00:00";
    let startDate = new Date(form.start_date+hours);
    let endDate = new Date(form.end_date+hours);

    if(month+1 <= 9){
      this.actualDate = new Date(year+"-"+"0"+(month+1)+"-"+day+hours);
    }else{
      this.actualDate = new Date(year+"-"+(month+1)+"-"+day+hours);
    }
    if(this.actualDate <= startDate){
      if (startDate <= endDate) {
        this.messageText = " ";
        this.serviceVacation.postVacation(form).subscribe(resp => {
          this.messageText += resp.data;
          this.messageAlert = true;
          this.refresh_vacations.emit();
          setTimeout(() => {this.modal.dismissAll();}, 2000);
        });
      }else{
        this.messageText = " ";
        this.messageText = "La fecha final debe ser mayor a la fecha de inicio"
        this.messageAlert = true;
      }
    }else{
      this.messageText = " ";
      this.messageText = "La fecha de inicio debe ser mayor o igual a la fecha actual"
      this.messageAlert = true;
    }
  }
  updateVacation(form: any){
    console.log(form);
    console.log(this.vacation_data.id);
    this.serviceVacation.putVacation(this.vacation_data.id, form).subscribe(() => {
      this.messageText = "Se actualizó correctamente";
      this.messageAlert = true;
      this.refresh_vacations.emit();
      setTimeout(() => {this.modal.dismissAll();}, 2000);
    })
  }
}
