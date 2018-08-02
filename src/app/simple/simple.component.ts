import { Component, OnInit } from '@angular/core';
import { SimpleMenuComponent } from './simple-menu.component';

@Component({
  selector: 'simple-component',
  template: `
  <div class="d-flex flex-row justify-content-around bd-highlight">
    <div class="p-4 p-md-5 bd-highlight bg-light border rounded" [contextMenuTrigger]="menu">
      Right click to see menu
    </div>
  </div>
  `,
})

export class SimpleComponent implements OnInit {
  menu = SimpleMenuComponent;
  constructor() { }

  ngOnInit() { }
}
