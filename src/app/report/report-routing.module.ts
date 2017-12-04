import { NgModule } from "@angular/core";
import { Routes, RouterLink, RouterModule } from "@angular/router";

import { ReportComponent } from "./report.component";

const routes: Routes = [{
  path: 'imperative',
  component: ReportComponent,
  data: {
    key: 'imperative'
  }
}, {
  path: 'functional',
  component: ReportComponent,
  data: {
    key: 'functional'
  }
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
