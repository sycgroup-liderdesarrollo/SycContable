import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm : FormGroup;
  isLoading:boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private localService : LocalStorageService
  ) { 
    this.loginForm = this.formBuilder.group({
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  login(){
    this.isLoading = true;
    this.authService.login(this.loginForm.value).pipe(
      finalize( () => {
        this.loginForm.reset();
        this.isLoading = false;
      })
    ).subscribe(
      resp => {
        this.localService.setToken(resp);
        if(resp.access_token){ 
          this.router.navigate(["/syc-contable"])
        }
      },
      error => {
        alert(error.error?.message ?? "Fallo de Autenticación");
      }
    )
  }

}
