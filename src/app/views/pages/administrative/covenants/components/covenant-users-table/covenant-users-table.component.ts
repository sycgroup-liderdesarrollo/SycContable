import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-covenant-users-table',
  templateUrl: './covenant-users-table.component.html',
  styleUrls: ['./covenant-users-table.component.scss']
})
export class CovenantUsersTableComponent implements OnInit {

  @Input() covenant:any;

  constructor() { }

  ngOnInit(): void {
  }

}
