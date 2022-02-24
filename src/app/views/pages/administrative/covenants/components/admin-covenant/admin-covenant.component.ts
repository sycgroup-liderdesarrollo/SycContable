import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { CovenantsService } from '../../services/covenants.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-covenant',
  templateUrl: './admin-covenant.component.html',
  styleUrls: ['./admin-covenant.component.scss']
})

export class AdminCovenantComponent implements OnChanges, OnInit {

  @Input() covenantData:any;
  form:FormGroup
  covenant:any
  providers:any
  covenantTypes:any
  periodicityTypes:any
  alertSuccess:boolean = false;
  actualImage:any;

  constructor(
    private serviceCovenant: CovenantsService,
    private fb:FormBuilder,
    public modal:NgbModal,
  ) {
    this.getProviders();
    this.getCovenantTypes();
    this.getPeriodicityTypes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.covenantData) {
      this.getCovenant(this.covenantData.id);
    }
  }

  ngOnInit(): void {
    this.getCovenant(this.covenantData.id);
  }

  makeForm(covenantData:any){
    this.form = this.fb.group({
      name:                 [covenantData.name ?? '',Validators.minLength(3)],
      value:                [covenantData.value?? ''],
      active:               [covenantData.active ?? ''],
      covenant_type_id:     [covenantData.covenantType.id ?? '', Validators.required],
      periodicity_type_id:  [covenantData.periodicityType.id ?? '', Validators.required],
      provider_id:          [covenantData.provider.id ?? '', Validators.required],
      concept_name:         [covenantData.concept.name ?? '', Validators.required],
      image:                ['']
    });
  }
  putCovenant(formData:any){
    formData.image = this.actualImage
    console.log(formData);

    this.serviceCovenant.putCovenant(this.covenant.id, formData).subscribe(resp =>{
      this.alertSuccess = true;
      this.getCovenant(this.covenant.id);
      setTimeout(()=>{this.alertSuccess = false; window.location.reload();}, 3000);
    })
  }
  getCovenantTypes(){
    this.serviceCovenant.getCovenantTypes().subscribe(resp =>{
      this.covenantTypes = resp.data;
    })
  }
  getPeriodicityTypes(){
    this.serviceCovenant.getPeriodicityTypes().subscribe(resp =>{
      this.periodicityTypes = resp.data;
    })
  }
  getProviders(){
    this.serviceCovenant.getProviders().subscribe(resp =>{
      this.providers = resp.data;
    })
  }
  getCovenant(id:number){
    this.serviceCovenant.getCovenant(id).pipe(
      map( (element:any) =>{
        element.data.image = `${environment.base_API_url}${element.data.image}`;
        return element.data;
      }),
    ).subscribe(resp =>{
      this.covenant = resp;
      this.makeForm(this.covenant);
    })
  }
  deleteCovenant(){
    this.serviceCovenant.deleteCovenant(this.covenant.id).subscribe(resp =>{
      this.alertSuccess = true;
      setTimeout(()=>{this.alertSuccess = false; this.modal.dismissAll()}, 1500);
      window.location.reload();
    })
  }
  cacthImage(event:any){
    const covenantImage = event.target.files[0]
    this.convertToBase64(covenantImage)
  }
  convertToBase64(file:File){
    const observable = new Observable((suscriber:Subscriber<any>)=>{
      this.readFile(file, suscriber);
    });
    observable.subscribe((d)=>{
      this.actualImage = d;
      this.covenant.image = d;
    })
  }
  readFile(file:File, suscriber:Subscriber<any>){
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file)

    fileReader.onload = ()=>{
      suscriber.next(fileReader.result)
      suscriber.complete();
    }
    fileReader.onerror = (error)=>{
      suscriber.error(error)
      suscriber.complete();
    }
  }
}
