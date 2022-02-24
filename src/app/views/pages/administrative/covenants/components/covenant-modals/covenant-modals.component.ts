import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { CovenantsService } from '../../services/covenants.service';

@Component({
  selector: 'app-covenant-modals',
  templateUrl: './covenant-modals.component.html',
  styleUrls: ['./covenant-modals.component.scss']
})
export class CovenantModalsComponent implements OnInit {

  constructor(
    private serviceCovenant: CovenantsService,
    private fb:FormBuilder,
    public modal:NgbModal,
  ) { }

  @Input() covenantData:any;

  providers:any;
  form:FormGroup
  actualImage:any;
  covenantTypes:any;
  periodicityTypes:any;
  modalTitle:string="";
  isEdit:boolean = false;
  messageAlert:string = "";
  alertSuccess:boolean = false;
  isLoading:boolean = true;

  ngOnInit(): void {
    this.getCovenantTypes();
    this.getPeriodicityTypes();
    this.getProviders();

    if (this.covenantData) {
      this.makeForm(this.covenantData),
      this.isEdit       = true,
      this.modalTitle   = "Editar convenio",
      this.actualImage  = this.covenantData.image,
      this.messageAlert = "actualizado"
    }
    else{
      this.makeForm();
      this.messageAlert = "creado"
      this.modalTitle = "Agregar un convenio"
    }
  }

  makeForm(covenantData?:any){
    this.form = this.fb.group({
      name:                 [covenantData?.name ?? '',[Validators.required, Validators.minLength(3)]],
      image:                [''],
      value:                [covenantData?.value?? ''],
      active:               [covenantData?.active ?? 1],
      provider_id:          [covenantData?.provider.id ?? '', [Validators.required]],
      concept_name:         [covenantData?.concept.name ?? '',[Validators.required]],
      covenant_type_id:     [covenantData?.covenantType.id ?? '',[Validators.required]],
      periodicity_type_id:  [covenantData?.periodicityType.id ?? '',[Validators.required]]
    });
    setTimeout(()=>{this.isLoading = false}, 1000)
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
  postCovenant(formData:any){

    formData.image = this.actualImage

    this.serviceCovenant.postCovenant(formData).subscribe(resp =>{
      this.alertSuccess = true;
      this.form.reset();
      this.makeForm();
      setTimeout(()=>{this.alertSuccess = false; window.location.reload();}, 3000);
    })
  }
  putCovenant(formData:any){

    formData.image = this.actualImage

    this.serviceCovenant.putCovenant(this.covenantData.id, formData).subscribe(resp =>{
      this.alertSuccess = true;
      setTimeout(()=>{this.alertSuccess = false; window.location.reload();}, 3000);
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
