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

  crearform(dataProvider?:any){
   
    this.form = this.fb.group({
      name:                     [dataProvider?.name ?? '', Validators.required],
      last_name:                [dataProvider?.last_name ?? '', Validators.required],
      identificationType:       [dataProvider?.identificationType ?? '', Validators.required],
      identification_number:    [dataProvider?.identification_number ?? '', Validators.compose([
                                  Validators.required,
                                ])],
      occupationalRiskManager:  [dataProvider?.occupationalRiskManager ?? '',Validators.compose([
                                  Validators.required,
                                ])],
      kinship:                  [dataProvider?.kinship ?? '', Validators.required],
      address:                  [dataProvider?.address ?? '', Validators.required],
      neighborhood:             [dataProvider?.neighborhood ?? '',Validators.compose([
                                  Validators.required,
                                ])],
      strata:                   [dataProvider?.strata ?? '',Validators.compose([
                                  Validators.required,
                                ])],
      contractType:             [dataProvider?.contractType ?? '', Validators.required],
      salaryType:               [dataProvider?.salaryType ?? ''],
      healthProvider:           [dataProvider?.healthProvider ?? '', Validators.compose([
                                  Validators.required,
                                ])],
      pensionFund:              [dataProvider?.pensionFund ?? '', Validators.required],
      email:                    [dataProvider?.email ?? '',Validators.compose([
                                  Validators.required,Validators.email,
                                ])],
      phone:                    [dataProvider?.phone ?? '', Validators.required],
      base_salary:              [dataProvider?.base_salary ?? '', Validators.required],
      headquarter:              [dataProvider?.headquarter ?? '', Validators.required],
      position:                 [dataProvider?.position ?? '', Validators.required],
      gender:                   [dataProvider?.gender ?? '', Validators.required],
      emergencyContact:         [dataProvider?.emergencyContact ?? '', Validators.required],
    });
  }

}


