import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

import { ContextMenuService } from '../../lib/context-menu.service';
import { MenuPackage } from '../../lib/context-menu-injector';
import { MenuComponent } from '../../lib/menu.component';

@Component({
  selector: 'animated-menu',
  template: `
  <div class="dropdown-menu show" style="position: relative;">
    <button class="dropdown-item" (click)="handleClick('submenu 1')">Submenu 1</button>
    <button class="dropdown-item" (click)="handleClick('submenu 2')">Submenu 2</button>
  </div>
  `,
  animations: [
    trigger('menu', [
      state('enter', style({ opacity: 1 })),
      state('exit, void', style({ opacity: 0 })),
      transition('* => *', animate(100)),
    ]),
  ],
  host: {
    '[@menu]': '_state',
    '(@menu.done)': '_onAnimationDone($event)',
  },
})
export class SubSubmenuMenuComponent extends MenuComponent {
  constructor(
    public menuPackage: MenuPackage,
    public contextMenuService: ContextMenuService,
  ) {
    super(menuPackage, contextMenuService);
  }

  handleClick(action: string) {
    // tell the menu to close
    this.contextMenuService.closeAll(action);
  }
}
