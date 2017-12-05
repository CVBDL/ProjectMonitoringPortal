import { NgModule } from "@angular/core";
import { Routes, RouterLink, RouterModule } from "@angular/router";

import { ReportComponent } from "./report.component";

const routes: Routes = [{
  path: ':bucket',
  component: ReportComponent,
  pathMatch: 'full'
}, {
  path: ':bucket/:product',
  component: ReportComponent,
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
