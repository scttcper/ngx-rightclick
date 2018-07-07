import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContextMenuTriggerDirective } from './context-menu-trigger.component';
import { MenuComponent } from './menu.component';
import { ContextMenuService } from './context-menu-service.service';

@NgModule({
  declarations: [
    ContextMenuTriggerDirective,
  ],
  exports: [
    ContextMenuTriggerDirective,
  ],
  imports: [
    BrowserModule,
    PortalModule,
    OverlayModule,
  ],
  providers: [],
})
export class ContextMenu { }

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    ContextMenu,
  ],
  bootstrap: [AppComponent],
  entryComponents: [MenuComponent],
})
export class AppModule { }
