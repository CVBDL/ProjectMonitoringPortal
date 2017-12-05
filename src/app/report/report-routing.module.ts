import { NgModule } from "@angular/core";
import { Routes, RouterLink, RouterModule } from "@angular/router";

import { ReportComponent } from "./report.component";

const routes: Routes = [{
  path: ':program',
  component: ReportComponent
}, {
  path: ':program/:product',
  component: ReportComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
