import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ToastServiceService } from 'src/app/core/services/toast-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm : FormGroup;
  isLoading:boolean;

  @ViewChild('ngAlert') ngAlert : NgbAlert;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private localService : LocalStorageService,
    private toastService : ToastServiceService
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
      } )
    ).subscribe({
      next: (resp) => {
        this.localService.setToken(resp);
        if(resp.access_token){ 
          this.router.navigate(["/dashboard"])
        }
      },
      error : (error) => {
        this.isLoading = false;
        this.toastService.show(error.error.message, {
          classname: 'bg-danger text-light',
          delay: 3000 ,
          autohide: true
        });
      }
    })
  }

}
