import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import {SetupModule} from './pages/setup/setup.module';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './shared/login/login.component';
// import {CookieService} from "ngx-cookie-service";
import {WelcomeModule} from "./pages/welcome/welcome.module";
import {AdminModule} from "./pages/admin/admin.module";
import {AdminComponent} from "./pages/admin/admin.component";
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {SetupComponent} from "./pages/setup/setup.component";
import {DatabaseModule} from "./pages/database/database.module";
import {DataqualityModule} from "./pages/dataquality/dataquality.module";


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // AdminComponent,
    // WelcomeComponent,
    // SetupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   TestService
    // ),
    BrowserAnimationsModule,
    SetupModule,
    WelcomeModule,
    AdminModule,
    DatabaseModule,
    DataqualityModule,
    ReactiveFormsModule

  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
