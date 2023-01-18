import { Injector } from '@angular/core';

import { ActiveContextMenuSub } from './context-menu.service';

export class MenuPackage {
  constructor(public menu: ActiveContextMenuSub, public context: any) {}
}

export class MenuInjector implements Injector {
  menuContext: MenuPackage;
  constructor(
    private activeContextMenu: ActiveContextMenuSub,
    private parentInjector: Injector,
    private context: any,
  ) {
    this.menuContext = new MenuPackage(activeContextMenu, context);
  }

  get<T>(token: any, notFoundValue?: T, flags?: any): T | MenuPackage {
    if (token === MenuPackage) {
      return this.menuContext;
    }
    return this.parentInjector.get<T>(token, notFoundValue, flags);
  }
}
