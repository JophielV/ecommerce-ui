import { NgModule } from '@angular/core';
import {ArchwizardModule} from 'angular-archwizard';
import {SharedModule} from '../../../shared/shared.module';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {TopBarComponent} from '../../../shared/components/layout/top-bar/top-bar.component';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [AdminRoutingModule, SharedModule, ArchwizardModule]
})
export class AdminModule {}
