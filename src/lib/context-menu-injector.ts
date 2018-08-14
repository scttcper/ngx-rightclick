import { Injector, Type, InjectionToken, InjectFlags } from '@angular/core';

import { ActiveContextMenuSub } from './context-menu.service';

export class MenuPackage {
  constructor(public menu: ActiveContextMenuSub, public context: any) {}
}

export class MenuInjector implements Injector {
  _menuContext: MenuPackage;
  constructor(
    private _activeContextMenu: ActiveContextMenuSub,
    private _parentInjector: Injector,
    private context: any,
  ) {
    this._menuContext = new MenuPackage(_activeContextMenu, context);
  }

  get<T>(token: any, notFoundValue?: T, flags?: InjectFlags): T | MenuPackage {
    if (token === MenuPackage) {
      return this._menuContext;
    }
    return this._parentInjector.get<T>(token, notFoundValue, flags);
  }
}
