import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseComponent } from './database.component';
import { EditdatabaseComponent } from './editdatabase/editdatabase.component';
import { AdddatabaseComponent } from './adddatabase/adddatabase.component';
import { DatabaseRoutingModule } from './database-routing.module';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [DatabaseComponent, EditdatabaseComponent, AdddatabaseComponent],
  imports: [
    CommonModule,
    DatabaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  exports: [
    DatabaseComponent
  ]
})
export class DatabaseModule { }
