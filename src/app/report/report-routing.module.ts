import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ReportComponent } from "./report.component";

const routes: Routes = [{
  path: 'imperative',
  component: ReportComponent
}, {
  path: 'functional',
  component: ReportComponent
}, {
  path: 'declarative',
  component: ReportComponent
}, {
  path: 'object-oriented',
  component: ReportComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
