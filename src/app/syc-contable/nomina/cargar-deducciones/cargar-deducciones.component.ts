import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../administrativo/services/empleados/employee.service';
import { ServicioNominaService } from '../../administrativo/services/nomina/servicio-nomina.service';
import { ModalSeleccionarComponent } from '../modal-seleccionar/modal-seleccionar.component';

@Component({
  selector: 'app-cargar-deducciones',
  templateUrl: './cargar-deducciones.component.html',
  styleUrls: ['./cargar-deducciones.component.css']
})
export class CargarDeduccionesComponent implements OnInit,AfterViewInit {

  
  dataSource : MatTableDataSource<any>;
  displayedColumns: string[] =['identification_number','name','last_name','position','email','options'];
  
  @ViewChild(MatTable) tabla1!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  selectRef: any;
  
  constructor(
    private ServiceNomina: ServicioNominaService,
    private serviceEmployer: EmployeeService,
    public dialog: MatDialog,
  ) {
     this.dataSource = new MatTableDataSource();
  } 

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.serviceEmployer.getEmployed().subscribe(
      resp =>{
      this.dataSource.data = resp.data
      console.log(this.dataSource.data); 
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onKeyUp(event: Event) { 
    const filterValue = (event.target as HTMLInputElement).value;
    this.serviceEmployer.getEmployed(filterValue).subscribe(
      resp =>{
      this.dataSource.data = resp.data
    });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSelect(id?: any): void {
    const selectRef = this.dialog.open(ModalSeleccionarComponent);
    id? selectRef.componentInstance.id = id : null;
    selectRef.componentInstance;
    selectRef.afterClosed().subscribe(result => {
      this.getEmployee(); 
    });
  
  }
 
}

