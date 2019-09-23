import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataqualityRoutingModule } from './dataquality-routing.module';
import { DataqualityComponent } from './dataquality/dataquality.component';
import { ProgressComponent } from './progress/progress.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';





@NgModule({
  declarations: [DataqualityComponent, ProgressComponent],
  imports: [
    CommonModule,
    DataqualityRoutingModule,
    NgZorroAntdModule
  ],
  exports: [
    DataqualityComponent,
    ProgressComponent
  ]
})
export class DataqualityModule { }
