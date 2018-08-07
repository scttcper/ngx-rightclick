import { Component } from '@angular/core';
import { SimpleMenuComponent } from './simple-menu.component';
import { AnimatedMenuComponent } from './animated-menu.component';

@Component({
  selector: 'simple-component',
  template: `
  <p class="text-center">Right click to see menu</p>
  <div class="d-flex flex-row justify-content-around bd-highlight">
    <div class="p-4 p-md-5 bd-highlight bg-light border rounded" [contextMenuTrigger]="menu">
      Basic Menu
    </div>
    <div class="p-4 p-md-5 bd-highlight bg-light border rounded" [contextMenuTrigger]="animatedMenu">
      Animated Menu
    </div>
  </div>
  `,
})

export class SimpleComponent {
  menu = SimpleMenuComponent;
  animatedMenu = AnimatedMenuComponent;
}
