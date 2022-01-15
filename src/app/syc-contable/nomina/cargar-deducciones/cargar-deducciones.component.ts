import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../administrativo/services/empleados/employee.service';
import { ConceptService } from '../../administrativo/services/nomina/concept.service';
import { ServicioNominaService } from '../../administrativo/services/nomina/servicio-nomina.service';
import { ModalSeleccionarComponent } from '../modal-seleccionar/modal-seleccionar.component';

@Component({
  selector: 'app-cargar-deducciones',
  templateUrl: './cargar-deducciones.component.html',
  styleUrls: ['./cargar-deducciones.component.css']
})
export class CargarDeduccionesComponent implements OnInit,AfterViewInit {

  id:any;
  name:any;
  created_at:any;
  @ViewChild(MatTable) tabla1!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  selectRef: any;
  DataNomina: MatTableDataSource<any>;
  dataSource : MatTableDataSource<any>;
  displayedColumns: string[] =['identification_number','name','last_name','position','email','options'];
  columna: string[] =['concept_id','concept_name','count','unit_value','total_value','options'];
  //  .........................................................................      
  dataPayroll = {
    created_at: '',
    name:'',
    id: 0,
    validador: false,
  }
       
  constructor(
    private ServiceNomina: ServicioNominaService,
    private serviceEmployer: EmployeeService,
    public dialog: MatDialog,
    private serviceconcept: ConceptService
  ) {
     this.dataSource = new MatTableDataSource();
     this.DataNomina = new MatTableDataSource();
  } 

  ngOnInit(): void {
  }

  getEmployee() {
    this.serviceEmployer.getEmployed().subscribe(
      resp =>{
      this.dataSource.data = resp.data
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onKeyUp(event: Event) { 
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue != ''){
      this.serviceEmployer.getEmployed(filterValue).subscribe(
        resp =>{
        this.dataSource.data = resp.data
      });
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogAgregar(id?: any): void {
    const selectRef = this.dialog.open(ModalSeleccionarComponent);
    id? selectRef.componentInstance.id = id : null;
    selectRef.componentInstance;
    selectRef.afterClosed().subscribe(result => {
      this.getEmployee(); 
      this.openNomina(id);
      
    });
  }

  openNomina(id:number){
    this.ServiceNomina.getNomina(id).subscribe(
      resp => {
        this.DataNomina.data = resp.data.concepts;
        this.dataPayroll.created_at = resp.data.created_at;
        this.dataPayroll.name = resp.data.user.name;
        this.dataPayroll.id = id;
        this.dataPayroll.validador = true;
    })
  }

  deleteNomina(id :any){
    this.serviceconcept.removeConcept(id).subscribe(res => {
      this.openNomina(id);  
    });
 }
}