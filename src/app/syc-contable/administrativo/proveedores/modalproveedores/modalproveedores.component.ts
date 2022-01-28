import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CiudadService } from '../../services/empleados/ciudad.service';
import { TipoIdentificacionService } from '../../services/empleados/tipo-identificacion.service';
import { ConstitutionTypeService } from '../../services/proveedores/constitution-type.service';
import { ResponsabilityTypeService } from '../../services/proveedores/responsability-type.service';
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
  tiposNegocios:any;
  tipoResponsabilidadIva:any;
  direccion:any;
  Identificacion:any;
  telefono:any;
  dataProvider: any;
  isLoading:boolean=false;
  juridico:boolean=true;
  nombre:string="NOMBRE";
  ciudades:any;
  provinces:any;


  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<ModalproveedoresComponent>,
    private serviceproviders: ServicioProveedoresService,
    private servicesTipoIdentificacion: TipoIdentificacionService,
    private serviceConstitutionType: ConstitutionTypeService,
    private serviceResponsabilityType: ResponsabilityTypeService,
    private serviceCities:CiudadService,

  ) {}

  ngOnInit(): void {
    this.init();

    //obtiene los tipos de negocio, si es natural o juridico
    this.serviceConstitutionType.getConstitutionType().subscribe(resp =>{
      this.tiposNegocios = resp.data
    });
    //obtiene los tipo de responsabilidad de iva
    this.serviceResponsabilityType.getResponsabilityType().subscribe(resp =>{
      this.tipoResponsabilidadIva = resp.data
    });
    this.serviceCities.getProvince().subscribe(resp=>{
      this.provinces = resp.data;
    })
    //obtiene todas las ciudades
    this.serviceCities.getCiudad().subscribe(resp=>{
      this.ciudades = resp.data;
    })
  }

  editProvider(){
    this.serviceproviders.putProvider(this.id).subscribe(
      resp => {
        this.dataProvider = resp.data;
        this.crearform(this.dataProvider);
      }
    )
  }

  crearform(dataProvider?:any){
      this.form = this.fb.group({
        identification_type_id: [dataProvider?.identification_type_id ?? '', Validators.required],
        constitution_type_id: [dataProvider?.constitution_type_id ?? '', Validators.required],
        identification_number: [dataProvider?.identification_number ?? '', Validators.required],
        name: [dataProvider?.name ?? '', Validators.required],
        address: [dataProvider?.address ?? '', Validators.required],
        phone: [dataProvider?.phone ?? '', Validators.required],
        trade_name: [dataProvider?.trade_name ?? '', Validators.required],
        email: [dataProvider?.email ?? '', Validators.required],
        password:[dataProvider?.password ?? '', Validators.required],
        iva: [dataProvider?.iva ?? '', Validators.required],
        responsability_type_id: [dataProvider?.responsability_type_id ?? '', Validators.required],
        last_name: [dataProvider?.last_name ?? ''],
        city_id: [dataProvider?.city_id ?? '', Validators.required],
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
  constitutionActual(actualConstitution:number){
    if (actualConstitution == 2) {
      this.nombre="RAZON SOCIAL";
      this.juridico = false;
    }else{
      this.nombre="NOMBRE"
      this.juridico = true;
    }
  }

  cities(province_id:number){
    this.serviceCities.getCiudad(province_id).subscribe(resp=>{
      this.ciudades = resp.data;
    })
  }
}
