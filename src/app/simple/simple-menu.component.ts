import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

import {
  ContextMenuService,
  MenuPackage,
} from '../../lib/context-menu-service.service';
import { MenuComponent } from '../../lib/menu.component';

@Component({
  selector: 'app-menu',
  template: `
  <div class="dropdown-menu ngx-contextmenu" style="position: relative;">
    <button class="dropdown-item" (click)="handleClick()">Another action</button>
    <a class="dropdown-item disabled" href="#">Disabled link</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" (click)="handleClick()">Separated link</a>
  </div>
  `,
})
export class SimpleMenuComponent extends MenuComponent {
  constructor(
    public menuPackage: MenuPackage,
    public contextMenuService: ContextMenuService,
  ) {
    super(menuPackage, contextMenuService);
  }

  handleClick() {
    this.contextMenuService.closeAll();
  }
}
