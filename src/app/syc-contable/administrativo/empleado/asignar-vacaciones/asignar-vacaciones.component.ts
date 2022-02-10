import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VacacionesserviceService } from '../../services/vacaciones/vacacionesservice.service';

@Component({
  selector: 'app-asignar-vacaciones',
  templateUrl: './asignar-vacaciones.component.html',
  styleUrls: ['./asignar-vacaciones.component.css']
})
export class AsignarVacacionesComponent implements OnInit {

  @Input()id:any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  dataSource: MatTableDataSource<any>;
  columna: string[] = ['user_id','start_date','end_date','total_days'];
  users:any;
  respuesta:any;
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
    this. getVacaciones();
    this.serviceVacaciones.getUsers().subscribe(resp=>{
      this.users = resp.data
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getVacaciones(){
    this.serviceVacaciones.getVacaciones().subscribe(
      resp => {
        this.dataSource = resp.data;
      });
  }

  crearform(){
    this.form = this.fb.group({
      user_id: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date:   ['', Validators.required],
    });
  }

  crearVacaciones(formdata:any){
    this.serviceVacaciones.postVacaciones(formdata).subscribe(res => {
      this.getVacaciones();
    });
  }

}
