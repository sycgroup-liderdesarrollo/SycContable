import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  @ViewChild(MatSort)


  created_at:string;
  name:string;
  sort!: MatSort;
  DataNomina: MatTableDataSource<any>;
  dataSource : MatTableDataSource<any>;
  payroll:any;
  displayedColumns: string[] =['identification_number','name','last_name','position','email','options'];
  columna: string[] = ['concept_id', 'concept_name', 'concept_type','count','unit_value','total_value','options'];
  //  .........................................................................
  dataPayroll = {
    created_at: 'short',
    name:'',
    userId: 0,
    validador: false,
  }
  isLoading:boolean = false;

  constructor(
    private ServiceNomina:    ServicioNominaService,
    private serviceEmployer:  EmployeeService,
    public  dialog:           MatDialog,
    private serviceconcept:   ConceptService,

  ) {
     this.dataSource = new MatTableDataSource();
     this.DataNomina = new MatTableDataSource();
  }

  ngOnInit(): void {
  }

  getEmployee(id?:any) {
    this.serviceEmployer.getEmployed(id).subscribe(
      resp =>{
      this.dataSource.data = resp.data
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onKeyUp(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    if (filterValue != ''){
      this.isLoading = true;
      this.serviceEmployer.getEmployed(filterValue).subscribe(
        resp =>{
        this.dataSource.data = resp.data;
        this.isLoading = false;
      });
    }
    this.dataSource.data = [];

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogAgregar(payrollId:number,id?: any): void {
    const selectRef = this.dialog.open(ModalSeleccionarComponent);
    payrollId? selectRef.componentInstance.id = payrollId : null;
    selectRef.componentInstance;
    selectRef.afterClosed().subscribe(result => {
      this.getEmployee(id);
      this.openNomina(id);

    });
  }

   openNomina(userId:number){
    this.dataSource.data = [];
    this.DataNomina.data = [];
    this.ServiceNomina.getNomina(userId).subscribe(
      resp => {
        this.payroll = resp.data;
        this.DataNomina.data = resp.data.concepts;

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
