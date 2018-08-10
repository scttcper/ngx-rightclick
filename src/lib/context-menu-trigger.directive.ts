import {
  Directive,
  HostListener,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { ContextMenuService, ActiveContextMenu } from './context-menu.service';

@Directive({
  selector: '[contextMenuTrigger]',
  exportAs: 'contextMenuTrigger',
})
export class ContextMenuTriggerDirective implements OnDestroy, OnInit {
  @Input() contextMenuTrigger: any;
  @Input() menuContext: any;
  @Input() holdToDisplay = 1000;
  @Output() menuAction = new EventEmitter<any>();
  @Output() menuClose = new EventEmitter<void>();
  menu: ActiveContextMenu;
  visible = false;
  private mouseDownTimeoutId: any;
  private sub: Subscription;

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

  @HostListener('touchstart', ['$event'])
  handleMouseDown($event: any) {
    if (this.holdToDisplay >= 0) {
      $event.stopPropagation();
      $event.clientY = $event.touches[0].clientY;
      $event.clientX = $event.touches[0].clientX;

      this.mouseDownTimeoutId = setTimeout(
        () => this.handleMenu($event),
        this.holdToDisplay,
      );
    }
  }

  @HostListener('touchend')
  handleMouseUp() {
    clearTimeout(this.mouseDownTimeoutId);
  }

  constructor(private contextMenuService: ContextMenuService) {}

  ngOnInit() {
    this.sub = this.menuClose.subscribe(() => this.visible = false);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
