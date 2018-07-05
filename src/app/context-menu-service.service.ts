import {
  Overlay,
  OverlayRef,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ElementRef, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContextMenuService {
  fakeElement: any = {
    getBoundingClientRect: (): ClientRect => ({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    }),
  };
  overlays: OverlayRef[] = [];

  constructor(
    private overlay: Overlay,
    private scrollStrategy: ScrollStrategyOptions,
  ) {}

  show($event: MouseEvent, component) {
    this.fakeElement.getBoundingClientRect = (): ClientRect => ({
      bottom: $event.clientY,
      height: 0,
      left: $event.clientX,
      right: $event.clientX,
      top: $event.clientY,
      width: 0,
    });
    this.closeAll();
    const el = new ElementRef(this.fakeElement);
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(el)
      .withFlexibleDimensions(false)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
        },
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
        },
        {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
        },
      ]);
    const componentPortal = new ComponentPortal(component);
    const overlayRef = this.overlay.create({
      positionStrategy,
      panelClass: 'ngx-contextmenu',
      scrollStrategy: this.scrollStrategy.close(),
    });
    overlayRef.attach(componentPortal);
    this.overlays.push(overlayRef);
  }
  showSubMenu($event: Event, component) {
    const el = new ElementRef($event.target);
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(el)
      .withFlexibleDimensions(false)
      .withPositions([
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'bottom',
        },
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'bottom',
        },
      ]);
    const componentPortal = new ComponentPortal(component);
    const overlayRef = this.overlay.create({
      positionStrategy,
      panelClass: 'ngx-contextmenu',
      scrollStrategy: this.scrollStrategy.close(),
    });
    overlayRef.attach(componentPortal);
    this.overlays.push(overlayRef);
  }
  closeAll() {
    for (const overlay of this.overlays) {
      overlay.detach();
      overlay.dispose();
    }
    this.overlays = [];
  }
}
