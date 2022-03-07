import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeInterface } from '../../interfaces/employee-interface';
import { ServiceEmployeesService } from '../services/service-employees.service';
import { IdentificationTypeService } from '../services/servicesModal/identification-type.service';
import { PositionService } from '../services/servicesModal/position.service';

@Component({
  selector: 'app-modal-add-employees',
  templateUrl: './modal-add-employees.component.html',
  styleUrls: ['./modal-add-employees.component.scss']
})
export class ModalAddEmployeesComponent implements OnInit {

  // formulario....
  tipoIdentificacion:any
  cargos: any;

  isLoading:boolean=false;
  // ...stepper...
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  // isLoading:boolean = true;
  @Input() id:any;
  @Input() isEdit: boolean = false;
  users:EmployeeInterface[];
  // form!: FormGroup;
  user:any;

  constructor( private router:Router,
    private serviceEmployees:ServiceEmployeesService,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private modal: NgbModal,
    public activeModal: NgbActiveModal,
    private IdentificationTypeService:IdentificationTypeService,
    private PositionService:PositionService,
    ) { }

  ngOnInit(): void {
    this.init();
   
  }

  firstForm(dataEmployees?:any){
    this.firstFormGroup = this.fb.group({
      name:                     [dataEmployees?.name ?? '', Validators.compose([
                                  Validators.required,Validators.minLength(3)
                                ])],
      last_name:                [dataEmployees?.last_name ?? '',  Validators.compose([
                                  Validators.required,Validators.minLength(3)
                                ])],
      identification_number:    [dataEmployees?.identification_number ?? '', Validators.compose([
                                  Validators.required,Validators.minLength(3)
                                ])],
      position:                 [dataEmployees?.position ?? '', Validators.required],
      base_salary:              [dataEmployees?.base_salary ?? '', Validators.required],
      email:                    [dataEmployees?.email ?? '',Validators.compose([
                                  Validators.required,Validators.email,
                                ])],
      identification_type_id:   [dataEmployees?.identification_type_id ?? '', Validators.required],
      active:                   [dataEmployees?.active ??'',Validators.required],
    });
    this.isLoading=false;
  }

  init(){
    this.isLoading = true;
    this.getTipoIdentificacion();
    this.getCargos();
    this.firstForm();
  }

  getEmployees(){
    this.serviceEmployees.getEmployed().subscribe(res =>{
      this.users = res.data;
    })
  }
  createEmployer(formData:any){
    console.log();

    this.serviceEmployees.postEmployed(formData).subscribe(res => {
      console.log(res);
      
    })
  }

  getTipoIdentificacion():Promise<any>{
    return new Promise( (resolve,reject)=>{
      this.IdentificationTypeService.getTipoIdentificacion().subscribe(rest => {
        this.tipoIdentificacion = rest.data;
        resolve(rest.data);
      });
    })
  }

  getCargos():Promise<any>{
    return new Promise( (resolve,reject)=>{
      this.PositionService.getCargos().subscribe(rest => {
        this.cargos = rest.data;
        resolve(rest.data);
      });
    })
  }


}
