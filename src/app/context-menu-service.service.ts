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

  show($event: MouseEvent, menuComponent, submenu = false, level?: number): ActiveContextMenu {
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
      this.closeAll(level);
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
    const componentPortal = new ComponentPortal(
      menuComponent,
      undefined,
      menuInjector,
    );
    const overlay = this.overlay.create({
      positionStrategy,
      panelClass: 'ngx-contextmenu',
      scrollStrategy: this.scrollStrategy.close(),
      hasBackdrop: true,
    });
    const component = overlay.attach(componentPortal);
    const res = {
      overlay,
      ...t,
    };
    this.menus.push(res);
    console.log('SHOW:', res.id);
    console.log(this.menus[this.menus.length - 1].id)
    return res;
  }
  getCurrentLevel() {
    return this.menus.length;
  }
  closeAll(idx = 0) {
    for (let index = idx; index < this.menus.length; index++) {
      const menu = this.menus[index];
      menu.overlay.detach();
      menu.overlay.dispose();
    }
    this.menus.splice(idx, this.menus.length);
  }
  close(overlay: OverlayRef, menuIndex: number) {
    overlay.detach();
    overlay.dispose();
    this.menus.splice(menuIndex, 1);
  }
  closeSubMenu(id: number): void {
    const menuIndex = this.menus.findIndex(n => n.id === id);
    if (menuIndex === -1 || menuIndex !== this.menus.length - 1) {
      return;
    }
    // make sure we can close the current menu
    const menu = this.menus[menuIndex];
    if (
      menu.isMenuHovered.getValue() ||
      menu.isTriggerHovered.getValue()
    ) {
      return;
    }
    // close all menus up if possible
    for (let index = this.menus.length - 1; index >= 1; index--) {
      const m = this.menus[index];
      if (
        !m.isMenuHovered.getValue() && !m.isTriggerHovered.getValue()
      ) {
        this.close(m.overlay, index);
      } else {
        return;
      }
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
    private _parentInjector: Injector,
  ) {
    this._menuContext = new MenuPackage(_activeContextMenu);
  }

  get(token: any, notFoundValue?: any): any {
    if (token === MenuPackage) {
      return this._menuContext;
    }
    return this._parentInjector.get(token, notFoundValue);
  }
}
