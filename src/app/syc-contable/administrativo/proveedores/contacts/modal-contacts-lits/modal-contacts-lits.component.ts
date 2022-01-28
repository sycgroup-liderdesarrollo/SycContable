import {Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from '../../../services/proveedores/contacts.service';
import { ModalContactsComponent } from '../modal-contacts/modal-contacts.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-modal-contacts-lits',
  templateUrl: './modal-contacts-lits.component.html',
  styleUrls: ['./modal-contacts-lits.component.css']
})
export class ModalContactsLitsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'last_name', 'email', 'phone', 'position', 'options'];
  dataSource:any;

  @Input() id:any;


  constructor(
    private serviceContactList: ContactService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.serviceContactList.getContactProvider(this.id).subscribe(resp=>{
      this.dataSource = resp.data;
    })
  }
  openEditDialog(contact_id?:number){
    const dialogRef = this.dialog.open(ModalContactsComponent);
    contact_id? dialogRef.componentInstance.id = contact_id : null;

  }
}
