import { Component, OnInit } from '@angular/core';

import { ContextMenuService } from './context-menu-service.service';

@Component({
  selector: 'app-menu',
  template: `
  <div class="dropdown ngx-contextmenu" style="width: 300px; height: 300px; background-color: white; opacity: 0.5; padding: 4px;">
    <div (mouseover)="hover($event)" style="width: 292px; text-align: center; background-color: black; color: white; margin: 4px;">
      Hover
    </div>
    <div (mouseover)="hover($event)" style="width: 292px; text-align: center; background-color: black; color: white; margin: 4px;">
      Hover
    </div>
    <div (mouseover)="hover($event)" style="width: 292px; text-align: center; background-color: black; color: white; margin: 4px;">
      Hover
    </div>
    <div (mouseover)="hover($event)" style="width: 292px; text-align: center; background-color: black; color: white; margin: 4px;">
      Hover
    </div>
  </div>
  `,
  styles: []
})
export class MenuComponent implements OnInit {

  constructor(private contextMenuService: ContextMenuService) { }

  ngOnInit() {
  }
  hover($event) {
    console.log('hover')
    this.contextMenuService.showSubMenu($event, MenuComponent);
  }

}
