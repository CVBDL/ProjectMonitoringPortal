import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatIconModule,
  MatListModule
} from '@angular/material';

import { ChartGroupComponent } from "./chart-group/chart-group.component";

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [
    ChartGroupComponent
  ],
  declarations: [
    ChartGroupComponent
  ]
})
export class SharedModule { }
