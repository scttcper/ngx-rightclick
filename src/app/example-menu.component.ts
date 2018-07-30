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
} from '../lib/context-menu-service.service';
import { MenuComponent } from '../lib/menu.component';

@Component({
  selector: 'app-menu',
  template: `
  <div class="dropdown-menu show ngx-contextmenu" style="position: relative;">
    <button class="dropdown-item" (click)="handleClick()">{{ item.name }}</button>
    <button class="dropdown-item" (click)="handleClick()">Another action</button>
    <div class="dropdown-submenu">
      <button [contextSubmenuTrigger]="submenu" class="dropdown-item dropdown-toggle">Something else</button>
    </div>
    <div class="dropdown-submenu">
      <button [contextSubmenuTrigger]="submenu" class="dropdown-item dropdown-toggle">Something else</button>
    </div>
    <a class="dropdown-item disabled" href="#">Disabled link</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" (click)="handleClick()">Separated link</a>
  </div>
  `,
  styles: [
    `
      .dropdown-submenu {
        position: relative;
      }

      .dropdown-submenu button::after {
        transform: rotate(-90deg);
        position: absolute;
        right: 6px;
        top: 0.8em;
      }
    `,
  ],
  animations: [
    trigger('menu', [
      state('enter', style({ opacity: 1 })),
      state('exit, void', style({ opacity: 0 })),
      transition('* => *', animate(120)),
    ]),
  ],
  host: {
    '[@menu]': '_state',
    '(@menu.done)': '_onAnimationDone($event)',
  },
})
export class ExampleMenuComponent extends MenuComponent {
  submenu = ExampleMenuComponent;
  item: any;

  constructor(
    public menuPackage: MenuPackage,
    public contextMenuService: ContextMenuService,
  ) {
    super(menuPackage, contextMenuService);
    this.item = menuPackage.context;
  }

  hover($event) {
    this.contextMenuService.show($event, MenuComponent, true);
  }

  handleClick() {
    this.contextMenuService.closeAll();
  }
}
