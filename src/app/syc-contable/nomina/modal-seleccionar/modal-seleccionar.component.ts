import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-seleccionar',
  templateUrl: './modal-seleccionar.component.html',
  styleUrls: ['./modal-seleccionar.component.css']
})
export class ModalSeleccionarComponent implements OnInit {
  
  @Input() id?: any;
  Select!: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.crearform();
  }

  crearform(){
    this.Select= this.fb.group({
       TipoConcepto: ['', Validators.required],
      Conceptos: ['', Validators.required],
      Cantidad: ['', Validators.required],
      Valor: ['', Validators.required],
    });
  }

}
