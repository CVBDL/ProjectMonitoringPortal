import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material';

import { LogoComponent } from "./logo/logo.component";


@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    LogoComponent,
    MatIconModule
  ],
  declarations: [LogoComponent]
})
export class CoreModule { }
