import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PeriodicidadConvenioService } from '../../administrativo/services/convenios/periodicidad-convenio.service';
import { TipoConvenioService } from '../../administrativo/services/convenios/tipo-convenio.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker'
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';


const moment = _rollupMoment || _moment;


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-deducciones-por-conveniosy-periodos',
  templateUrl: './deducciones-por-conveniosy-periodos.component.html',
  styleUrls: ['./deducciones-por-conveniosy-periodos.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DeduccionesPorConveniosyPeriodosComponent implements OnInit {
 

    @ViewChild('picker') datePickerElement = MatDatepicker;
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
    date = new FormControl(moment());

    chosenYearHandler(normalizedYear: Moment) {
      const ctrlValue = this.date.value;
      ctrlValue.year(normalizedYear.year());
      this.date.setValue(ctrlValue);
    }

    chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
      const ctrlValue = this.date.value;
      ctrlValue.month(normalizedMonth.month());
      this.date.setValue(ctrlValue);
      datepicker.close();
    }


}

  // mes(){
  //   const date = new Date().getMonth;
  // }


