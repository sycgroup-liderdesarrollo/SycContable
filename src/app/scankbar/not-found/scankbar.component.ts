import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scankbar',
  templateUrl: './scankbar.component.html',
  styleUrls: ['./scankbar.component.css'],
  styles: [
    `
    .not-found {
      color: hotpink;
    }
  `,
  ],
})

export class ScankbarComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }

}
