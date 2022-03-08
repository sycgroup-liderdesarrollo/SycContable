import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-segurity',
  templateUrl: './general-segurity.component.html',
  styleUrls: ['./general-segurity.component.scss']
})
export class GeneralSegurityComponent implements OnInit {

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
