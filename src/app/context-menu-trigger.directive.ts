import { HostListener, OnInit, Input, Directive } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

import {
  ContextMenuService,
  ActiveContextMenu,
} from './context-menu-service.service';
import { MenuComponent } from './menu.component';

@Directive({ selector: '[contextMenuTrigger]' })
export class ContextMenuTriggerDirective implements OnInit {
  menu: ActiveContextMenu;
  visible = false;

  @HostListener('longpress', ['$event'])
  @HostListener('contextmenu', ['$event'])
  handleMenu($event: MouseEvent) {
    $event.preventDefault();
    this.menu = this.contextMenuService.show($event, MenuComponent);
    this.visible = true;
  }

  constructor(private contextMenuService: ContextMenuService) {}

  ngOnInit() {
    // this.contextMenuService.show();
  }
}
