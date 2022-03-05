import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CovenantsService } from '../../services/covenants.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CovenantModalsComponent } from '../covenant-modals/covenant-modals.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { CovenantInterface } from '../../interfaces/covenants-interface';

@Component({
  selector: 'app-admin-covenant',
  templateUrl: './admin-covenant.component.html',
  styleUrls: ['./admin-covenant.component.scss']
})

export class AdminCovenantComponent implements OnChanges, OnInit {

  @Input() covenantId:number;
  @Output() covenant_refresh = new EventEmitter();

  covenant:CovenantInterface;
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
    modalRef.componentInstance.covenant_data_refresh.subscribe(($e:any) => {
      $e == true ? this.covenant_refresh.emit() : this.getCovenant(this.covenantId);
    })
  }
  openDeleteCovenantModal(){
    const modalRef = this.modal.open(ConfirmationModalComponent)
    modalRef.componentInstance.covenant_id = this.covenant.id;
    modalRef.componentInstance.change_covenant.subscribe(($e:any) => {
      this.covenant_refresh.emit();
    })
  }
  refreshCovenant(e:any){
    this.getCovenant(e);
  }
}
