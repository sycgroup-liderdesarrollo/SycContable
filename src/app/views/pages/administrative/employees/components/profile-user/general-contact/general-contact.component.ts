import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-contact',
  templateUrl: './general-contact.component.html',
  styleUrls: ['./general-contact.component.scss']
})
export class GeneralContactComponent implements OnInit {

  constructor() { }
  name:string = "Jhonata gamboa";
  cumple:Date = new Date("16-02-2022");
  isEdit:boolean = false;
  number:number = 3
  btnEdit:string;

  ngOnInit(): void {
  }
  edit(){
    this.isEdit = !this.isEdit;
    this.isEdit == true ? this.btnEdit = "active" : this.btnEdit = " ";
  }
}
