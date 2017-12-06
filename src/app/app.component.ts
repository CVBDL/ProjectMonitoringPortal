import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from "rxjs/Subject";
import { takeUntil } from "rxjs/operators/takeUntil";

import { ConfigService } from './core/config.service';
import { NavItem } from "./core/nav-item.model";

@Component({
  selector: 'pmp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  navItems: NavItem[];

  private ngUnsubscribe: Subject<boolean> = new Subject();

  constructor(private config: ConfigService) {
    this.navItems = [];
  }

  ngOnInit(): void {
    this.generateNavItems();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private generateNavItems() {
    let navItems: NavItem[] = [];

    this.config.getConfig()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        config => {
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

          this.navItems = navItems;
        },
        err => {
          console.error('Error occurred generating nav', err);
        }
      );
  }
}
