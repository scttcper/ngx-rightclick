import { HostListener, OnInit, Input, Directive, OnDestroy } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

import {
  ContextMenuService,
  ActiveContextMenu,
} from './context-menu-service.service';
import { MenuComponent } from './menu.component';

@Directive({ selector: '[contextSubmenuTrigger]' })
export class ContextSubmenuTriggerDirective implements OnInit, OnDestroy {
  @Input() hoverDelay = 500;
  @Input() openDelay = 200;
  menu: ActiveContextMenu;
  opentimer: any;
  closetimer: any;
  visible = false;
  level = 1;

  @HostListener('click', ['$event', 'true'])
  handleSubMenuClick($event: MouseEvent) {
    clearTimeout(this.opentimer);
    clearTimeout(this.closetimer);
    event.preventDefault();
    this.menu = this.contextMenuService.show($event, MenuComponent, true, this.level);
    this.visible = true;
  }

  @HostListener('mouseover', ['$event'])
  handleSubMenuEnter($event: MouseEvent) {
    if (this.menu) {
      this.menu.isTriggerHovered.next(true);
    }
    clearTimeout(this.closetimer);
    this.opentimer = setTimeout(() => {
      this.menu = this.contextMenuService.show($event, MenuComponent, true, this.level);
      this.visible = true;
      this.opentimer = null;
    }, this.openDelay);
  }

  @HostListener('mouseout', ['$event'])
  handleSubMenuExit($event: MouseEvent) {
    clearTimeout(this.opentimer);
    if (this.menu) {
      this.menu.isTriggerHovered.next(false);
    }
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
    this.level = this.contextMenuService.getCurrentLevel();
  }
  ngOnDestroy() {
    clearTimeout(this.opentimer);
    clearTimeout(this.closetimer);
  }
}
