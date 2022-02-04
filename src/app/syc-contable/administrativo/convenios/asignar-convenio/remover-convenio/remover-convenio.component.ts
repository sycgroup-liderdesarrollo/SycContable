import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { ConfirmacionComponent } from 'src/app/share/confirmacion/confirmacion.component';
import { ConvenantService } from '../../../services/convenios/convenant.service';
import { EmployeeService } from '../../../services/empleados/employee.service';



@Component({
  selector: 'app-remover-convenio',
  templateUrl: './remover-convenio.component.html',
  styleUrls: ['./remover-convenio.component.css']
})
export class RemoverConvenioComponent implements OnInit {
  dataSource : MatTableDataSource<any>;
  displayedColumns: string[] = ['user', 'covenant', 'dues', 'total_dues', 'value','options'];

  isLoading: boolean = false;
  dialogRef:any;
  userName:any;
  @Input() row:any;


  constructor(
    public dialog: MatDialog,
    private serviceConvenant: ConvenantService,
    private serviceUser: EmployeeService,
  ) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.getEmploye();
    this.userName = this.row.name

  }
  openConfirmation(pivotId?: any): void{
    console.log(pivotId);

    const ConfirmationRef = this.dialog.open(ConfirmacionComponent);

    ConfirmationRef.afterClosed().subscribe(resp => {
      resp ? this.deleteConvenio(this.row.id, pivotId): '';
    });
  }

  deleteConvenio(UserId:any, pivotId:number){
    this.serviceConvenant.deleteUserCovenant(UserId, pivotId).subscribe(resp => {
      console.log(resp.data);
      this.getEmploye();

    });
 }
  getEmploye(){
    this.isLoading = true;
    this.serviceUser.getEmployee(this.row.id).pipe(
      finalize( () => {
        this.isLoading = false;
      } )
    ).subscribe(resp=>{
      this.dataSource.data = resp.data.covenants;
      console.log(this.dataSource.data);

    })
  }

}
