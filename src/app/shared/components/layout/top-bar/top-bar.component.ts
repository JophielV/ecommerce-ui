import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { untilDestroyed } from 'ngx-take-until-destroy';
import {AuthService} from '../../../../core/services/auth.service';
import {SystemUser} from '../../../models/sytem-user.model';
import {UserRole} from '../../../enums/user-role.enum';
import {NavBarService} from '../../../../core/services/nav-bar.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html'
})
export class TopBarComponent implements OnInit, OnDestroy {

  collapse = false;
  username: string;
  landingUrl: string;

  constructor(private navBarService: NavBarService,
              private authService: AuthService,
              private router: Router,
              private ts: ToasterService) {
  }

  ngOnInit(): void {
    this.collapse = window.innerWidth <= 991 ? true : false;
    this.authService.getLoggedInUser()
      .pipe(untilDestroyed(this)).subscribe((user: SystemUser) => {

        // Set credentials - avoid hacking of local storage
        const role = user.principal.authorities.length > 0 ? user.principal.authorities[0].authority : '';
        this.username = user.principal.username;
        this.authService.setCredentials({
          username: user.principal.username,
          role
        });
        console.log('top bar');
        console.log(JSON.parse(localStorage.getItem('credentials')));

        // Determine root url depending on role
        switch (UserRole[role] ) {
          case UserRole.ADMIN:
            this.landingUrl = '/admin';
            break;
          case UserRole.VENDOR:
            this.landingUrl = '/vendor';
            break;
          default:
            this.landingUrl = '/';
        }

      }, error => {
        this.ts.pop('error', 'Your session has expired');
      }
    );
  }

  toggle(): void {
    this.collapse = !this.collapse;
    this.navBarService.collapseSideBar(this.collapse);
  }

  logout(): void {
    this.authService.logout()
      .pipe(untilDestroyed(this)).subscribe(() => {
        this.router.navigateByUrl('/login');
      }, () => {
        localStorage.clear();
        this.router.navigateByUrl('/login');
      }
    );
  }

  ngOnDestroy(): void {}
}
