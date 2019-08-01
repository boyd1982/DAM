import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdduserComponent } from './adduser/adduser.component';
import { AdminComponent } from './admin.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { EdituserComponent } from './edituser/edituser.component';




@NgModule({
  declarations: [AdduserComponent, AdminComponent, EdituserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    NgZorroAntdModule
  ],
  exports:[AdminComponent]
})
export class AdminModule { }
