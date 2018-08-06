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
    <button class="dropdown-item" (click)="handleClick()">Another action</button>
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

  handleClick() {
    // tell the menu to close
    this.contextMenuService.closeAll('submenu rocket');
  }
}
