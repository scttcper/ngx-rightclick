import { Component, OnInit, HostBinding, HostListener } from '@angular/core';

import {
  ContextMenuService,
  MenuPackage,
  ActiveContextMenu,
} from './context-menu-service.service';

@Component({
  selector: 'app-menu',
  template: `
  <div class="dropdown-menu show ngx-contextmenu" style="position: relative;">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <div class="dropdown-submenu">
      <a contextMenuTrigger [subMenu]="true" class="dropdown-item dropdown-toggle" href="#">Something else here</a>
    </div>
    <a class="dropdown-item disabled" href="#">Disabled link</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
  `,
  styles: [
    `
      .dropdown-submenu {
        position: relative;
      }

      .dropdown-submenu a::after {
        transform: rotate(-90deg);
        position: absolute;
        right: 6px;
        top: 0.8em;
      }
    `,
  ],
})
export class MenuComponent implements OnInit {
  closetimer: any;
  @HostListener('mouseover')
  handleMouseover() {
    if (!this.menuPackage.menu.submenu) {
      return;
    }
    this.menuPackage.menu.isMenuHovered.next(true);
    clearTimeout(this.closetimer);
  }
  @HostListener('mouseleave')
  handleMouseleave() {
    if (!this.menuPackage.menu.submenu) {
      return;
    }
    this.menuPackage.menu.isMenuHovered.next(false);
    this.closetimer = setTimeout(() => {
      this.contextMenuService.closeSubMenu(this.menuPackage.menu.id);
    }, 500);
  }
  @HostListener('window:click', ['$event'])
  public closeMenu(event: MouseEvent): void {
    console.log('hello')
    this.contextMenuService.closeAll();
  }
  constructor(
    public menuPackage: MenuPackage,
    private contextMenuService: ContextMenuService,
  ) {}

  ngOnInit() {
    console.log(this.menuPackage);
  }
  hover($event) {
    console.log('hover');
    this.contextMenuService.show($event, MenuComponent, true);
  }
}
