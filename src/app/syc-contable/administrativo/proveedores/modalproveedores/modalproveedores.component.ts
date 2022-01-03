import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modalproveedores',
  templateUrl: './modalproveedores.component.html',
  styleUrls: ['./modalproveedores.component.css']
})
export class ModalproveedoresComponent implements OnInit {
  
  @Input() id?: any;
@Input() isEdit: boolean = true;


  selectedValue!: string;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder 
  ) {
    
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      identification_type: ['', Validators.required],
      identification_number: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

}
