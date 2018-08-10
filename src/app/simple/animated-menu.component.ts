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
  <div class="dropdown-menu show" style="position: relative;" [@menu]="_state" (@menu.done)="_onAnimationDone($event)">
    <button class="dropdown-item" (click)="handleClick('Another action')">Another action</button>
    <button class="dropdown-item disabled">Disabled link</button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item" (click)="handleClick('Separated link')">Separated link</button>
  </div>
  `,
  animations: [
    trigger('menu', [
      state(
        'enter',
        style({ opacity: 1, marginTop: '0px', visibility: 'visible' }),
      ),
      state('exit, void', style({ opacity: 0, marginTop: '-15px' })),
      transition('* => *', animate('120ms ease-in')),
    ]),
  ],
})
export class AnimatedMenuComponent extends MenuComponent {
  constructor(
    public menuPackage: MenuPackage,
    public contextMenuService: ContextMenuService,
  ) {
    super(menuPackage, contextMenuService);
  }

  handleClick(msg: string) {
    // tell the menu to close
    this.contextMenuService.closeAll(msg);
  }
}
