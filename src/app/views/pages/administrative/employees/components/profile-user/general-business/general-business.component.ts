import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-business',
  templateUrl: './general-business.component.html',
  styleUrls: ['./general-business.component.scss']
})
export class GeneralBusinessComponent implements OnInit {

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
