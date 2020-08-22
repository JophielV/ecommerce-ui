import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthorizedGuard implements CanActivate {

  constructor(private r: Router, private as: AuthService) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.as.isAuthenticated()) {
      return this.as.logout()
        .pipe(map(() => {
            return true;
          }),
          catchError(() => {
            return of(true);
          })
        );
    }

    this.r.navigateByUrl('/login');
  }
}
