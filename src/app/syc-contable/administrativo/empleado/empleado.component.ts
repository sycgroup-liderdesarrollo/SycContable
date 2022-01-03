import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../services/empleados/employee.service';
import { ModalempleadoComponent } from './modalempleado/modalempleado.component';


@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements AfterViewInit,OnInit {

  dataSource : MatTableDataSource<any>;
  displayedColumns : string[] = ['identification_number','name','last_name','position','email','options'];

  @ViewChild(MatTable) tabla1!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  dialogRef: any;

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
    this.serviceEmployer.getEmployed().subscribe(
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

  deleteEmployee(id :any){
     this.serviceEmployer.deleteEmployee(id).subscribe(res => {
       this.getEmployee();  
     });
  }
  
}

