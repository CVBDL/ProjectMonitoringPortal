import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  public title: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.title = '';
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      switch (data.key) {
        case 'imperative':
          this.title = 'Imperative Programming';
          break;
        case 'functional':
          this.title = 'Functional Programming';
          break;
        default:
          this.title = 'Default title';
          break;
      }
    });
  }

}
