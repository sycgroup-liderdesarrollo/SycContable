import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { ConfirmacionComponent } from 'src/app/share/confirmacion/confirmacion.component';
import { ServicioProveedoresService } from '../services/proveedores/servicio-proveedores.service';
import { ModalproveedoresComponent } from './modalproveedores/modalproveedores.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  dataSource : MatTableDataSource<any>;
  displayedColumns : string[] = ['identification_type','identification_number','name','address','phone','options'];
  isLoading:boolean=false;

  @ViewChild(MatTable) tabla1!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  dialogRef:any;

  constructor(
    public dialog: MatDialog,
    private serviceproviders: ServicioProveedoresService
    ) { 
    this.dataSource = new MatTableDataSource();
    
  }

  ngOnInit(): void {
    this.getProviders();
  }

  getProviders() {
    this.isLoading = true;
    this.serviceproviders.getProviders().pipe(
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
    const dialogRef = this.dialog.open(ModalproveedoresComponent);
    id? dialogRef.componentInstance.id = id : null;
    dialogRef.componentInstance.isEdit = isEdit ;
    dialogRef.afterClosed().subscribe(result => {
      this.getProviders(); 
    });
  };

  openConfirmation(id?: any): void{
    const ConfirmationRef = this.dialog.open(ConfirmacionComponent);

    ConfirmationRef.afterClosed().subscribe(resp => {
      resp ? this.deleteProvider(id): '';
    });
  }
  deleteProvider(id :any){
    this.serviceproviders.deleteProvider(id).subscribe(res => {
      this.getProviders();  

    });

  }
  
}

  

