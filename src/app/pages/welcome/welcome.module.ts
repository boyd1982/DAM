import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { TestComponent } from './test/test.component';


@NgModule({
  imports: [WelcomeRoutingModule],
  declarations: [WelcomeComponent, TestComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
