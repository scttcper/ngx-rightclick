import { HostListener, OnInit, Input, Directive } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

import { ContextMenuService, ActiveContextMenu } from './context-menu-service.service';
import { MenuComponent } from './menu.component';

@Directive({ selector: '[contextMenuTrigger]' })
export class ContextMenuTriggerDirective implements OnInit {
  @Input() subMenu = false;
  @Input() hoverDelay = 500;
  menu: ActiveContextMenu;
  opentimer: any;
  closetimer: any;
  visible = false;

  @HostListener('longpress', ['$event'])
  @HostListener('contextmenu', ['$event'])
  handleMenu($event: MouseEvent) {
    if (this.subMenu) {
      return;
    }
    $event.preventDefault();
    this.menu = this.contextMenuService.show($event, MenuComponent, this.subMenu);
    this.visible = true;
  }

  @HostListener('click', ['$event', 'true'])
  handleSubMenuClick($event: MouseEvent, skipDelay = false) {
    clearTimeout(this.closetimer);
    clearTimeout(this.opentimer);
    event.preventDefault();
    if (this.visible || !this.subMenu) {
      return;
    }
    this.menu = this.contextMenuService.show($event, MenuComponent, this.subMenu);
    this.visible = true;
  }

  @HostListener('mouseover', ['$event'])
  handleSubMenuEnter($event: MouseEvent) {
    if (!this.subMenu) {
      return;
    }
    if (this.closetimer) {
      clearTimeout(this.closetimer);
    }
    if (this.menu) {
      this.menu.isTriggerHovered.next(true);
    }
    event.preventDefault();
    this.opentimer = setTimeout(() => {
      this.menu = this.contextMenuService.show($event, MenuComponent, this.subMenu);
      this.visible = true;
      this.opentimer = null;
    }, this.hoverDelay);
  }

  @HostListener('mouseout', ['$event'])
  handleSubMenuExit($event: MouseEvent) {
      if (!this.subMenu) {
      return;
    }
    clearTimeout(this.opentimer);
    this.closetimer = setTimeout(() => {
      if (this.menu) {
        this.menu.isTriggerHovered.next(false);
        this.contextMenuService.closeSubMenu(this.menu.id);
        this.menu = undefined;
      }
      this.visible = false;
    }, this.hoverDelay);
  }

  constructor(private contextMenuService: ContextMenuService) {}

  ngOnInit() {
    // this.contextMenuService.show();
  }
}
