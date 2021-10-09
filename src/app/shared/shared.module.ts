import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {ChangePasswordComponent} from '../core/modules/auth/change-password/change-password.component';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {ShowHidePasswordModule} from 'ngx-show-hide-password';
import {TopBarComponent} from './components/layout/top-bar/top-bar.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {NzUploadModule} from 'ng-zorro-antd';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {NgBootstrapModule} from './models/ng-bootstrap.module';



@NgModule({
  declarations: [
    ChangePasswordComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgBootstrapModule,
    NgxDatatableModule,
    NzUploadModule,
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
    ShowHidePasswordModule,
    TopBarComponent
  ]
})
export class SharedModule {
}
