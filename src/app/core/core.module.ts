import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';

import { LogoComponent } from "./logo/logo.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule
  ],
  exports: [
    LogoComponent,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule
  ],
  declarations: [
    LogoComponent,
    PageNotFoundComponent
  ]
})
export class CoreModule { }
