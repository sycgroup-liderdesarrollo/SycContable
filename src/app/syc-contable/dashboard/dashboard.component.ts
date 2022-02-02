import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() sidebar!: MatDrawer;
  constructor() { }

  ngOnInit(): void {
  }
  openSideNav(){
    this.sidebar.toggle();
  }

}
