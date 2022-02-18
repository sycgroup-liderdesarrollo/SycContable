import { Component, Input, OnInit } from '@angular/core';
import { LoginComponent } from '../../../auth/login/login.component';
import { CovenantsService } from '../services/covenants.service';
@Component({
  selector: 'app-admin-covenant',
  templateUrl: './admin-covenant.component.html',
  styleUrls: ['./admin-covenant.component.scss']
})

export class AdminCovenantComponent implements OnInit {

  page = 1;
  @Input() covenant:any;
  total:number;
  constructor() {  }

  ngOnInit(): void {
    
  }
}
