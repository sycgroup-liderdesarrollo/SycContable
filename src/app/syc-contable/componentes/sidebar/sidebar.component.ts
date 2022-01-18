import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import {FlatTreeControl} from '@angular/cdk/tree';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  expand:boolean=false;
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  @Input() sidebar !: MatDrawer;
  
  constructor() { }

  ngOnInit(): void {
  }

}
