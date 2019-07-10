import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SetupComponent} from './pages/setup/setup.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'setup', loadChildren: () => import('./pages/setup/setup.module').then(m => m.SetupModule)},
  { path: 'welcome/test', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
