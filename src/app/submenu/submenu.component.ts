import { Component, OnInit } from '@angular/core';
import { SubmenuMenuComponent } from './submenu-menu.component';

@Component({
  selector: 'simple-component',
  template: `
  <div class="d-flex flex-row justify-content-around bd-highlight">
    <div class="p-4 p-md-5 bd-highlight bg-light border rounded" [contextMenuTrigger]="menu" (menuClose)="handleClose($event)">
      Right Click
    </div>
  </div>
  `,
})

export class SubmenuComponent implements OnInit {
  menu = SubmenuMenuComponent;
  constructor() { }

  ngOnInit() { }

  handleClose(e) {
    console.log(e);
  }
}
