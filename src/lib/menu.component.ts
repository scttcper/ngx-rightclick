import { Component, HostListener } from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import { ContextMenuService } from './context-menu.service';
import { MenuPackage } from './context-menu-injector';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-menu',
  template: ``,
})
export class MenuComponent {
  /** State of the dialog animation. */
  _state: 'void' | 'enter' | 'exit' = 'enter';
  _animationDone = new Subject<AnimationEvent>();
  /** set lazy to False if you do not have animations */
  lazy = true;
  closetimer: any;

  constructor(
    public menuPackage: MenuPackage,
    public contextMenuService: ContextMenuService,
  ) {}

  @HostListener('mouseover')
  handleMouseover() {
    if (!this.menuPackage.menu.submenu) {
      return;
    }
    this.menuPackage.menu.isMenuHovered.next(true);
    clearTimeout(this.closetimer);
  }

  @HostListener('mouseleave')
  handleMouseleave() {
    if (!this.menuPackage.menu.submenu) {
      return;
    }
    this.menuPackage.menu.isMenuHovered.next(false);
    this.closetimer = setTimeout(() => {
      this.contextMenuService.closeSubMenu(this.menuPackage.menu.id);
    }, 500);
  }

  @HostListener('document:click', ['$event'])
  handleWindowClick($event: MouseEvent) {
    this.contextMenuService.checkOutsideClick($event);
  }

  /** Callback that is invoked when the menu animation completes. */
  @HostListener('@menu.done', ['$event'])
  _onAnimationDone(event: AnimationEvent) {
    this._animationDone.next(event);
  }
}
