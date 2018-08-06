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
} from '../../lib/context-menu.service';
import {
  MenuPackage,
} from '../../lib/context-menu-injector';
import { MenuComponent } from '../../lib/menu.component';

@Component({
  selector: 'animated-menu',
  template: `
  <div class="dropdown-menu show" style="position: relative;">
    <button class="dropdown-item" (click)="add()">Add {{ item.name }}</button>
    <button class="dropdown-item" (click)="remove()">Remove {{ item.name }}</button>
  </div>
  `,
  animations: [
    trigger('menu', [
      state('enter', style({ opacity: 1 })),
      state('exit, void', style({ opacity: 0 })),
      transition('* => *', animate(250)),
    ]),
  ],
  host: {
    '[@menu]': '_state',
    '(@menu.done)': '_onAnimationDone($event)',
  },
})
export class MultipleMenuComponent extends MenuComponent {
  item: any;
  constructor(
    public menuPackage: MenuPackage,
    public contextMenuService: ContextMenuService,
  ) {
    super(menuPackage, contextMenuService);
    this.item = menuPackage.context;
  }

  add() {
    this.item.count += 1;
    // tell the menu to close
    this.contextMenuService.closeAll(`added one ${this.item.name}`);
  }
  remove() {
    let msg = `${this.item.name} cannot be removed`;
    if (this.item.count > 0) {
      this.item.count -= 1;
      msg = `removed one ${this.item.name}`;
    }
    // tell the menu to close
    this.contextMenuService.closeAll(msg);
  }
}
