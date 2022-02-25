import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CovenantsService } from '../../services/covenants.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CovenantModalsComponent } from '../covenant-modals/covenant-modals.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

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

  openModal(){
    const modalRef = this.modal.open(CovenantModalsComponent);
    modalRef.componentInstance.covenantData = this.covenant;
  }

  openDeleteCovenantModal(){
    const modalRef = this.modal.open(ConfirmationModalComponent)
    modalRef.componentInstance.covenant_id = this.covenant.id;

  }
}
