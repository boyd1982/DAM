import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import {TestComponent} from './test/test.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'test', component: TestComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
