import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private as: AuthService,
              private r: Router,
              private permissionsService: NgxPermissionsService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error) => {

        if (error.status === 401 || error.status === 403) {
          this.permissionsService.flushPermissions();
          localStorage.clear();
          this.r.navigateByUrl('/login');
        } else {

          // return all others errors
          // let errMessage = error.error && error.error.message;

          // if (errMessage) {
          // toaster here
          // }
        }

        return throwError(error);

      })) as any;
  }
}

