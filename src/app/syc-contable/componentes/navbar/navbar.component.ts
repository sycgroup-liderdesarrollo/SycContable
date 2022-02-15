import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class navbarComponent implements OnInit {
  @Input() sidebar!: MatDrawer;
  constructor(
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.openSideNav();
  }

  openSideNav(){
    this.sidebar.toggle();
  }

  toLogout(){
    this.authService.logout();
  }
}
