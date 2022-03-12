import { AfterContentChecked, Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, {Pagination} from 'swiper';
import { CovenantsService } from '../../services/covenants.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CovenantModalsComponent } from '../covenant-modals/covenant-modals.component';
import { CovenantInterface } from '../../interfaces/covenants-interface';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SliderComponent implements OnInit, AfterContentChecked {

  @ViewChild('swiper') swiper: SwiperComponent;
  covenants:CovenantInterface[];
  bigSwiper:boolean;
  smallSwiper:boolean;
  size:number;
  isEmpty:boolean

  @HostListener('window:resize', ['$event'])
    onResize(event:any) {
      this.size = event.target.innerWidth;
      this.size > 1000 ? (this.bigSwiper = true, this.smallSwiper = false) : (this.bigSwiper = false, this.smallSwiper = true);
  }

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 20,
    pagination: true,
  }

  configSmall: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 100,
    pagination: true
  }

  covenantSlideId:number;
  isactive: boolean = false;

  constructor(
    private serviceCovenant: CovenantsService,
    public modal:NgbModal,
  ) {}

  ngOnInit(): void {
    this.getCovenants();
    this.size = window.innerWidth;
    this.size > 1000 ? (this.bigSwiper = true, this.smallSwiper = false) : (this.bigSwiper = false, this.smallSwiper = true);
  }
  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
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
      this.covenants.length == 0 ? this.isEmpty = true : this.isEmpty = false;
    })
  }
  getValuesSlider(id:number){
    this.covenantSlideId = id;
    this.isactive = true;
  }
  openAddModal(){
    const modalRef = this.modal.open(CovenantModalsComponent);
    modalRef.componentInstance.covenant_data_refresh.subscribe(() => {
    setTimeout(()=>{this.getCovenants()}, 5000);
  })
  }
  refreshCovenant(){
    this.isactive = false;
    setTimeout(()=>{this.getCovenants()}, 5000);
  }
}
