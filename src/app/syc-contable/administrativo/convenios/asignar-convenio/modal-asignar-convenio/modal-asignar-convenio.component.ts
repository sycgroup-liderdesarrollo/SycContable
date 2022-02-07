
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TipoConvenioService } from '../../../services/convenios/tipo-convenio.service';
import { ModalconveniosComponent } from '../../modalconvenios/modalconvenios.component';

@Component({
  selector: 'app-modal-asignar-convenio',
  templateUrl: './modal-asignar-convenio.component.html',
  styleUrls: ['./modal-asignar-convenio.component.css']
})
export class ModalAsignarConvenioComponent implements OnInit {

  @Input() row: any;
  covenant:any;
  deudas:any;
  form!: FormGroup;
  covenantList:any;
  covenantActual:any;


  constructor(
    private dialog: MatDialogRef<ModalconveniosComponent>,
    private AsignarService:TipoConvenioService,
    private fb:FormBuilder,
    ) { }

  ngOnInit(): void {
    this.crearform(); this.row;
    this.AsignarService.getConvenant().subscribe((resp)=>{
      this.covenantList = resp.data;
    })
  }
  crearform(dataConvenant?:any){
    this.form = this.fb.group({
      covenant_id: [dataConvenant?.covenantList ?? '', Validators.required],
      dues: [ dataConvenant?.dues ?? '', Validators.required],
      value: [ dataConvenant?.value ?? '', Validators.required],
    });
  }

  cerrar(){
    this.dialog.close();
  }
  
  asignarCovenant(userId:any,formData:any){
    this.AsignarService.asignarConvenio(userId, formData).subscribe(resp=>{
    this.covenant = resp;
    console.log(resp);
    Swal.fire({
      showDenyButton: true,
      icon: 'success',
      title: resp.data,
      confirmButtonText:'Ok',
      denyButtonText: 'Salir',
      }).then((result) => {
        if (result.isDenied) {
          this.dialog.close();
        }
      })
    })
  }
  actualCovenant(covenantId:number){
    this.AsignarService.selectCovenant(covenantId).subscribe((resp)=>{
      this.covenantActual = resp.data;
    })
  }

}
