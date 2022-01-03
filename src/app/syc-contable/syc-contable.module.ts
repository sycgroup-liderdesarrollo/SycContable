import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SycContableRoutingModule } from './syc-contable-routing.module';
import { LayoutComponent } from './layout/layout.component';

import { RouterModule } from '@angular/router';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { navbarComponent } from './componentes/navbar/navbar.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { ShareModule } from '../share/share.module';




@NgModule({
  declarations: [
    LayoutComponent,
    navbarComponent,
    SidebarComponent,
   

  ],

  imports: [
    CommonModule,
    SycContableRoutingModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    ShareModule
  ]
  
})
export class SycContableModule { }
