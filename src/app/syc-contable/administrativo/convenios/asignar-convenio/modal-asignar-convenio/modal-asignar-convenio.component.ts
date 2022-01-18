
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
  convenants:any;
  deudas:any;
  form!: FormGroup;
  dataConvenant: any;

  constructor(
    private dialog: MatDialogRef<ModalconveniosComponent>,
    private AsignarService:TipoConvenioService,
    private fb:FormBuilder,
    ) { }

  ngOnInit(): void {
    this.crearform();

    this.AsignarService.asignarConvenio(this.convenants, this.form).subscribe(resp=>{
      this.convenants = resp.data
    })
  }

  crearform(dataConvenant?:any){
    this.form = this.fb.group({
      covenant_id: [dataConvenant?.covenant_id ?? '', Validators.required],
      dues: [ dataConvenant?.dues ?? '', Validators.required],
    });
  }

}
