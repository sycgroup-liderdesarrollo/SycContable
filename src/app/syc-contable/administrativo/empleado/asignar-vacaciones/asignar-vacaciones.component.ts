import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VacacionesserviceService } from '../../services/vacaciones/vacacionesservice.service';


@Component({
  selector: 'app-asignar-vacaciones',
  templateUrl: './asignar-vacaciones.component.html',
  styleUrls: ['./asignar-vacaciones.component.css']
})
export class AsignarVacacionesComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)

  dataSource : MatTableDataSource<any>;

  columna: string[] = ['user_id','start_date','end_date','total_days'];

  vacacionesUser:any;
  form!:FormGroup;
  // fechaInicio:any;
  // fechaFinal:any;


  constructor(
    private serviceVacaciones: VacacionesserviceService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    ) {
      this.dataSource = new MatTableDataSource();
    }

  ngOnInit(): void {
    this.crearform(); 
    this.getVacaciones();
  }

  getVacaciones(){
    this.serviceVacaciones.getVacaciones().subscribe(
      resp => {
        this.dataSource = resp.data;
      console.log(this.dataSource);
      console.log(resp);
      
      });

  }

  crearform(){
    this.form = this.fb.group({
      user_id: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date:   ['', Validators.required],
    });
  }

}
