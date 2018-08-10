import { Component } from '@angular/core';
import { SimpleMenuComponent } from './simple-menu.component';
import { AnimatedMenuComponent } from './animated-menu.component';

@Component({
  selector: 'simple-component',
  template: `
  <p class="text-center">Right click to see menu</p>
  <div class="d-flex flex-row justify-content-around bd-highlight">
    <div class="p-4 p-md-5 bd-highlight bg-light border rounded target"
      [contextMenuTrigger]="menu"
      (menuAction)="handleClose($event)">
      Basic Menu
    </div>
    <div class="p-4 p-md-5 bd-highlight bg-light border rounded target"
      [contextMenuTrigger]="animatedMenu"
      (menuAction)="handleClose($event)">
      Animated Menu
    </div>
  </div>
  <p *ngFor="let message of messages">{{ message }}</p>
  `,
})

export class SimpleComponent {
  menu = SimpleMenuComponent;
  animatedMenu = AnimatedMenuComponent;
  messages: string[] = [];

  handleClose(msg: string) {
    this.messages.unshift(msg);
    this.messages.splice(10, this.messages.length);
  }
}
