import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';

import { ConfigService } from "./config.service";
import { LogoComponent } from "./logo/logo.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [
    HttpClientModule,
    LogoComponent,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    ConfigService
  ],
  declarations: [
    LogoComponent,
    PageNotFoundComponent
  ]
})
export class CoreModule { }
