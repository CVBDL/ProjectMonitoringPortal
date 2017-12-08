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
          if (!bucket.id) return;

          let navItem = new NavItem(bucket.id, bucket.id, bucket.title);
          bucket.products.forEach(product => {
            if (!product.id) return;

            let subNavItemLink = `${bucket.id}/${product.id}`;
            let subNavItem = new NavItem(
              product.id, subNavItemLink, product.title);

            navItem.addSubNavItem(subNavItem);
          });
          navItems.push(navItem);
        });

        return of(navItems);
      }));
  }
}
