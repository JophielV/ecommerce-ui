import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxPermissionsModule} from 'ngx-permissions';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {ToasterModule} from 'angular2-toaster';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    LoadingBarHttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgxPermissionsModule.forRoot(),
    HttpClientModule,
    CoreModule,
    ToasterModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
