import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './syc-contable/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', redirectTo:'login', pathMatch:'full'
  },

  {
    path: 'login', component: LoginComponent 
  },

  {
    path: 'syc-contable', 
    loadChildren: () => import ('./syc-contable/syc-contable.module').then(module => module.SycContableModule),
    canActivate : [AuthenticationGuard]
    
  },

  {
    path: 'dashboard', component: DashboardComponent
  },
 
 
  {
    path:'**', redirectTo:'login',pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
