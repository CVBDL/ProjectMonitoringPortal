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
    this.activatedRoute.paramMap.subscribe(d => {
      console.log(d)
    });
  }

  ok() {
    console.log(1)
  }

}
