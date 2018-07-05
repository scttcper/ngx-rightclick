import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { ContextMenuTriggerComponent } from './context-menu-trigger.component';
import { ContextMenuComponent } from './context-menu.component';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ContextMenuTriggerComponent,
    ContextMenuComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    PortalModule,
    OverlayModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MenuComponent],
})
export class AppModule { }
