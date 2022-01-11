import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConceptConvenioService } from '../../services/convenios/concept-convenio.service';
import { ConvenantService } from '../../services/convenios/convenant.service';
import { PeriodicidadConvenioService } from '../../services/convenios/periodicidad-convenio.service';
import { TipoConvenioService } from '../../services/convenios/tipo-convenio.service';


@Component({
  selector: 'app-modalconvenios',
  templateUrl: './modalconvenios.component.html',
  styleUrls: ['./modalconvenios.component.css']
})
export class ModalconveniosComponent implements OnInit {

@Input() id?: any;
@Input() isEdit: boolean = true;

  selectedValue!: string;
  dataConvenant: any;
  form!: FormGroup;
  periodicidad:any;
  convenants:any;
  conceptType:any;
  name:any;
  value:any;
  respuesta:any;
  
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
    private servicesTipoConcepto:ConceptConvenioService,
  ) { }

  ngOnInit(): void {
 this.id ? this.editConvenant() : this.crearform()

   this.servicesperiodicidad.getperiodicidad().subscribe(rest => {
    this.periodicidad = rest.data
  });

  this.servicesTipoConvenio.getConvenant().subscribe(rest => {
    this.convenants = rest.data
  });
  this.servicesTipoConcepto.getconceptType().subscribe(rest => [
    this.conceptType = rest.data
  ])
  }

  editConvenant(){
    this.convenantservices.putConvenant(this.id).subscribe(
      resp => {
        this.dataConvenant = resp.data;
        console.log(this.dataConvenant);
        
        
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
    value: [ dataConvenant?.value ?? '', Validators.required],
    active: [dataConvenant?.active ?? '1', Validators.required],
    covenant_type_id : [dataConvenant?.covenant_type_id ?? '', Validators.required],
    periodicity_type_id : [dataConvenant?.periodicity_type_id ?? '', Validators.required],
    concept_name: [dataConvenant?.concept.name ?? '', Validators.required],
  });
}

crearConvenio(formData:any){
  console.log(formData);
  
  this.convenantservices.postConvenant(formData).subscribe(res => {
    this.respuesta = res;
    this.dialog.close();
  } )
}
updateConvenio(formData:any){
  console.log(formData);
  
  this.convenantservices.updateConvenant(formData, this.id).subscribe(res =>{
    console.log('todo con exito');
    this.dialog.close();
  });
}





}
