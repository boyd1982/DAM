import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from "@angular/router";
import {AdddatabaseComponent} from "./adddatabase/adddatabase.component";
import {DatabaseComponent} from "./database.component";

const routes: Routes=[
{ path: '', component:  DatabaseComponent},
{ path: 'adddatabase', component: AdddatabaseComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DatabaseRoutingModule { }
