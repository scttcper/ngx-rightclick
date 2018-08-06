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
  @Output() menuClose = new EventEmitter<any>();
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
    );
    this.visible = true;
  }

  constructor(private contextMenuService: ContextMenuService) {}
}
