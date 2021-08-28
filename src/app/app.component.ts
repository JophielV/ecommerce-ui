import { Component, HostBinding, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import {NavBarService} from './core/services/nav-bar.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  toasterConfig = new ToasterConfig({
    preventDuplicates: true,
    limit: 1,
    animation: 'slideDown',
    timeout: {
      error: 5000,
      success: 3000,
      info: 5000,
    },
    showCloseButton: true,
    positionClass: 'toast-top-right',
    mouseoverTimerStop: true
  });

  compactMenu = false;
  isEnlarged = false;
  isForced = false;

  @HostBinding('class') classes = 'widescreen fixed-left';
  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    if (event.target.innerWidth <= 1024) {
      this.classes =  'smallscreen fixed-left-void';
    } else {
      this.classes =  'widescreen fixed-left';
    }
  }

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navBarService: NavBarService,
    private titleService: Title,
    private ts: ToasterService) {

    window.onresize = () => {
      this.getWindowSize();
      ngZone.run(() => {
        this.isEnlarged = this.compactMenu;
      });
    };

    this.activatedRoute.url
      .subscribe(() => {
        this.getWindowSize();
        ngZone.run(() => {
          this.isEnlarged = this.compactMenu;
        });
      });

    // Toggle menu
    navBarService.sideBarCollapsed
      .subscribe(
        collapse => {
          const screen = window.innerWidth <= 1024 ? 'smallscreen' : 'widescreen';
          const sidebar = collapse ? 'fixed-left-void' : 'fixed-left';
          this.classes = `${screen} ${sidebar}`;
          this.isForced = true;
          this.isEnlarged = collapse;
        });

  }

  private getWindowSize(): void {
    if (window.innerWidth <= 991) {
      this.compactMenu =  true;
    } else {
      this.compactMenu = false;
    }
  }

  ngOnInit(): void {

    // Get window size on load to set screen classes
    window.dispatchEvent(new Event('resize'));

    // Document Title Setter
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.parent.data))
      .subscribe((data: any) => {
        const DEFAULT_TITLE = 'Health Metrics Inc.';
        const DOCUMENT_TITLE = data.title ? data.title + ' - ' + DEFAULT_TITLE : DEFAULT_TITLE;
        this.titleService.setTitle(DOCUMENT_TITLE);

        this.checkNetworkConnection();
      });

    // Prompt an alert if there's no internet connection
    window.addEventListener('online',  this.checkNetworkConnection);
    window.addEventListener('offline', this.checkNetworkConnection);

  }

  checkNetworkConnection(): void {
    if (!navigator.onLine) {
      this.ts.pop('error', '', 'Unable to establish connection. Check your internet connection and try again.');
    }
  }

  ngOnDestroy(): void {}
}
