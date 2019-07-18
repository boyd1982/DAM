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
import {CookieService} from "ngx-cookie-service";


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    ReactiveFormsModule

  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
