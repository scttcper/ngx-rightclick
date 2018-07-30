import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ExampleMenuComponent } from './example-menu.component';
import { ContextMenu } from '../lib/context-menu.module';

@NgModule({
  declarations: [AppComponent, ExampleMenuComponent],
  imports: [BrowserModule, ContextMenu, BrowserAnimationsModule],
  bootstrap: [AppComponent],
  entryComponents: [ExampleMenuComponent],
})
export class AppModule {}
