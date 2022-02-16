import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

  ) {
    this.loginForm = this.formBuilder.group({
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

}
