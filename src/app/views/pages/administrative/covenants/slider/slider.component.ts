import { AfterContentChecked, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, {Pagination} from 'swiper';
import { CovenantsService } from '../services/covenants.service';

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

  covenant:any;
  constructor(
    private serviceCovenant: CovenantsService
  ) { }

  ngOnInit(): void {
    this.getCovenants();
  }
  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  getCovenants(){
    this.serviceCovenant.getCovenants().subscribe(resp =>{
      this.covenants = resp.data;
    })
  }
  boton(data:any){
    this.covenant = data
  }
}
