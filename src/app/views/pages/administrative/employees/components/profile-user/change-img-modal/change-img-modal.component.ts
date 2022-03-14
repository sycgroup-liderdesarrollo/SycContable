import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { EmployeeInterface } from '../../../interfaces/employee-interface';
import { EmployeesService } from '../../../services/service-employees.service';

@Component({
  selector: 'app-change-img-modal',
  templateUrl: './change-img-modal.component.html',
  styleUrls: ['./change-img-modal.component.scss']
})
export class ChangeImgModalComponent implements OnInit {

  @Input() user_data:any;
  @Output() refresh_image = new EventEmitter();

  form: FormGroup;
  actualImage: any;
  changeImage: boolean = false;
  messageAlert: boolean = false;
  isLoading: boolean = false;

  constructor(
    public modal: NgbModal,
    private serviceUser: EmployeesService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.user_data);
    this.makeForm(this.user_data)
    this.actualImage = this.user_data.image
  }

  makeForm(user_data:any){
    this.form = this.fb.group({
      image: [user_data?.image ?? '']
    })
  }

  putImage(){
    this.form.value.image = this.actualImage
    this.serviceUser.putUser(this.user_data.id, this.form.value).subscribe(()=>{
      this.messageAlert = true;
      this.isLoading = true;
      setTimeout(() => {
        this.modal.dismissAll()
        this.refresh_image.emit();
      }, 2500);
    });
  }

  cacthImage(event:any){
    const covenantImage = event.target.files[0]
    this.convertToBase64(covenantImage)
    this.changeImage = true;
  }
  convertToBase64(file:File){
    const observable = new Observable((suscriber:Subscriber<any>)=>{
      this.readFile(file, suscriber);
    });
    observable.subscribe((d)=>{
      this.actualImage = d;
    })
  }
  readFile(file:File, suscriber:Subscriber<any>){
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = ()=>{
      suscriber.next(fileReader.result)
      suscriber.complete();
    }
    fileReader.onerror = (error)=>{
      suscriber.error(error)
      suscriber.complete();
    }
  }
}
