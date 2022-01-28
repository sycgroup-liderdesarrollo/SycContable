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
  message:boolean=false;

  constructor(
    private fb: FormBuilder,
    private serviceContact: ContactService,
    private dialog: MatDialogRef<ModalContactsComponent>,

  ) {}

  ngOnInit(): void {
    this.crearForm();
  }

  crearForm(dataContact?:any){

    this.form = this.fb.group({
      name: new FormControl('', Validators.minLength(3)),
      last_name: new FormControl('', Validators.minLength(3)),
      email: new FormControl('', Validators.email),
      phone: [dataContact?.phone ?? '', Validators.required],
      position: [dataContact?.position ?? '', Validators.required],
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
}
