import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConfirmacionComponent } from 'src/app/share/confirmacion/confirmacion.component';
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

  @Input() id?: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatTable) tabla1!: MatTable<any>;
  @ViewChild(MatSort)
  created_at:any;
  name:any;
  sort!: MatSort;
  selectRef: any;
  DataNomina: MatTableDataSource<any>;
  dataSource : MatTableDataSource<any>;
  displayedColumns: string[] =['identification_number','name','last_name','position','email','options'];
  columna: string[] = ['concept_id', 'concept_name', 'concept_type','count','unit_value','total_value','options'];
  //  .........................................................................
  dataPayroll = {
    created_at: 'short',
    name:'',
    id: 0,
    validador: false,
  }

  constructor(
    private ServiceNomina: ServicioNominaService,
    private serviceEmployer: EmployeeService,
    public dialog: MatDialog,
    private serviceconcept: ConceptService,
    
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

  openNomina(PayrollId:number){
    this.ServiceNomina.getNomina(PayrollId).subscribe(
      resp => {
        this.DataNomina.data = resp.data.concepts;
        this.dataPayroll.created_at = resp.data.created_at;
        this.dataPayroll.name = resp.data.user.name;
        this.dataPayroll.id = PayrollId;
        this.dataPayroll.validador = true;
    })
  }

  openConfirmation(payrollId:any,conceptPivotId:any): void{
    const ConfirmationRef = this.dialog.open(ConfirmacionComponent);
    ConfirmationRef.afterClosed().subscribe(resp => {
      resp ? this.deleteConceptPayroll(payrollId,conceptPivotId): '';
      
    });
  }

  deleteConceptPayroll(PayrollId:any, conceptPivotId:any){
    this.serviceconcept.removeConcept(PayrollId,conceptPivotId).subscribe(res => {
     this.openNomina(PayrollId);
     
    });
    
 }
}
