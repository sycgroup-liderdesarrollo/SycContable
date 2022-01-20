import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConceptConvenioService } from '../../services/convenios/concept-convenio.service';
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
@Input() isEdit: boolean = true;

  dataConvenant: any;
  form!: FormGroup;
  periodicidad:any;
  convenants:any;
  covenantType:any;
  name:any;
  value:any;
  respuesta:any;
  providers:any;
  ValueActual:any;
  iscuota: boolean=false;

  actives = [
    {value : "1", name : "Activo"},
    {value : "0", name : "Inactivo"}
  ]


  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<ModalconveniosComponent>,
    private convenantservices: ConvenantService,
    private servicesperiodicidad:PeriodicidadConvenioService,
    private servicesTipoConvenio:TipoConvenioService,
    private serviceproviders:ServicioProveedoresService,
  ) { }

  ngOnInit(): void {
  this.id ? this.editConvenant() : this.crearform()

    this.servicesperiodicidad.getperiodicidad().subscribe(rest => {
      this.periodicidad = rest.data
    });

    this.servicesTipoConvenio.getConvenant().subscribe(rest => {
      this.convenants = rest.data
    });

    this.servicesTipoConvenio.getConvenantType().subscribe(rest => {
      this.covenantType = rest.data
    });

    this.serviceproviders.getProviders().subscribe(resp=> {
      this.providers = resp.data
    })

  }
  
  editConvenant(){
    this.convenantservices.putConvenant(this.id).subscribe(
      resp => {
        this.dataConvenant = resp.data;

      },
      error => {

      }, 
      () => {
        this.crearform(this.dataConvenant);
      }
    )
  }
  
  crearform(dataConvenant?:any){
    this.form = this.fb.group({
      name: [dataConvenant?.name ?? '', Validators.required],
      value: [ dataConvenant?.value ?? '0', Validators.required],
      active: [dataConvenant?.active ?? '1', Validators.required],
      covenant_type_id: [dataConvenant?.covenant_type_id ?? '', Validators.required],
      periodicity_type_id : [dataConvenant?.periodicity_type_id ?? '', Validators.required],
      concept_name: [dataConvenant?.concept.name ?? '', Validators.required],
      provider_id:[dataConvenant?.provider_id ?? '', Validators.required],
    });
  }


  crearConvenio(formData:any){ 
    this.convenantservices.postConvenant(formData).subscribe(res => {
      this.respuesta = res;
      this.dialog.close();
    });
  }
  updateConvenio(formData:any){ 
    this.convenantservices.updateConvenant(formData, this.id).subscribe(res =>{  console.log('todo con exito');
      this.dialog.close();
    });
  }

}
