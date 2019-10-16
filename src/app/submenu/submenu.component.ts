import { Component } from '@angular/core';

import { SubmenuMenuComponent } from './submenu-menu.component';

@Component({
  selector: 'simple-component',
  template: `
  <div class="d-flex flex-row justify-content-around bd-highlight">
    <div class="p-5 bd-highlight bg-light border rounded target"
      [contextMenuTrigger]="menu" (menuAction)="handleClose($event)">
      Right Click
    </div>
  </div>
  <p *ngFor="let message of messages">{{ message }}</p>
  `,
})
export class SubmenuComponent {

  menu = SubmenuMenuComponent;
  messages: string[] = [];

  handleClose(msg: string) {
    this.messages.unshift(msg);
    this.messages.splice(10, this.messages.length);
  }
}
