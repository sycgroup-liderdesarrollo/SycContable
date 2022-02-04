import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { ConvenantService } from '../../services/convenios/convenant.service';
import { EmployeeService } from '../../services/empleados/employee.service';
import { ModalAsignarConvenioComponent } from './modal-asignar-convenio/modal-asignar-convenio.component';
import { RemoverConvenioComponent } from './remover-convenio/remover-convenio.component';

@Component({
  selector: 'app-asignar-convenio',
  templateUrl: './asignar-convenio.component.html',
  styleUrls: ['./asignar-convenio.component.css']
})
export class AsignarConvenioComponent implements OnInit {

  dataSource : MatTableDataSource<any>;
  paginadores : string[] = ['identification_number','name','last_name','position','email','options'];

  @Input() row: any;
  @ViewChild(MatTable) tabla1!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  dialogRef: any;
  isLoading:boolean=false;

  constructor(
    public dialog: MatDialog,
    private serviceEmployer: EmployeeService,
    private serviceconvenant:ConvenantService
    ) {
      this.dataSource = new MatTableDataSource();
    }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(){
    this.isLoading = true;
    this.serviceEmployer.getEmployed().pipe(
      finalize( () => {
        this.isLoading = false;
      } )
    ).subscribe(
      resp => {
        this.dataSource.data = resp.data;

      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(id:any): void {
    const dialogRef = this.dialog.open(ModalAsignarConvenioComponent);
    id? dialogRef.componentInstance.row = id: null;
    dialogRef.afterClosed().subscribe((result: any) => {
     this.getEmployee()
    });
  }
  openConfirmation(id?: any): void{
    const ConfirmationRef = this.dialog.open(RemoverConvenioComponent);

    ConfirmationRef.afterClosed().subscribe(resp => {
      resp ? this.deleteEmployee(id): '';
    });
  }
  deleteEmployee(id :any){
    this.serviceEmployer.deleteEmployee(id).subscribe(res => {
      this.getEmployee();  
    });
 }



}
