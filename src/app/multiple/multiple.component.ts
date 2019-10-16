import { Component } from '@angular/core';

import { MultipleMenuComponent } from './multiple-menu.component';

@Component({
  selector: 'simple-component',
  template: `
  <div class="mb-3 d-flex flex-row justify-content-around bd-highlight">
    <div *ngFor="let item of items"
      class="p-3 p-md-4 p-lg-5 mr-1 bd-highlight bg-light border rounded target"
      [contextMenuTrigger]="menu" [menuContext]="item"
      (menuAction)="handleClose($event)">
      {{ item.name }} ({{ item.count }})
    </div>
  </div>
  <div *ngFor="let msg of messages">{{ msg }}</div>
  `,
})
export class MultipleComponent {
  messages: string[] = [];
  menu = MultipleMenuComponent;
  items = [
    { name: 'banana', count: 0 },
    { name: 'apple', count: 0 },
    { name: 'orange', count: 0 },
  ];
  handleClose(msg: string) {
    this.messages.unshift(msg);
    this.messages.splice(10, this.messages.length);
  }
}
