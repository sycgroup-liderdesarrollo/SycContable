import { AfterContentChecked, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, {Pagination} from 'swiper';
import { CovenantsService } from '../../services/covenants.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, subscribeOn, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SliderComponent implements OnInit, AfterContentChecked {

  @ViewChild('swiper') swiper: SwiperComponent;
  @Input() covenants:any

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 20,
    pagination: true
  }

  configSmall: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 100,
    pagination: true
  }

  covenant:any;
  form:FormGroup
  covenantTypes:any;
  periodicityTypes:any;
  providers:any;
  alertSuccess:boolean = false;
  isactive: boolean = false;
  actualImage:any;
  constructor(
    private serviceCovenant: CovenantsService,
    public modal:NgbModal,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCovenants();
    this.makeForm();
    this.getCovenantTypes();
    this.getPeriodicityTypes();
    this.getProviders();
  }
  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }
  makeForm(){
    this.form = this.fb.group({
      name:                 ['',[Validators.required, Validators.minLength(3)]],
      value:                [''],
      active:               [1],
      covenant_type_id:     ['',[Validators.required]],
      periodicity_type_id:  ['',[Validators.required]],
      provider_id:          ['', [Validators.required]],
      concept_name:         ['',[Validators.required]],
      image:                ['']
    });
  }
  getCovenants(){
    this.serviceCovenant.getCovenants().pipe(
      map( (element:any) =>{
        element.data.forEach((covenant:any) => {
          covenant.image = `${environment.base_API_url}${covenant.image}`;
        });
        return element.data;
      }),
    ).subscribe(resp =>{
       this.covenants = resp;
    })
  }
  getValuesSlider(data:any){
    this.covenant = data;
    this.isactive = true;
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
      this.getCovenants();
      this.alertSuccess = true;
      this.form.reset();
      this.makeForm();
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
