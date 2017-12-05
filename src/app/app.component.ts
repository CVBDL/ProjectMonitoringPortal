import { Component, OnInit } from '@angular/core';

import { ConfigService } from './core/config.service';
import { NavItem } from "./core/nav-item.model";

@Component({
  selector: 'pmp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  navItems: NavItem[];

  constructor(private config: ConfigService) {
    this.navItems = [];
  }

  ngOnInit(): void {
    this.generateNavItems();
  }

  private generateNavItems() {
    let navItems: NavItem[] = [];

    this.config.getConfig().subscribe(
      config => {
        config.buckets.forEach(bucket => {
          let item = new NavItem();
          item.id = bucket.id;
          item.title = bucket.title;

          bucket.products.forEach(product => {
            let subItem = new NavItem();
            subItem.id = product.id;
            subItem.title = product.title;
            subItem.link = `${bucket.id}/${product.id}`;
            item.items.push(subItem);
          });
          navItems.push(item);
        });

        this.navItems = navItems;
      },
      err => {
        console.error('Error occurred generating nav', err);
      }
    );
  }
}
