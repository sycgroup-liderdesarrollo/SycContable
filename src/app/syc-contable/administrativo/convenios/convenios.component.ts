import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { ConfirmacionComponent } from 'src/app/share/confirmacion/confirmacion.component';
import { ConvenantService } from '../services/convenios/convenant.service';
import { ModalconveniosComponent } from './modalconvenios/modalconvenios.component';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.css']
})
export class ConveniosComponent implements OnInit,AfterViewInit {

  dataSource : MatTableDataSource<any>;
  displayedColumns : string[] = ['name','convenant','periodicity','active','value','options'];
  isLoading: boolean = false;
  @ViewChild(MatTable) tabla1!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  dialogRef:any

  constructor(
    public dialog: MatDialog,
    private serviceConvenant: ConvenantService,
    ) { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getConvenant();
  }

  getConvenant() {
    this.isLoading = true;
      this.serviceConvenant.getcovenant().pipe(
        finalize( () => {
          this.isLoading = false;
        } )
      ).subscribe(
        resp => {
          this.dataSource.data = resp.data;
        }
      );
    }
  ngAfterViewInit(): void {
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
    const dialogRef = this.dialog.open(ModalconveniosComponent);
    id? dialogRef.componentInstance.id = id : null;
    dialogRef.componentInstance.isEdit = isEdit ;
    dialogRef.afterClosed().subscribe(result => {
      this.getConvenant(); 
    });
  };
  openConfirmation(id?: any): void{
    const ConfirmationRef = this.dialog.open(ConfirmacionComponent);

    ConfirmationRef.afterClosed().subscribe(resp => {
      resp ? this.deleteConvenant(id): '';
    });
  }

  deleteConvenant(id :any){
    this.serviceConvenant.deleteConvenant(id).subscribe(res => {
      this.getConvenant();  
    });
 }
 



}

  

