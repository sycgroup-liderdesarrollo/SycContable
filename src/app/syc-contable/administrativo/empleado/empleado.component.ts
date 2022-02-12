import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { ConfirmacionComponent } from 'src/app/share/confirmacion/confirmacion.component';
import { EmployeeService } from '../services/empleados/employee.service';
import { ModalempleadoComponent } from './modalempleado/modalempleado.component';


@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements AfterViewInit,OnInit {

  dataSource : MatTableDataSource<any>;
  displayedColumns : string[] = ['identification_number','name','last_name','phone','position','base_salary','email','active','options'];
  isLoading: boolean = false;

  @ViewChild(MatTable) tabla1!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private serviceEmployer: EmployeeService
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

  openDialog(id?: any,isEdit: boolean = false): void {
    const dialogRef = this.dialog.open(ModalempleadoComponent);
    id? dialogRef.componentInstance.id = id : null;
    dialogRef.componentInstance.isEdit = isEdit;
    dialogRef.afterClosed().subscribe(result => {
      this.getEmployee();
    });
  }

  openConfirmation(id?: any): void{
    const ConfirmationRef = this.dialog.open(ConfirmacionComponent);

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

