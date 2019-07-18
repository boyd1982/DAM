import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from "./admin.component";
import {AdduserComponent} from "./adduser/adduser.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'adduser', component: AdduserComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports:[
    RouterModule
  ]
})
export class AdminRoutingModule { }
