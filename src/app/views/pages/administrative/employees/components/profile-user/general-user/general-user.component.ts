import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-user',
  templateUrl: './general-user.component.html',
  styleUrls: ['./general-user.component.scss']
})
export class GeneralUserComponent implements OnInit {

  constructor() { }
  isEdit:boolean = false;
  name:string = "Jhonata gamboa";
  cumple:Date = new Date("16-02-2022");
  number:number = 3
  btnEdit:string;

  ngOnInit(): void {
  }

  edit(){
    this.isEdit = !this.isEdit;
    this.isEdit == true ? this.btnEdit = "active" : this.btnEdit = " ";
  }
}
