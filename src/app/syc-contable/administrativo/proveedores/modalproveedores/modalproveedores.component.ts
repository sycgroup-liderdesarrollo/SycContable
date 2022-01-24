import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TipoIdentificacionService } from '../../services/empleados/tipo-identificacion.service';
import { ServicioProveedoresService } from '../../services/proveedores/servicio-proveedores.service';

@Component({
  selector: 'app-modalproveedores',
  templateUrl: './modalproveedores.component.html',
  styleUrls: ['./modalproveedores.component.css']
})
export class ModalproveedoresComponent implements OnInit {
  
  @Input() id?: any;
@Input() isEdit: boolean = true;


  selectedValue!: string;
  form!: FormGroup;
  name:any;
  respuesta:any;
  value:any;
  TipoIdentificacion:any;
  direccion:any;
  Identificacion:any;
  telefono:any;
  dataProvider: any;
  isLoading:boolean=false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<ModalproveedoresComponent>,
    private serviceproviders: ServicioProveedoresService,
    private servicesTipoIdentificacion: TipoIdentificacionService,


  ) {}

  ngOnInit(): void {
    this.init();
  }

  editProvider(){
    this.serviceproviders.putProvider(this.id).subscribe(
      resp => {
        this.dataProvider = resp.data;
        console.log(this.dataProvider);
        this.crearform(this.dataProvider);
        
        
      },
    )
  }

  crearform(dataProvider?:any){
    this.form = this.fb.group({
       identification_type_id: [dataProvider?. identification_type_id ?? '', Validators.required],
      identification_number: [dataProvider?.identification_number ?? '', Validators.required],
      name: [dataProvider?.name ?? '', Validators.required],
      address: [dataProvider?.address ?? '', Validators.required],
      phone: [dataProvider?.phone ?? '', Validators.required],
    });
    this.isLoading=false;
  }

  crearProvider(formData:any){
    console.log(formData);
    
    this.serviceproviders.postProvider(formData).subscribe(res => {
      this.respuesta = res;
      this.dialog.close();
    } )
  }
  updateProvider(formData:any){
    console.log(formData);
    
    this.serviceproviders.updateProvider(formData, this.id).subscribe(res =>{
      console.log('todo con exito');
      this.dialog.close();
    });
  }
  async init(){
    this.isLoading = true;
    await this.getTipoIdentificacion();
    this.id ? this.editProvider() : this.crearform()
  }

  getTipoIdentificacion(){
    return new Promise( (resolve,reject) => {
      this.servicesTipoIdentificacion.getTipoIdentificacion().subscribe(rest => {
        this.TipoIdentificacion = rest.data
        resolve(rest.data);
      });
    })
  }

}
