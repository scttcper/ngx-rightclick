import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { ContextMenuTriggerDirective } from './context-menu-trigger.directive';
import { ContextSubmenuTriggerDirective } from './context-submenu-trigger.directive';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    ContextMenuTriggerDirective,
    ContextSubmenuTriggerDirective,
    MenuComponent,
  ],
  exports: [ContextMenuTriggerDirective, ContextSubmenuTriggerDirective],
  imports: [PortalModule, OverlayModule],
})
export class ContextMenuModule {}
