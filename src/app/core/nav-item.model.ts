export class NavItem {
  title: string;

  /**
   * Must be unique within the same nav level.
   * Will use it to generate link.
   *
   * @example
   * Available:
   * 
   * |--managers (Corresponding id is 'managers'.)
   * |  |--lucy (Corresponding id is 'lucy'.)
   * |
   * |--customers (Corresponding id is 'customers'.)
   * |  |--lucy (Corresponding id is 'lucy'.)
   * 
   * Multiple levels could have a nav item with the same id 'lucy'.
   */
  private id: string;

  /**
   * Must be unique globally.
   * 
   * @example
   * 
   * |--managers
   * |  |--lucy (Corresponding link is 'managers/lucy'.)
   * |
   * |--customers
   * |  |--lucy (Corresponding link is 'customers/lucy'.)
   *
   */
  private _link: string;

  /**
   * Sub-navigation items.
   */
  private items: NavItem[];

  get link(): string {
    return this._link;
  }

  constructor(id: string, link: string, title: string = '') {
    this.id = id;
    this._link = link;
    this.title = title;
    this.items = [];
  }

  addSubNavItem(item: NavItem) {
    this.items.push(item);
  }

  getSubNavItems(): NavItem[] {
    return this.items;
  }
}
