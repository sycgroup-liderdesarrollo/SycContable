import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConceptConvenioService } from '../../administrativo/services/convenios/concept-convenio.service';
import { ConceptService } from '../../administrativo/services/nomina/concept.service';

@Component({
  selector: 'app-modal-seleccionar',
  templateUrl: './modal-seleccionar.component.html',
  styleUrls: ['./modal-seleccionar.component.css']
})
export class ModalSeleccionarComponent implements OnInit {
  
//  @Input() mostrarDatos!: boolean;
  concepts:any;
  dataConcept:any
  conceptType:any;
  @Input() id?: any;
  Select!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private servicesTipoConcepto:ConceptConvenioService,
    private serviceConcept: ConceptService,
  ) { }

  ngOnInit(): void {
    this.crearform(); 
    this.servicesTipoConcepto.getconceptType().subscribe(rest => [
      this.conceptType = rest.data
    ]);
  
    this.serviceConcept.getConcepts().subscribe(resp => {
      this.concepts = resp.data;
      console.log('entre a conceptos');
      console.log(resp);
    });
  }
  crearform(dataConcept?:any){
    this.Select = this.fb.group({
      conceptType: [dataConcept?.concept_id  ?? '', Validators.required],
      concept: [dataConcept?.concept ?? '1', Validators.required],
      count: [dataConcept?.count ?? '', Validators.required],
      unit_value: [dataConcept?.unit_value ?? '', Validators.required],
    });
    console.log(this.Select);
  }

  conceptoconTipo(tipo: Event){
    const filterType = (tipo.target as HTMLSelectElement).value;
    this.serviceConcept.getConcepts(filterType).subscribe(
      resp =>{
      this.concepts = resp.data
     });
     
     
  }
  
  // verDatos(mostrarDatos:boolean=false){
  //   this.mostrarDatos = true;
  // }

  // TraerConcept(event: Event){
  //   const filterType = (event.target as HTMLInputElement).value;
  //   this.serviceConcept.getConcepts(filterType).subscribe(
  //     resp => {
  //       this.dataConcept.data = resp.data
  //     });
  // }
}
