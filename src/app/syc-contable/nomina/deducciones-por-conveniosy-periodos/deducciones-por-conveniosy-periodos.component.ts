import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PeriodicidadConvenioService } from '../../administrativo/services/convenios/periodicidad-convenio.service';
import { TipoConvenioService } from '../../administrativo/services/convenios/tipo-convenio.service';

@Component({
  selector: 'app-deducciones-por-conveniosy-periodos',
  templateUrl: './deducciones-por-conveniosy-periodos.component.html',
  styleUrls: ['./deducciones-por-conveniosy-periodos.component.css']
})
export class DeduccionesPorConveniosyPeriodosComponent implements OnInit {
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatTable) tabla1!: MatTable<any>;
  @ViewChild(MatSort)
  dataConvenant: any;
  covenants:any;
  form: any;
  meses:any;
  periodo:any;
  DataDeducciones:any;

  columna: string[] = ['TotalDeduccion', 'NumeroTrabajadores'];
  data=[
    {
      TotalDeduccion:'20',
      NumeroTrabajadores:'1',
    },
  ]
  // new Date().getMonth();
mes=[
  'ENERO',
  'FEBRERO',
  'MARZO',
  'ABRIL',
  'MAYO',
  'JUNIO',
]
  constructor(
    private servicesTipoConvenio:TipoConvenioService,
    private servicesperiodo:PeriodicidadConvenioService,
    private fb: FormBuilder,) {
    this.DataDeducciones = new MatTableDataSource();
    this.DataDeducciones.data = this.data;
     }

  ngOnInit(): void {
    this.crearform();

    this.servicesTipoConvenio.getConvenant().subscribe(rest => {
      this.covenants = rest.data
    });
    this.servicesperiodo.getperiodo().subscribe(rest => {
      this.periodo = rest.data
      console.log(rest);
      
    });
  }

  crearform(dataConvenant?:any){
    this.form = this.fb.group({
      covenant: [dataConvenant?.covenant ?? '', Validators.required],
      mes:['', Validators.required],
      period : [dataConvenant?.period ?? '', Validators.required],
    });
  }

  // mes(){
  //   const date = new Date().getMonth;
  // }

}
