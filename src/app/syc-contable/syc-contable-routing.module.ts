import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path:'administrativo',
        loadChildren: () => import('./administrativo/administrativo.module').then(module => module.AdministrativoModule)
      },
      {
        path:'seguridad',
        loadChildren: () => import('./seguridad/seguridad.module').then(module => module.SeguridadModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SycContableRoutingModule { }
