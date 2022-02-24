import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CovenantsService } from '../../services/covenants.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CovenantModalsComponent } from '../covenant-modals/covenant-modals.component';

@Component({
  selector: 'app-admin-covenant',
  templateUrl: './admin-covenant.component.html',
  styleUrls: ['./admin-covenant.component.scss']
})

export class AdminCovenantComponent implements OnChanges, OnInit {

  @Input() covenantId:number;

  covenant:any
  alertSuccess:boolean = false;

  constructor(
    private serviceCovenant: CovenantsService,
    public modal:NgbModal,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.covenantId) {
      this.getCovenant(this.covenantId);
    }
  }
  ngOnInit(): void {
    this.getCovenant(this.covenantId);
  }
  getCovenant(id:number){
    this.serviceCovenant.getCovenant(id).pipe(
      map( (element:any) =>{
        element.data.image = `${environment.base_API_url}${element.data.image}`;
        return element.data;
      }),
    ).subscribe(resp =>{
      this.covenant = resp;
    })
  }
  deleteCovenant(){
    this.serviceCovenant.deleteCovenant(this.covenant.id).subscribe(resp =>{
      this.alertSuccess = true;
      setTimeout(()=>{this.alertSuccess = false; this.modal.dismissAll()}, 1500);
      window.location.reload();
    })
  }
  openModal(){
    const modalRef = this.modal.open(CovenantModalsComponent);
    modalRef.componentInstance.covenantData = this.covenant;
  }
}
