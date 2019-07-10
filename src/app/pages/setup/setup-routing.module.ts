import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SetupComponent} from './setup.component';


const routes: Routes = [
  {path: '' , component: SetupComponent}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SetupRoutingModule { }
