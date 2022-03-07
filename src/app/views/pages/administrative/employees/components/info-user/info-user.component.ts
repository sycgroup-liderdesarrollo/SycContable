import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeInterface } from '../../../interfaces/employee-interface';
import { ServiceEmployeesService } from '../../services/service-employees.service';


@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {

  @Input() isEdit: boolean = false;
  form!: FormGroup;
  select:FormGroup;
  user:any;

  constructor(
    private router:Router,
    private serviceEmployees:ServiceEmployeesService,
    private route: ActivatedRoute,
    config: NgbNavConfig,
    private fb:FormBuilder,
  ) { 
    config.destroyOnHide = false;
    config.roles = false; 
    this.getUsuario();
  }

  ngOnInit(): void {
    this.crearform();
  }
  
  getUsuario(){
    this.route.paramMap.subscribe(params=>{
      const userId = params.has("id") ? params.get("id") : '';
      if(params.has("id")){
        this.serviceEmployees.getEmployee(userId).subscribe(res => {
          this.user = res.data
          console.log(this.user);
          
        })
      }
    })
  }

  crearform(DataUsers?:any){
   
    this.form = this.fb.group({
      name:                     [DataUsers?.name ?? '', Validators.required],
      last_name:                [DataUsers?.last_name ?? '', Validators.required],
      identificationType:       [DataUsers?.identificationType ?? '', Validators.required],
      identification_number:    [DataUsers?.identification_number ?? '', Validators.compose([
                                  Validators.required,
                                ])],
      occupationalRiskManager:  [DataUsers?.occupationalRiskManager ?? '',Validators.compose([
                                  Validators.required,
                                ])],
      kinship:                  [DataUsers?.kinship ?? '', Validators.required],
      address:                  [DataUsers?.address ?? '', Validators.required],
      neighborhood:             [DataUsers?.neighborhood ?? '',Validators.compose([
                                  Validators.required,
                                ])],
      strata:                   [DataUsers?.strata ?? '',Validators.compose([
                                  Validators.required,
                                ])],
      contractType:             [DataUsers?.contractType ?? '', Validators.required],
      salaryType:               [DataUsers?.salaryType ?? ''],
      healthProvider:           [DataUsers?.healthProvider ?? '', Validators.compose([
                                  Validators.required,
                                ])],
      pensionFund:              [DataUsers?.pensionFund ?? '', Validators.required],
      email:                    [DataUsers?.email ?? '',Validators.compose([
                                  Validators.required,Validators.email,
                                ])],
      phone:                    [DataUsers?.phone ?? '', Validators.required],
      base_salary:              [DataUsers?.base_salary ?? '', Validators.required],
      headquarter:              [DataUsers?.headquarter ?? '', Validators.required],
      position:                 [DataUsers?.position ?? '', Validators.required],
      gender:                   [DataUsers?.gender ?? '', Validators.required],
      emergencyContact:         [DataUsers?.emergencyContact ?? '', Validators.required],
    });
  }

}


