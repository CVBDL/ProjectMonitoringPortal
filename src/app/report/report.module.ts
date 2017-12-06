import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatButtonModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

import { ReportRoutingModule } from "./report-routing.module";

import { ReportComponent } from "./report.component";

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    ReportRoutingModule
  ],
  declarations: [
    ReportComponent
  ]
})
export class ReportModule { }
