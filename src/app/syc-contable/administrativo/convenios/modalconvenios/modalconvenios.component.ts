import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConvenantService } from '../../services/convenios/convenant.service';
import { PeriodicidadConvenioService } from '../../services/convenios/periodicidad-convenio.service';
import { TipoConvenioService } from '../../services/convenios/tipo-convenio.service';
import { ServicioProveedoresService } from '../../services/proveedores/servicio-proveedores.service';


@Component({
  selector: 'app-modalconvenios',
  templateUrl: './modalconvenios.component.html',
  styleUrls: ['./modalconvenios.component.css']
})
export class ModalconveniosComponent implements OnInit {

@Input() id?: any;
@Input() isEdit: boolean = false;

  dataConvenant: any;
  form!: FormGroup;
  periodicidad:any;
  convenants:any;
  covenantType:any;
  name:any;
  value:any;
  active:any;
  respuesta:any;
  providers:any;
  ValueActual:any;
  iscuota: boolean=false;
  isLoading:boolean=false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<ModalconveniosComponent>,
    private convenantservices: ConvenantService,
    private servicesperiodicidad:PeriodicidadConvenioService,
    private servicesTipoConvenio:TipoConvenioService,
    private serviceproviders:ServicioProveedoresService,
  ) { }

  ngOnInit(): void {
    this.init();
  }
  
  editConvenant(){
    this.convenantservices.putConvenant(this.id).subscribe(
      resp => {
        this.dataConvenant = resp.data;
        
        this.crearform(this.dataConvenant);
      },
    )
  }
  
  crearform(dataConvenant?:any){
    
    this.form = this.fb.group({
      name: [dataConvenant?.name ?? '', Validators.required],
      value: [ dataConvenant?.value ?? ''],
      active: [ dataConvenant?.active ?? 1],
      covenant_type_id: [dataConvenant?.covenant_type_id ?? '', Validators.required],
      periodicity_type_id : [dataConvenant?.periodicity_type_id ?? '', Validators.required],
      concept_name: [dataConvenant?.concept.name ?? '', Validators.required],
      provider_id:[dataConvenant?.provider_id ?? '', Validators.required],
    });
    this.isLoading=false;
  }
  crearConvenio(formData:any){ 
    console.log(formData);
    
    this.convenantservices.postConvenant(formData).subscribe(res => {
      this.respuesta = res;
      this.dialog.close();
    });
  }
  updateConvenio(formData:any,id:any){ 
    console.log(formData);
    
    this.convenantservices.updateConvenant(formData,id).subscribe(res =>{ 
    this.respuesta = res;
      this.dialog.close();
    });
  }

  async init(){
    this.isLoading = true;
    await this.getPeriodicidad();
    await this.getConvenio();
    await this.getTipoConvenio();
    await this.getProviders();
    this.id ? this.editConvenant() : this.crearform();
  }

  getPeriodicidad(): Promise<any>{
    return new Promise((resolve,reject)=>{
      this.servicesperiodicidad.getperiodicidad().subscribe(rest => {
        this.periodicidad = rest.data
        resolve(rest.data);
      });
    })
  }

  getConvenio(): Promise<any>{
    return new Promise((resolve,reject)=>{
    this.servicesTipoConvenio.getConvenant().subscribe(rest => {
      this.convenants = rest.data
       resolve(rest.data);
      });
    })
  }

  getTipoConvenio(): Promise<any>{
    return new Promise((resolve,reject)=>{
    this.servicesTipoConvenio.getConvenantType().subscribe(rest => {
      this.covenantType = rest.data
      resolve(rest.data);
      });
    })
  }

  getProviders(): Promise<any>{
    return new Promise((resolve,reject)=>{
    this.serviceproviders.getProviders().subscribe(resp=> {
      this.providers = resp.data
      resolve(resp.data);
      });
    })
  }

}
