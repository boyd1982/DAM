import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SetupComponent} from './pages/setup/setup.component';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {TestComponent} from "./pages/welcome/test/test.component";
import {SetupModule} from "./pages/setup/setup.module";
import {WelcomeModule} from "./pages/welcome/welcome.module";
import {AdminComponent} from "./pages/admin/admin.component";
import {AdminModule} from "./pages/admin/admin.module";

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', component:WelcomeComponent },
  { path: 'setup', component:SetupComponent},
  { path: 'admin', loadChildren:  './pages/admin/admin.module#AdminModule' },
  { path: 'database', loadChildren: './pages/database/database.module#DatabaseModule'}

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SetupModule,
    WelcomeModule,
    AdminModule,

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
