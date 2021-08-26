import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {NotAuthorizedGuard} from './core/guards/not-authorized.guard';
import {AuthorizedGuard} from './core/guards/authorized.guard';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  {
    path: '',
    canActivate: [ NotAuthorizedGuard ],
    loadChildren: () => import('./core/modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    canActivateChild: [ AuthorizedGuard ],
    loadChildren: () => import('./core/modules/admin/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
