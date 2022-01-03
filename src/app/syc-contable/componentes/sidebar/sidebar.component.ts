import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  @Input() sidebar !: MatDrawer;
  
  constructor() { }

  ngOnInit(): void {
  }

}
