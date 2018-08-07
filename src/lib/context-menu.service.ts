import {
  Overlay,
  OverlayRef,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ElementRef, Injectable, Injector, EventEmitter } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { MenuInjector } from './context-menu-injector';

export interface ActiveContextMenuSub {
  id: number;
  isTriggerHovered: BehaviorSubject<boolean>;
  isMenuHovered: BehaviorSubject<boolean>;
  submenu: boolean;
}
export interface ActiveContextMenu extends ActiveContextMenuSub {
  overlayRef: OverlayRef;
  component: any;
  menuClose: EventEmitter<void>;
  menuAction: EventEmitter<any>;
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

  /**
   *
   * @param $event triggering event
   * @param menuComponent the component to be shown
   * @param submenu is a menu within a menu
   * @param level if submenu, what level
   */
  show(
    $event: MouseEvent,
    menuComponent,
    context: any,
    menuClose: EventEmitter<any>,
    menuAction: EventEmitter<any>,
    submenu = false,
    level?: number,
  ): ActiveContextMenu {
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
      // close other submenus
      this.closeAll(undefined, level);
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
    const menuInjector = new MenuInjector(t, this._injector, context);
    const componentPortal = new ComponentPortal(
      menuComponent,
      undefined,
      menuInjector,
    );
    const overlayRef = this.overlay.create({
      positionStrategy,
      panelClass: 'ngx-contextmenu',
      scrollStrategy: this.scrollStrategy.close(),
    });
    const component = overlayRef.attach<any>(componentPortal);
    const res = { overlayRef, component, ...t, menuClose, menuAction };
    this.menus.push(res);
    return res;
  }
  getCurrentLevel() {
    return this.menus.length;
  }
  closeAll(context?: any, idx = 0) {
    for (let index = idx; index < this.menus.length; index++) {
      const menu = this.menus[index];
      this.destroyMenu(menu, context);
    }
    this.menus.splice(idx, this.menus.length);
  }
  destroyMenu(menu: ActiveContextMenu, context?: any) {
    menu.component.instance._state = 'exit';
    if (menu.component.instance.lazy) {
      menu.component.instance._animationDone
        .pipe(
          filter((event: any) => event.toState === 'exit'),
          take(1),
        )
        .subscribe(() => {
          menu.overlayRef.detach();
          menu.overlayRef.dispose();
        });
    } else {
      menu.overlayRef.detach();
      menu.overlayRef.dispose();
    }
    if (context) {
      menu.menuAction.next(context);
    }
    menu.menuClose.next();
  }
  close(menu: ActiveContextMenu, menuIndex: number, context?: any) {
    this.destroyMenu(menu, context);
    this.menus.splice(menuIndex, 1);
  }
  checkOutsideClick($event: MouseEvent) {
    for (const m of this.menus) {
      const clickedInside = m.component.location.nativeElement.contains(
        $event.target,
      );
      if (clickedInside) {
        $event.preventDefault();
        $event.stopPropagation();
        return;
      }
    }
    this.closeAll();
  }
  closeSubMenu(id: number): void {
    const menuIndex = this.menus.findIndex(n => n.id === id);
    if (menuIndex === -1 || menuIndex !== this.menus.length - 1) {
      return;
    }
    // make sure we can close the current menu
    const menu = this.menus[menuIndex];
    if (menu.isMenuHovered.getValue() || menu.isTriggerHovered.getValue()) {
      return;
    }
    // close all menus up if possible
    for (let index = this.menus.length - 1; index >= 1; index--) {
      const m = this.menus[index];
      if (!m.isMenuHovered.getValue() && !m.isTriggerHovered.getValue()) {
        this.close(m, index);
      } else {
        return;
      }
    }
  }
}
