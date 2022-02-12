import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactService } from '../../../services/proveedores/contacts.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-contacts',
  templateUrl: './modal-contacts.component.html',
  styleUrls: ['./modal-contacts.component.css']
})
export class ModalContactsComponent implements OnInit {

  isLoading:boolean=true;
  form!: FormGroup;
  name:any;
  dataContact:any;
  @Input() id:any;
  @Input() isEdit:Boolean=false;
  message:boolean=false;

  constructor(
    private fb: FormBuilder,
    private serviceContact: ContactService,
    private dialog: MatDialogRef<ModalContactsComponent>,

  ) {}

  ngOnInit(): void {
    this.crearForm();
    this.isEdit ? this.showContact(): 0;

  }

  crearForm(dataContact?:any){

    this.form = this.fb.group({
      name:[dataContact?.name ??'', Validators.compose([
        Validators.required,Validators.minLength(3),
      ])],
      last_name: [dataContact?.last_name ??'', Validators.compose([
        Validators.required,Validators.minLength(3),
      ])],
      email:[dataContact?.email ??'',Validators.compose([
        Validators.required,Validators.email,
      ])],
      phone:      [dataContact?.phone ?? '', Validators.compose([
        Validators.required,Validators.minLength(10),
      ])],
      position: [dataContact?.position ?? ''],
      provider_id: [dataContact?.provider_id ?? this.id,Validators.required]
    })
    this.isLoading = false
  }

  postContact(formData:Form){
    this.serviceContact.postContact(formData).subscribe(resp=>{
      console.log(resp);
    })
    this.form.reset();
    this.crearForm();
    Swal.fire({
      showDenyButton: true,
      icon: 'success',
      title:'El contacto ha sido creado',
      confirmButtonText:'Crear nuevo contacto',
      denyButtonText: 'Salir',
      }).then((result) => {
        if (result.isDenied) {
          this.dialog.close();
        }
      })
  }
  putContact(formData:any){
    this.serviceContact.putContact(this.id, formData).subscribe(resp=>{
      console.log(resp.data);
      console.log('cambios realizados con exito');
      this.dialog.close();
    });
  }
  showContact(){
    this.serviceContact.showContact(this.id).subscribe(resp=>{
      console.log(resp.data);
      this.dataContact = resp.data;
      this.crearForm(this.dataContact);
    })
  }
}
