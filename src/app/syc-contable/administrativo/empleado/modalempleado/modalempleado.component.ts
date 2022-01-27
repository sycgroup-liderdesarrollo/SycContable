
import { Component, Input, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CargoService } from '../../services/empleados/cargo.service';
import { CiudadService } from '../../services/empleados/ciudad.service';
import { ContactoEmergenciaService } from '../../services/empleados/contacto-emergencia.service';
import { EmployeeService } from '../../services/empleados/employee.service';
import { EstadoCivilService } from '../../services/empleados/estado-civil.service';
import { EstratoService } from '../../services/empleados/estrato.service';
import { FondoPensionesService } from '../../services/empleados/fondo-pensiones.service';
import { GeneroService } from '../../services/empleados/genero.service';
import { LineaNegocioService } from '../../services/empleados/linea-negocio.service';
import { NiveleducaionService } from '../../services/empleados/niveleducaion.service';
import { ProveedorSaludService } from '../../services/empleados/proveedor-salud.service';
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
  residencia:any;
  ciudadTrabajo:any;
  NivelEducativo:any;
  ProveedorSalud:any;
  estadoCivil:any;
  FondoDePensiones:any;
  expedicion:any;
  Emergencia:any;
  Estrato:any;
  active:any;
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
    private servicesGenero: GeneroService,
    private servicesProveedorSalud:ProveedorSaludService,
    private servicesResidencia:CiudadService,
    private servicesEstadoCivil:EstadoCivilService,
    private servicesNivelEducativo:NiveleducaionService,
    private serviceFondoPensiones:FondoPensionesService,
    private serviceEstrato:EstratoService,
    private serviceContactoEmergencia:ContactoEmergenciaService,
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
      health_provider_id:[dataEmployee?.health_provider_id ?? '', Validators.required],
      education_level_id:[dataEmployee?.education_level_id ?? '', Validators.required],
      work_city_id :[dataEmployee?.work_city_id  ??'',Validators.required],
      civil_statu_id:[dataEmployee?.civil_statu_id ??'',Validators.required],
      expedition_place_id:[dataEmployee?.expedition_place_id ??'',Validators.required],
      residence_city_id:[dataEmployee?.residence_city_id ??'',Validators.required],
      pension_fund_id:[dataEmployee?.pension_fund_id ??'',Validators.required],
      strata_id:[dataEmployee?.strata_id ??'',Validators.required],
      emergency_contact_id:[dataEmployee?.emergency_contact_id ??'',Validators.required],
      active:[dataEmployee?.active ??'',Validators.required],
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
    await this.getGenero();
    await this.getNivelEducativo();
    await this.getciudadTrabajo();
    await this.getProveedorSalud();
    await this.getEstadoCivil();
    await this.getLugarExpedicion();
    await this.getFondoDePensiones();
    await this.getEstrato();
    await this.getContactoEmergencia();
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
      });
    })
  }

  getGenero():Promise<any>{
    return new Promise( (resolve,reject)=>{
      this.servicesGenero.getGenero().subscribe(resp=>{
        this.genero = resp.data;
        resolve(resp.data);
      });
    })
  }

  getNivelEducativo():Promise<any>{
    return new Promise( (resolve,reject)=>{
      this.servicesNivelEducativo.getNivelEducacion().subscribe(resp=>{
        this.NivelEducativo = resp.data;
        resolve(resp.data);
      });
    })
  }
  getciudadTrabajo():Promise<any>{
    return new Promise( (resolve,reject)=>{
      this.servicesResidencia.getCiudad().subscribe(resp=>{
        this.residencia = resp.data;
        resolve(resp.data);
      });
    })
  }

  getProveedorSalud():Promise<any>{
    return new Promise( (resolve,reject)=>{
      this.servicesProveedorSalud.getProveedorSalud().subscribe(resp=>{
        this.ProveedorSalud = resp.data;
        resolve(resp.data);
      });
    })
  }
  getEstadoCivil():Promise<any>{
    return new Promise( (resolve,reject)=>{
      this.servicesEstadoCivil.getEstadoCivil().subscribe(resp=>{
        this.estadoCivil = resp.data;
        resolve(resp.data);
      });
    })
  }

  getLugarExpedicion():Promise<any>{
    return new Promise( (resolve,reject)=>{
      this.servicesResidencia.getCiudad().subscribe(resp=>{
        this.expedicion = resp.data;
        resolve(resp.data);
      });
    })
  }

  getFondoDePensiones():Promise<any>{
    return new Promise( (resolve,reject)=>{
      this.serviceFondoPensiones.getFondoPensiones().subscribe(resp=>{
        this.FondoDePensiones = resp.data;
        resolve(resp.data);
      });
    })
  }

  getEstrato():Promise<any>{
    return new Promise( (resolve,reject)=>{
      this.serviceEstrato.getCEstrato().subscribe(resp=>{
        this.Estrato = resp.data;
        resolve(resp.data);
      });
    })
  }

  getContactoEmergencia():Promise<any>{
    return new Promise( (resolve,reject)=>{
      this.serviceContactoEmergencia.getContactoEmergencia().subscribe(resp=>{
        this.Emergencia = resp.data;
        resolve(resp.data);
      });
    })
  }



}
