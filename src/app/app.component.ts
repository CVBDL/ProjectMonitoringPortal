import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { of } from "rxjs/observable/of";
import { takeUntil } from "rxjs/operators/takeUntil";

import { ConfigService } from './core/config.service';
import { NavItem } from "./core/nav-item.model";
import { switchMap } from 'rxjs/operators/switchMap';

@Component({
  selector: 'pmp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  navItems: NavItem[];
  isNavItemExpanded: boolean;

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private config: ConfigService) {
    this.navItems = [];
    this.isNavItemExpanded = true;
  }

  ngOnInit(): void {
    // init nav items
    this.generateNavItems()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(nav => {
        this.navItems = nav;

      }, err => {
        console.error('Error occurred generating nav', err);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Generate navigation items according to config file.
   * Top NavItem could at most has one level sub NavItem.
   */
  private generateNavItems(): Observable<NavItem[]> {
    return this.config.getConfig()
      .pipe(switchMap(config => {
        let navItems: NavItem[] = [];
        config.program.buckets.forEach(bucket => {
          let navItem = new NavItem();
          navItem.id = bucket.id;
          navItem.title = bucket.title;
          bucket.products.forEach(product => {
            let subNavItem = new NavItem();
            subNavItem.id = product.id;
            subNavItem.title = product.title;
            subNavItem.link = `${bucket.id}/${product.id}`;
            navItem.items.push(subNavItem);
          });
          navItems.push(navItem);
        });

        return of(navItems);
      }));
  }
}
