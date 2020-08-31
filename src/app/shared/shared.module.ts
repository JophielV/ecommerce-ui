import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {ChangePasswordComponent} from '../core/modules/auth/change-password/change-password.component';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {ShowHidePasswordModule} from 'ngx-show-hide-password';



@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUpperCaseDirectiveModule,
    RouterModule,
    ShowHidePasswordModule
  ],
  entryComponents: [
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUpperCaseDirectiveModule,
    ShowHidePasswordModule
  ]
})
export class SharedModule {
}
