import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {filter, map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecommerce-ui';

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {}

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
      });
  }
}
