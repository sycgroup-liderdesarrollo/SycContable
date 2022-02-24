import { AfterContentChecked, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, {Pagination} from 'swiper';
import { CovenantsService } from '../../services/covenants.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CovenantModalsComponent } from '../covenant-modals/covenant-modals.component';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SliderComponent implements OnInit, AfterContentChecked {

  @ViewChild('swiper') swiper: SwiperComponent;
  covenants:any

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

  covenantSlideId:number;
  isactive: boolean = false;

  constructor(
    private serviceCovenant: CovenantsService,
    public modal:NgbModal,
  ) {}

  ngOnInit(): void {
    this.getCovenants();

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
    })
  }
  getValuesSlider(id:number){
    this.covenantSlideId = id;
    this.isactive = true;
  }
  openAddModal(){
    this.modal.open(CovenantModalsComponent);
  }
}
