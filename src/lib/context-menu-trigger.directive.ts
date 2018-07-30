import { Directive, HostListener, Input } from '@angular/core';

import {
  ActiveContextMenu,
  ContextMenuService,
} from './context-menu-service.service';

@Directive({ selector: '[contextMenuTrigger]' })
export class ContextMenuTriggerDirective {
  @Input() contextMenuTrigger: any;
  @Input() menuContext: any;
  menu: ActiveContextMenu;
  visible = false;

  @HostListener('longpress', ['$event'])
  @HostListener('contextmenu', ['$event'])
  handleMenu($event: MouseEvent) {
    $event.preventDefault();
    this.menu = this.contextMenuService.show($event, this.contextMenuTrigger, this.menuContext);
    this.visible = true;
  }

  constructor(private contextMenuService: ContextMenuService) {}
}
