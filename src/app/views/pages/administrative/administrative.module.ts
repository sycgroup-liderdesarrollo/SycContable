import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrativeRoutingModule } from './administrative-routing.module';
import { AdminCovenantComponent } from './covenants/admin-covenant/admin-covenant.component';
import { AssingCovenantComponent } from './covenants/assing-covenant/assing-covenant.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SliderComponent } from './covenants/slider/slider.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    AdminCovenantComponent,
    AssingCovenantComponent,
    SliderComponent,
  ],
  imports: [
    CommonModule,
    AdministrativeRoutingModule,
    NgxPaginationModule,
    SwiperModule
  ]
})
export class AdministrativeModule { }
