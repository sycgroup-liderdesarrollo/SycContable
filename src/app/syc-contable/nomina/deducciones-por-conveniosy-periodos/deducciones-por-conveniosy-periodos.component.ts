import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicidadConvenioService } from '../../administrativo/services/convenios/periodicidad-convenio.service';
import { TipoConvenioService } from '../../administrativo/services/convenios/tipo-convenio.service';
import { ServicioNominaService } from '../../administrativo/services/nomina/servicio-nomina.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScankbarComponent } from 'src/app/scankbar/not-found/scankbar.component';

@Component({
  selector: 'app-deducciones-por-conveniosy-periodos',
  templateUrl: './deducciones-por-conveniosy-periodos.component.html',
  styleUrls: ['./deducciones-por-conveniosy-periodos.component.css'],
})

export class DeduccionesPorConveniosyPeriodosComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)

  dataConvenant: any;
  covenants:any;
  form: FormGroup;
  periodo:any;
  dataSource : MatTableDataSource<any>;
  columna: string[] = ['concept_name','covenant_name','user_name','identification_number','value_charged',];
  total:number = 0;
  durationInSeconds = 5;

  constructor(
    private servicesTipoConvenio:TipoConvenioService,
    private servicesperiodo:PeriodicidadConvenioService,
    private serviceNomina:ServicioNominaService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
    ) {
      this.dataSource = new MatTableDataSource();
    }

  ngOnInit(): void {
    this.crearform();

    this.servicesTipoConvenio.getConvenant().subscribe(rest => {
      this.covenants = rest.data
    });
    this.servicesperiodo.getperiodo().subscribe(rest => {
      this.periodo = rest.data
    });
  }

  crearform(){
    this.form = this.fb.group({
      covenants_id: ['', Validators.required],
      created_at:['', Validators.required],
      period_id : ['', Validators.required],
    });
  }
  consultar(formData:any){
    let period = formData.period_id;
    let covenant = formData.covenants_id;
    let created_at = formData.created_at;
    this.serviceNomina.getConsultaDeduccion(period, covenant, created_at).subscribe(resp=>{
      this.dataSource.data = resp.data;
      this.getTotal();
    })
    this.total = 0;
  }

  getTotal(){
    for (let i = 0; i < this.dataSource.data.length; i++) {
      this.total = this.total + this.dataSource.data[i].value_charged;
    }
    console.log(this.total);
    if(this.total == 0){
      this._snackBar.openFromComponent(ScankbarComponent, {
        duration: this.durationInSeconds * 500,
      });
    }
  }
}


