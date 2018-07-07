import {
  Overlay,
  OverlayRef,
  ScrollStrategyOptions,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ElementRef, Injectable, Injector } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

export interface ActiveContextMenuSub {
  id: number;
  isTriggerHovered: BehaviorSubject<boolean>;
  isMenuHovered: BehaviorSubject<boolean>;
  submenu: boolean;
}
export interface ActiveContextMenu extends ActiveContextMenuSub {
  overlay: OverlayRef;
}

@Injectable({ providedIn: 'root' })
export class ContextMenuService {
  menus: ActiveContextMenu[] = [];
  id = 0;

  constructor(
    private overlay: Overlay,
    private scrollStrategy: ScrollStrategyOptions,
    private _injector: Injector,
  ) {}

  show($event: MouseEvent, menuComponent, submenu = false): ActiveContextMenu {
    let target: any;
    if (!submenu) {
      this.closeAll();
      target = {
        getBoundingClientRect: (): ClientRect => ({
          bottom: $event.clientY,
          height: 0,
          left: $event.clientX,
          right: $event.clientX,
          top: $event.clientY,
          width: 0,
        }),
      };
    } else {
      target = $event.target;
    }
    const el = new ElementRef(target);
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(el)
      .withFlexibleDimensions(false);

    if (!submenu) {
      positionStrategy.withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
        },
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
        },
        {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
        },
      ]);
    } else {
      positionStrategy.withPositions([
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'bottom',
        },
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'bottom',
        },
      ]);
    }
    const t: ActiveContextMenuSub = {
      submenu,
      id: this.id++,
      isMenuHovered: new BehaviorSubject(false),
      isTriggerHovered: new BehaviorSubject(false),
    };
    const menuInjector = new MenuInjector(t, this._injector);
    const componentPortal = new ComponentPortal(menuComponent, undefined, menuInjector);
    const overlay = this.overlay.create({
      positionStrategy,
      panelClass: 'ngx-contextmenu',
      scrollStrategy: this.scrollStrategy.close(),
    });
    const component = overlay.attach(componentPortal);
    const res = {
      overlay,
      ...t,
    };
    this.menus.push(res);
    console.log(this.menus);
    return res;
  }
  closeAll() {
    for (let index = 0; index < this.menus.length; index++) {
      const menu = this.menus[index];
      this.close(menu.overlay, index);
    }
  }
  close(overlay: OverlayRef, menuIndex: number) {
    overlay.detach();
    overlay.dispose();
    this.menus.splice(menuIndex, 1);
  }
  closeSubMenu(id: number) {
    const menuIndex = this.menus.findIndex(n => n.id === id);
    const menu = this.menus[menuIndex];
    if (menu && menu.isMenuHovered.getValue() === false && menu.isTriggerHovered.getValue() === false) {
      this.close(menu.overlay, menuIndex);
    }
  }
}

export class MenuPackage {
  constructor(public menu: ActiveContextMenuSub) {}
}

export class MenuInjector implements Injector {
  _menuContext: MenuPackage;
  constructor(
    private _activeContextMenu: ActiveContextMenuSub,
    private _parentInjector: Injector) {
      this._menuContext = new MenuPackage(_activeContextMenu);
    }

  get(token: any, notFoundValue?: any): any {
    if (token === MenuPackage) {
      return this._menuContext;
    }
    return this._parentInjector.get(token, notFoundValue);
  }
}
