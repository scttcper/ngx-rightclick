import {
  Directive,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  ContextMenuService,
  ActiveContextMenu,
} from './context-menu.service';

@Directive({ selector: '[contextMenuTrigger]' })
export class ContextMenuTriggerDirective {
  @Input() contextMenuTrigger: any;
  @Input() menuContext: any;
  @Output() menuAction = new EventEmitter<any>();
  @Output() menuClose = new EventEmitter<void>();
  menu: ActiveContextMenu;
  visible = false;

  @HostListener('longpress', ['$event'])
  @HostListener('contextmenu', ['$event'])
  handleMenu($event: MouseEvent) {
    $event.preventDefault();
    this.menu = this.contextMenuService.show(
      $event,
      this.contextMenuTrigger,
      this.menuContext,
      this.menuClose,
      this.menuAction,
    );
    this.visible = true;
  }

  constructor(private contextMenuService: ContextMenuService) {}
}
