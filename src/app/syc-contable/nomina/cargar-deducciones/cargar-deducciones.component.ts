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

  DataNomina: MatTableDataSource<any>;
  dataSource : MatTableDataSource<any>;
  displayedColumns: string[] =['identification_number','name','last_name','position','email','options'];
  columna: string[] =['concept_id','concept_name','count','unit_value','total_value','options'];
  // userTest = [
  //   {
  //     LineaNegocio:'Syc Group',
  //     Cargo:'Aprendiz',
  //     NombreCompleto:'Victor Manuel Holguin Marin',
  //     CC:'1193099811',
  //   },
  // ]

  @ViewChild(MatTable) tabla1!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  selectRef: any;
  
  constructor(
    private ServiceNomina: ServicioNominaService,
    private serviceEmployer: EmployeeService,
    private serviceConcept:ConceptService,
    public dialog: MatDialog,
    
  ) {
     this.dataSource = new MatTableDataSource();
     this.DataNomina = new MatTableDataSource();
    //  this.DataNomina.data = this.userTest;
  } 

  ngOnInit(): void {
    // this.getEmployee();
  }

  getEmployee() {
    this.serviceEmployer.getEmployed().subscribe(
      resp =>{
      this.dataSource.data = resp.data
    });
  }

  // getConcept( filterType:any){
  //   this.serviceConcept.getConcepts( filterType).subscribe(
  //     resp =>{
  //       this.DataNomina.data = resp.data
  //     })
  //     console.log(this.DataNomina);
      
  // }

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

  openDialogAgregar(id?: any): void {
    const selectRef = this.dialog.open(ModalSeleccionarComponent);
    id? selectRef.componentInstance.id = id : null;
    selectRef.componentInstance;
    selectRef.afterClosed().subscribe(result => {
      this.getEmployee(); 
    });
  }

  openNomina(id:number){
    this.ServiceNomina.getNomina(id).subscribe(
      resp=>{
        console.log(resp);
        
        this.DataNomina.data = resp.data.concepts
    })
  }

  
 
}

