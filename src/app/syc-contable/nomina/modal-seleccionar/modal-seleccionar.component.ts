import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConceptConvenioService } from '../../administrativo/services/convenios/concept-convenio.service';
import { ConceptService } from '../../administrativo/services/nomina/concept.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ServicioNominaService } from '../../administrativo/services/nomina/servicio-nomina.service';

@Component({
  selector: 'app-modal-seleccionar',
  templateUrl: './modal-seleccionar.component.html',
  styleUrls: ['./modal-seleccionar.component.css']
})
export class ModalSeleccionarComponent implements OnInit {
  
  formData:any;
  concepts:any;
  dataConcept:any
  conceptType:any;
  @Input() id?: any;
  Select!: FormGroup;
  respuesta: any;
  
 
  constructor(
    private fb: FormBuilder,
    private servicesTipoConcepto:ConceptConvenioService,
    private serviceConcept: ConceptService,
    private dialog: MatDialogRef<ModalSeleccionarComponent>,
    private getNominaservice:ServicioNominaService,
  ) { }

  ngOnInit(): void {
    this.crearform(); 
    this.servicesTipoConcepto.getconceptType().subscribe(rest => [
      this.conceptType = rest.data
    ]);
  }

  crearform(dataConcept?:any){
    this.Select = this.fb.group({
      conceptType: [dataConcept?.concept_id  ?? '', Validators.required],
      concept_id: [dataConcept?.concept ?? '', Validators.required],
      count: [dataConcept?.count ?? '', Validators.required],
      unit_value: [dataConcept?.unit_value ?? '', Validators.required],
    });
  }

  conceptoconTipo(tipoId: number){
     this.serviceConcept.getConcepts(tipoId).subscribe(resp => {
      this.concepts = resp.data; 
    });
  }

  addConceptPayroll(formData:any,id:any){
    this.serviceConcept.addConcepts(formData,id).subscribe(res => {
      this.respuesta = res;
      this.dialog.close();
    })
  }
    
}
