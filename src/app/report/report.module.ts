import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material';

import { ReportRoutingModule } from "./report-routing.module";

import { ReportComponent } from "./report.component";

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    ReportRoutingModule
  ],
  declarations: [
    ReportComponent
  ]
})
export class ReportModule { }
