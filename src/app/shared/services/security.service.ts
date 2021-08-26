import {Injectable} from '@angular/core';
import {NgxPermissionsService} from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private ps: NgxPermissionsService) {
  }

  isAuthorized(permission: string): boolean {
    const userRoles = Object.keys(this.ps.getPermissions());
    return userRoles.indexOf(permission) > -1;
  }
}
