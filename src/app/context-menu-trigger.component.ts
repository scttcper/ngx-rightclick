import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import {
  PositionStrategy,
  Overlay,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';

import { MenuComponent } from './menu.component';
import { ContextMenuService } from './context-menu-service.service';

@Component({
  selector: '[contextMenuTrigger]',
  template: ``,
  styles: [],
})
export class ContextMenuTriggerComponent implements OnInit {
  @HostListener('longpress', ['$event'])
  @HostListener('contextmenu', ['$event'])
  handleclick($event: MouseEvent) {
    $event.preventDefault();
    this.contextMenuService.show($event, MenuComponent);
  }

  constructor(
    private contextMenuService: ContextMenuService,
  ) {}

  ngOnInit() {
    // this.contextMenuService.show();
  }
}
