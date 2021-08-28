import { NgModule } from '@angular/core';
import {ArchwizardModule} from 'angular-archwizard';
import {SharedModule} from '../../../shared/shared.module';
import {TopBarComponent} from '../../../shared/components/layout/top-bar/top-bar.component';
import {VendorComponent} from './vendor.component';
import {VendorRoutingModule} from './vendor-routing.module';

@NgModule({
  declarations: [
    VendorComponent
  ],
  imports: [VendorRoutingModule, SharedModule, ArchwizardModule]
})
export class VendorModule {}
