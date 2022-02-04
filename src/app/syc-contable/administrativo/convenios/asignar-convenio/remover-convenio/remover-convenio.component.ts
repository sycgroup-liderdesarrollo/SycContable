import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { ConfirmacionComponent } from 'src/app/share/confirmacion/confirmacion.component';
import { ConvenantService } from '../../../services/convenios/convenant.service';


@Component({
  selector: 'app-remover-convenio',
  templateUrl: './remover-convenio.component.html',
  styleUrls: ['./remover-convenio.component.css']
})
export class RemoverConvenioComponent implements OnInit {
  dataSource : MatTableDataSource<any>;
  displayedColumns: string[] = ['user', 'covenant', 'dues', 'total_dues', 'value','options'];
 
  isLoading: boolean = false;

  @ViewChild(MatTable) tabla1!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  dialogRef:any;

  @Input() id:any;


  constructor(
    public dialog: MatDialog,
    private serviceConvenant: ConvenantService
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
  

  openConfirmation(id?: any): void{
    const ConfirmationRef = this.dialog.open(ConfirmacionComponent);

    ConfirmationRef.afterClosed().subscribe(resp => {
      resp ? this.deleteConvenio(id): '';
    });
  }
  deleteConvenio(id :any){
    this.serviceConvenant.deleteConvenant(id).subscribe(res => {
      this.getConvenant();  
    });
 }


}
