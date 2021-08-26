import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { finalize } from 'rxjs/internal/operators';
import {AuthService} from '../../services/auth.service';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  error: boolean;
  loading: boolean;
  errorMsg: string;

  constructor(private as: AuthService,
              private fb: FormBuilder,
              private r: Router,
              private ps: NgxPermissionsService) { }

  ngOnInit(): void {
    // clear local storage and permissions first
    localStorage.clear();
    this.ps.flushPermissions();

    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      username: [null],
      password: [null]
    });
  }

  login(): void {
    this.error = false;
    this.loading = true;
    this.as.login(this.loginForm.value)
      .pipe(untilDestroyed(this),
        finalize(() => this.loading = false))
      .subscribe((user: any) => {

        // console.log(user);

        const role = user.principal.authorities.length > 0 ? user.principal.authorities[0].authority : null;
        this.as.setCredentials({
          username: user.principal.username,
          role
        });

        this.ps.addPermission(role);

        if (user.principal.role && user.principal.role.privileges) {
          const privileges: Array<any> = user.principal.role.privileges.length > 0 ? user.principal.role.privileges : null;
          if (privileges != null) {
            for (const privilige of privileges) {
              this.ps.addPermission(privilige.code);
            }
          }
        }

        console.log('role: ' + role);
        if (role) {
          this.r.navigateByUrl('/');
        } else {
          this.error = true;
        }

      }, err => {
        this.error = true;
        this.errorMsg =  err.error.message;
      });
  }

  ngOnDestroy(): void {}
}
