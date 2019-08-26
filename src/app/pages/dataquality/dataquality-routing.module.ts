import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataqualityComponent} from "./dataquality/dataquality.component";
import {ProgressComponent} from "./progress/progress.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes=[
  { path: 'dashboard', component:  DataqualityComponent},
  { path: 'progress', component: ProgressComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ]
})
export class DataqualityRoutingModule { }
