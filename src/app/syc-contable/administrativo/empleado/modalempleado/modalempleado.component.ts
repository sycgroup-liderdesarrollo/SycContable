
import { Component, Input, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CargoService } from '../../services/empleados/cargo.service';
import { EmployeeService } from '../../services/empleados/employee.service';
import { LineaNegocioService } from '../../services/empleados/linea-negocio.service';
import { SucursalService } from '../../services/empleados/sucursal.service';
import { TipoContratoService } from '../../services/empleados/tipo-contrato.service';
import { TipoIdentificacionService } from '../../services/empleados/tipo-identificacion.service';
import { TipoSalarioService } from '../../services/empleados/tipo-salario.service';


@Component({
  selector: 'app-modalempleado',
  templateUrl: './modalempleado.component.html',
  styleUrls: ['./modalempleado.component.css']
})
export class ModalempleadoComponent implements OnInit {

  @Input() id?: any;
  @Input() isEdit: boolean = false;
  
  selectedValue!: string;
  dataEmployee: any;
  genero:any;
  respuesta: any;
  cargos: any;
  lineaNegocio: any;
  sucursales: any;
  tipoContrato:any;
  tipoIdentificacion:any;
  tipoSalario:any;
  form!: FormGroup;
  isLoading:boolean=false;

  constructor(
    private fb: FormBuilder,
    private servicesEmployee: EmployeeService,
    private servicesCargo: CargoService,
    private servicesLineaNegocio: LineaNegocioService,
    private servicesSucursal: SucursalService,
    private servicesTipoContrato: TipoContratoService,
    private servicesTipoIdentificacion: TipoIdentificacionService,
    private servicesTipoSalario: TipoSalarioService,
    private dialog: MatDialogRef<ModalempleadoComponent>,
  ){}
  
  ngOnInit(): void {
  
    this.init();
  }
  
  editEmployee(){
    this.servicesEmployee.getEmployee(this.id).subscribe(
      resp => {
        this.dataEmployee = resp.data;
        this.createForm(this.dataEmployee);
      },
    )
  }

  createForm(dataEmployee?:any){
    this.form = this.fb.group({
      identification_number: [dataEmployee?.identification_number ?? '', Validators.required],
      name:[ dataEmployee?.name ?? '', Validators.required],
      last_name: [dataEmployee?.last_name ?? '', Validators.required],
      position_id:[dataEmployee?.position_id ?? '', Validators.required],
      email:[dataEmployee?.email ?? '', Validators.required],
      password:['12345678', Validators.required],
      admission_date:[dataEmployee?.admission_date ?? '', Validators.required],
      birthday:[dataEmployee?.birthday ?? '', Validators.required],
      base_salary:[dataEmployee?.base_salary ?? '', Validators.required],
      headquarter_id:[dataEmployee?.headquarter_id ?? '', Validators.required],
      business_line_id:[dataEmployee?.business_line_id ?? '', Validators.required],
      contract_type_id:[dataEmployee?.contract_type_id ?? '', Validators.required],
      salary_type_id:[dataEmployee?.salary_type_id ?? '', Validators.required],
      identification_type_id:[dataEmployee?.identification_type_id ?? '', Validators.required],
      address: [dataEmployee?.address ?? '', Validators.required],
      neighborhood:[dataEmployee?.neighborhood ?? '', Validators.required],
      children:[dataEmployee?.children ?? '', Validators.required],
      gender_id:[dataEmployee?.gender_id ?? '', Validators.required],
    });
    this.isLoading=false;
  }

  createEmployer(formData:any){
    this.servicesEmployee.postEmployed(formData).subscribe(res => {
      this.respuesta = res;
      this.dialog.close();
    } )
  }

  updateEmployer(formData:any){
    this.servicesEmployee.updateEmployee(formData, this.id).subscribe(res =>{
      this.dialog.close();
    });
  }
  async init(){
    this.isLoading = true;
    await this.getCargos();
    await this.getLineasNegocio();
    await this.getSucursales();
    await this.getTipoContrato();
    await this.getTipoIdentificacion();
    await this.getTipoSalario();
    this.id ? this.editEmployee() : this.createForm();
    
  }

  getCargos() : Promise<any>{
    return new Promise( (resolve,reject) => {
      this.servicesCargo.getCargos().subscribe(res => {
        this.cargos = res.data;
        resolve(res.data);
      });
    } )
  }

  getLineasNegocio(): Promise<any>{
    return new Promise( (resolve,reject)=>{
      this.servicesLineaNegocio.getLineaNegocio().subscribe(rest => {
        this.lineaNegocio = rest.data;
        resolve(rest.data);
      });

    })
  }

  getSucursales() : Promise<any>{
    return new Promise( (resolve,reject) => {
      this.servicesSucursal.getSucursales().subscribe(rest => {
        this.sucursales = rest.data;
        resolve(rest.data);
      });
    })
  }

  getTipoContrato():Promise<any>{
    return new Promise ( (resolve,reject) => {
      this.servicesTipoContrato.getTipoContrato().subscribe(rest => {     
        this.tipoContrato = rest.data;
        resolve(rest.data);
      });
    })
  }

  getTipoIdentificacion():Promise<any>{
    return new Promise( (resolve,reject)=>{
      this.servicesTipoIdentificacion.getTipoIdentificacion().subscribe(rest => {
        this.tipoIdentificacion = rest.data;
        resolve(rest.data);
      });
    })
  }

  getTipoSalario():Promise<any>{
    return new Promise( (resolve,reject)=>{
      this.servicesTipoSalario.getTipoSalario().subscribe(rest => {
        this.tipoSalario = rest.data;
        resolve(rest.data);
      })
    })
  }

}
