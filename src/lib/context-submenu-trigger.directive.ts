import {
  Directive,
  HostListener,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  ActiveContextMenu,
  ContextMenuService,
} from './context-menu.service';

@Directive({ selector: '[contextSubmenuTrigger]' })
export class ContextSubmenuTriggerDirective implements OnDestroy {
  @Input() hoverDelay = 500;
  @Input() openDelay = 200;
  @Input() contextSubmenuTrigger: any;
  @Input() menuContext: any;
  @Output() menuAction = new EventEmitter<any>();
  @Output() menuClose = new EventEmitter<void>();
  menu: ActiveContextMenu;
  opentimer: any;
  closetimer: any;
  visible = false;
  level = 1;

  @HostListener('click', ['$event', 'true'])
  handleSubMenuClick($event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this.opentimer);
    clearTimeout(this.closetimer);
    this.menu = this.contextMenuService.show(
      $event,
      this.contextSubmenuTrigger,
      this.menuContext,
      this.menuClose,
      this.menuAction,
      true,
      this.level,
    );
    this.visible = true;
  }

  @HostListener('mouseover', ['$event'])
  handleSubMenuEnter($event: MouseEvent) {
    if (this.menu) {
      this.menu.isTriggerHovered.next(true);
    }
    clearTimeout(this.closetimer);
    this.opentimer = setTimeout(() => {
      this.menu = this.contextMenuService.show(
        $event,
        this.contextSubmenuTrigger,
        this.menuContext,
        this.menuClose,
        this.menuAction,
        true,
        this.level,
      );
      this.visible = true;
      this.opentimer = null;
    }, this.openDelay);
  }

  /**
   * submenu hides after cursor has exited for a period of time
   */
  @HostListener('mouseout', ['$event'])
  handleSubMenuExit() {
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

  constructor(private contextMenuService: ContextMenuService) {
    // get current level
    setTimeout(() => (this.level = this.contextMenuService.getCurrentLevel()));
  }

  /**
   * if overwritten make sure to clear timeouts
   */
  ngOnDestroy() {
    clearTimeout(this.opentimer);
    clearTimeout(this.closetimer);
  }
}
