
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TipoConvenioService } from '../../../services/convenios/tipo-convenio.service';
import { ModalconveniosComponent } from '../../modalconvenios/modalconvenios.component';

@Component({
  selector: 'app-modal-asignar-convenio',
  templateUrl: './modal-asignar-convenio.component.html',
  styleUrls: ['./modal-asignar-convenio.component.css']
})
export class ModalAsignarConvenioComponent implements OnInit {

  @Input() id: any;
  covenants:any;
  deudas:any;
  form!: FormGroup;
  covenantList:any;


  constructor(
    private dialog: MatDialogRef<ModalconveniosComponent>,
    private AsignarService:TipoConvenioService,
    private fb:FormBuilder,
    ) { }

  ngOnInit(): void {
    this.AsignarService.getConvenant().subscribe((resp)=>{
      this.covenantList = resp.data;
      console.log(this.covenantList)
    })
  }

  cerrar(){
    this.dialog.close();
  }

  asignarCovenant(){
    this.AsignarService.asignarConvenio(this.covenants, this.form).subscribe(resp=>{
    this.covenants = resp.data;
    })
  }

  covenant(){

  }
}
