import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CargoService } from '../../services/empleados/cargo.service';
import { CiudadService } from '../../services/empleados/ciudad.service';
import { ContactoEmergenciaService } from '../../services/empleados/contacts/contacto-emergencia.service';
import { EmployeeService } from '../../services/empleados/employee.service';
import { EstadoCivilService } from '../../services/empleados/estado-civil.service';
import { EstratoService } from '../../services/empleados/estrato.service';
import { FondoPensionesService } from '../../services/empleados/fondo-pensiones.service';
import { GeneroService } from '../../services/empleados/genero.service';
import { LineaNegocioService } from '../../services/empleados/linea-negocio.service';
import { NiveleducaionService } from '../../services/empleados/niveleducaion.service';
import { ProveedorSaludService } from '../../services/empleados/proveedor-salud.service';
import { RiesgosLaboralesService } from '../../services/empleados/riesgos-laborales.service';
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
  email:any;
  Estrato:any;
  riesgosLaborales:any;
  active:any;
  form!: FormGroup;
  isLoading:boolean=false;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  provinces:any;
  kinships:any;
  formulario = {
    name:"",
    last_name:"",
    identification_number:"",
    email:"",
    password:"",
    admission_date:"",
    address:"",
    neighborhood:"",
    birthday:""  ,
    phone:"",
    children:""  ,
    base_salary:"",
    position_id:"",
    contract_type_id:"",
    salary_type_id:"",
    headquarter_id:"",
    identification_type_id:"",
    gender_id:"",
    health_provider_id:"",
    pension_fund_id:"",
    civil_statu_id:"",
    work_city_id:"",
    residence_city_id:"",
    expedition_place_id:"",
    strata_id:"",
    education_level_id:"",
    occupationalRiskManager:"",
    active:"",
    emergency_contact_id:"",
    business_line_id:""
  };

  constructor(
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
    private _formBuilder: FormBuilder,
    private serviceRiesgosLaborales:RiesgosLaboralesService,
  ){}

  ngOnInit(): void {
    this.init();
        //obtiene todos los departamentos
        this.servicesResidencia.getProvince().subscribe(resp=>{
          this.provinces = resp.data;
        })
  }
  editEmployee(){
    this.servicesEmployee.getEmployee(this.id).subscribe(
      resp => {
        console.log(resp.data);
        this.isLinear = true
        this.dataEmployee = resp.data;
        this.firtsForm(this.dataEmployee);
        this.secondForm(this.dataEmployee);
        this.thirdFormn(this.dataEmployee)
        this.fourthForm(this.dataEmployee);
        this.getContactoEmergencia(this.dataEmployee.emergency_contact_id)
      })
  }
  firtsForm(dataEmployee?:any){
    this.firstFormGroup = this._formBuilder.group({
      identification_number: [dataEmployee?.identification_number ?? '', Validators.required],
      name: new FormControl (dataEmployee?.name ??'', Validators.minLength(3)),
      last_name: new FormControl (dataEmployee?.last_name ??'', Validators.minLength(3)),
      birthday:[dataEmployee?.birthday ?? '', Validators.required],
      identification_type_id:[dataEmployee?.identification_type_id ?? '', Validators.required],
      children:[dataEmployee?.children ?? '', Validators.required],
      gender_id:[dataEmployee?.gender.id ?? '', Validators.required],
      education_level_id:[dataEmployee?.education_level_id ?? '', Validators.required],
      civil_statu_id:[dataEmployee?.civil_statu_id ??'',Validators.required],
      expedition_place_id:[dataEmployee?.expedition_place_id ??'',Validators.required],
      phone: new FormControl (dataEmployee?.phone ?? '', Validators.maxLength(10)),
    });
    this.isLoading=false;
  }
  secondForm(dataEmployee?:any){
    this.secondFormGroup = this._formBuilder.group({
      address: new FormControl(dataEmployee?.address ?? '', Validators.minLength(5)),
      neighborhood:[dataEmployee?.neighborhood ?? '', Validators.required],
      residence_city_id:[dataEmployee?.residence_city_id ??'',Validators.required],
      strata_id:[dataEmployee?.strata_id ??'',Validators.required],
    });
    this.isLoading=false;
  }
  thirdFormn(dataEmployee?:any){
    this.thirdFormGroup = this._formBuilder.group({
      email: [dataEmployee?.email ?? '', Validators.compose([
        Validators.required, Validators.email
      ])],
      password:[dataEmployee?.email ?? '12345678',Validators.compose([
        Validators.required,Validators.minLength(8)
      ])],
    });
    this.isLoading=false;
  }
  fourthForm(dataEmployee?:any){
    this.fourthFormGroup = this._formBuilder.group({
      position_id:[dataEmployee?.position.id ?? '', Validators.required],
      admission_date:[dataEmployee?.admission_date ?? '', Validators.required],
      base_salary:[dataEmployee?.base_salary ?? '', Validators.required],
      business_line_id:[dataEmployee?.position.business_line.id ?? '', Validators.required],
      contract_type_id:[dataEmployee?.contract_type_id ?? '', Validators.required],
      salary_type_id:[dataEmployee?.salary_type_id ?? '', Validators.required],
      work_city_id :[dataEmployee?.work_city_id  ??'',Validators.required],
      pension_fund_id:[dataEmployee?.pension_fund_id ??'',Validators.required],
      active:[dataEmployee?.active ??'',Validators.required],
      health_provider_id:[dataEmployee?.health_provider_id ?? '', Validators.required],
      headquarter_id:[dataEmployee?.headquarter_id ?? '', Validators.required],
      occupationalRiskManager:[dataEmployee?.occupationalRiskManager ?? '',Validators.required],
    });
    this.isLoading=false;
  }
  fifthForm(dataEmployee?:any){
    this.fifthFormGroup = this._formBuilder.group({
      name: new FormControl (dataEmployee?.name ??'', Validators.minLength(3)),
      phone: new FormControl (dataEmployee?.phone ?? '', Validators.maxLength(10)),
      kinship_id:[dataEmployee?.kinship_id ?? '', Validators.required]
    })
  }
  asigForm(firts:any,second:any,third:any,fourth:any, fifth:any){
    console.log(firts);
    
    // primer formulario
    this.formulario.name = firts.name,
    this.formulario.last_name = firts.last_name,
    this.formulario.identification_number = firts.identification_number,
    this.formulario.birthday = firts.birthday,
    this.formulario.identification_type_id = firts.identification_type_id,
    this.formulario.children = firts.children,
    this.formulario.gender_id = firts.gender_id
    this.formulario.education_level_id = firts.education_level_id
    this.formulario.civil_statu_id = firts.civil_statu_id
    this.formulario.expedition_place_id = firts.expedition_place_id
    this.formulario.emergency_contact_id = fifth.kinship_id
    this.formulario.phone = firts.phone
    // segundo formulario
    this.formulario.address = second.address
    this.formulario.neighborhood = second.neighborhood
    this.formulario.residence_city_id = second.residence_city_id
    this.formulario.strata_id = second.strata_id
    // tercer formulario
    this.formulario.email = third.email
    this.formulario.password = third.password
    // cuarto formulario
    this.formulario.position_id = fourth.position_id
    this.formulario.admission_date = fourth.admission_date
    this.formulario.base_salary = fourth.base_salary
    this.formulario.headquarter_id = fourth.headquarter_id
    this.formulario.business_line_id = fourth.business_line_id
    this.formulario.contract_type_id = fourth.contract_type_id
    this.formulario.salary_type_id = fourth.salary_type_id
    this.formulario.work_city_id = fourth.work_city_id
    this.formulario.pension_fund_id = fourth.pension_fund_id
    this.formulario.active = fourth.active
    this.formulario.health_provider_id = fourth.health_provider_id
    this.formulario.occupationalRiskManager = fourth.occupationalRiskManager
    this.isEdit ? this.updateEmployer() : this.createEmployer()
  }
  createEmployer(){
    console.log(this.formulario);

    
    this.servicesEmployee.postEmployed(this.formulario).subscribe(res => {
      this.respuesta = res;
      this.dialog.close();
    })
  }
  updateEmployer(){
    this.servicesEmployee.updateEmployee(this.formulario, this.id).subscribe(res =>{
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
    await this.getKinships();
    await this.getRiesgosLaborales();
    this.id ? this.editEmployee() : this.firtsForm(), this.secondForm(), this.thirdFormn(), this.fourthForm(), this.fifthForm();
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
  getContactoEmergencia(id:any):Promise<any>{
    return new Promise( (resolve,reject)=>{
      this.serviceContactoEmergencia.getContactoEmergencia(id).subscribe(resp=>{
        this.Emergencia = resp.data;
        this.fifthForm(this.Emergencia);
        resolve(resp.data);
      });
    })
  }
  cities(province_id:number){
    this.servicesResidencia.getCiudad(province_id).subscribe(resp=>{
      this.expedicion = resp.data;
      this.residencia = resp.data;
    })
  }
  getKinships():Promise<any>{
    return new Promise ((resolve, reject)=>{
      this.serviceContactoEmergencia.getKinship().subscribe(resp=>{
        this.kinships = resp.data;
        resolve(resp.data);
      });
    });
  }
  postEmergencyContact(formData:any){
    this.serviceContactoEmergencia.postContacts(formData).subscribe(resp=>{
    })
  }
  putEmergencyContact(formData:any){
    this.serviceContactoEmergencia.putContacts(this.Emergencia.id, formData).subscribe(resp=>{
      console.log(resp);
    })
  }

  getRiesgosLaborales(){
    return new Promise ((resolve, reject)=>{
    this.serviceRiesgosLaborales.getSucursales().subscribe(res=>{
      this.riesgosLaborales = res.data
      resolve(res.data);
      });
    });
  }
}
