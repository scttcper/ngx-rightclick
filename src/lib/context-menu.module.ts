import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { BrowserModule } from '@angular/platform-browser';

import { ContextMenuTriggerDirective } from './context-menu-trigger.directive';
import { ContextSubmenuTriggerDirective } from './context-submenu-trigger.directive';

@NgModule({
  declarations: [ContextMenuTriggerDirective, ContextSubmenuTriggerDirective],
  exports: [ContextMenuTriggerDirective, ContextSubmenuTriggerDirective],
  imports: [BrowserModule, PortalModule, OverlayModule],
})
export class ContextMenuModule {}
