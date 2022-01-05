
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
  @Input() isEdit: boolean = true;
  
  selectedValue!: string;
  dataEmployee: any;
  respuesta: any;
  cargos: any;
  lineaNegocio: any;
  sucursales: any;
  tipoContrato:any;
  tipoIdentificacion:any;
  tipoSalario:any;
  form!: FormGroup;

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
   this.id ? this.editEmployee() : this.createForm();
  //  ...............................................................
   this.servicesCargo.getCargos().subscribe(res => {
     this.cargos = res.data
   });
   this.servicesLineaNegocio.getLineaNegocio().subscribe(rest => {
     this.lineaNegocio = rest.data
   });
   this.servicesSucursal.getSucursales().subscribe(rest => {
     this.sucursales = rest.data
   });
   this.servicesTipoContrato.getTipoContrato().subscribe(rest => {     this.tipoContrato = rest.data    
   });
   this.servicesTipoIdentificacion.getTipoIdentificacion().subscribe(rest => {
     this.tipoIdentificacion = rest.data
   });
   this.servicesTipoSalario.getTipoSalario().subscribe(rest => {
     this.tipoSalario = rest.data
   })
   
  }
  
  editEmployee(){
    this.servicesEmployee.putEmployee(this.id).subscribe(
      resp => {
        this.dataEmployee = resp.data;
        
      },
      error => {

      }, () => {
        this.createForm(this.dataEmployee);
      }

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
      base_salary:[dataEmployee?.base_salary ?? '', Validators.required],
      headquarter_id:[dataEmployee?.headquarter_id ?? '', Validators.required],
      business_line_id:[dataEmployee?.business_line_id ?? '', Validators.required],
      contract_type_id:[dataEmployee?.contract_type_id ?? '', Validators.required],
      salary_type_id:[dataEmployee?.salary_type_id ?? '', Validators.required],
      identification_type_id:[dataEmployee?.identification_type_id ?? '', Validators.required],
    });
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

}
