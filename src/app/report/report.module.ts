import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatListModule } from '@angular/material';

import { ReportRoutingModule } from "./report-routing.module";
import { SharedModule } from "../shared/shared.module";

import { ReportComponent } from "./report.component";


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatListModule,
    SharedModule,
    ReportRoutingModule
  ],
  declarations: [
    ReportComponent
  ]
})
export class ReportModule { }
