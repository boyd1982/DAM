import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup.component';
import {Routes} from '@angular/router';
import { SetupRoutingModule } from './setup-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [SetupComponent],
  imports: [
    CommonModule,
    SetupRoutingModule,
    NgZorroAntdModule
  ],
  exports:[
    SetupComponent
  ]
})
export class SetupModule { }
