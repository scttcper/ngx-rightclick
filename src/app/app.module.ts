import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdoButtonModule } from '@ctrl/ngx-github-buttons';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ExampleMenuComponent } from './example-menu.component';
import { ContextMenuModule } from '../lib/context-menu.module';
import { SimpleComponent } from './simple/simple.component';
import { SimpleMenuComponent } from './simple/simple-menu.component';

const routes: Routes = [
  { path: 'simple', component: SimpleComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ExampleMenuComponent,
    SimpleComponent,
    SimpleMenuComponent,
  ],
  imports: [
    BrowserModule,
    ContextMenuModule,
    BrowserAnimationsModule,
    MdoButtonModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
  entryComponents: [ExampleMenuComponent, SimpleMenuComponent],
})
export class AppModule {}
