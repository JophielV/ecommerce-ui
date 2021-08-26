import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Data,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {NgxPermissionsService} from 'ngx-permissions';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {UserRole} from '../../shared/enums/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate, CanActivateChild {
  constructor(private r: Router,
              private as: AuthService,
              private ps: NgxPermissionsService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('trigger auth gaurd');
    console.log(JSON.parse(localStorage.getItem('credentials')));
    if (this.as.isAuthenticated()) {

      const userRole = Object.keys(this.ps.getPermissions());

      if (userRole.length === 0) {
        return this.as.getLoggedInUser().pipe(map((user: any) => {

            // Set credentials - avoid hacking of local storage
            const role = user.principal.authorities.length > 0 ? user.principal.authorities[0].authority : '';
            this.as.setCredentials({
              username: user.principal.username,
              role
            });

            console.log('auth gaurd');
            console.log(JSON.parse(localStorage.getItem('credentials')));

            this.ps.addPermission(role);

            if (user.principal.role && user.principal.role.privileges) {
              const privileges: Array<any> = user.principal.role.privileges.length > 0 ? user.principal.role.privileges : null;
              for (const privilige of privileges) {
                this.ps.addPermission(privilige.code);
              }
            }

            return this.validateRole(next.data);
          }),
          catchError(() => {
            this.r.navigateByUrl('/login');
            return of(false);
          }));
      } else {
        return this.validateRole(next.data);
      }

    } else {

      this.r.navigateByUrl('/login');
      return false;
    }

  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(next, state);
  }

  validateRole(data: Data): boolean {
    console.log('validating role');
    const allowedRoles = data && data.roles;
    const allowedPermissions = data && data.permissions;
    const userRolesAndPermissions = Object.keys(this.ps.getPermissions());
    if (allowedRoles) {
      if (allowedRoles.some(role => userRolesAndPermissions.indexOf(role) !== -1) &&
        (allowedPermissions.length === 0 || allowedPermissions.some(role => userRolesAndPermissions.indexOf(role) !== -1))) {
        return true;
      } else {
        // Determine root url depending on role
        switch (UserRole[userRolesAndPermissions[0]]) {
          case UserRole.ADMIN:
            this.r.navigateByUrl('/admin');
            break;
          case UserRole.VENDOR:
            this.r.navigateByUrl('/vendor');
            break;
          default:
            this.r.navigateByUrl('/');
            break;
        }
        return false;
      }
    } else {
      return true;
    }
  }
}
