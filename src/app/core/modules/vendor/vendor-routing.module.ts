import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VendorComponent} from './vendor.component';


const routes: Routes = [
  {
    path: '',
    component: VendorComponent,
    data: {
      roles: ['VENDOR'],
      permissions: ['CREATE_PRODUCT']
    },
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
