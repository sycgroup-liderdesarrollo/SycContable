import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class navbarComponent implements OnInit {
  @Input() sidebar!: MatDrawer;
  constructor() { }

  ngOnInit(): void {
  }

  openSideNav(){
    this.sidebar.toggle();
  }

}
