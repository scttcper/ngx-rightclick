import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GhButtonModule } from '@ctrl/ngx-github-buttons';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ContextMenuModule } from '../lib/context-menu.module';
import { SimpleComponent } from './simple/simple.component';
import { SimpleMenuComponent } from './simple/simple-menu.component';
import { AnimatedMenuComponent } from './simple/animated-menu.component';
import { MultipleMenuComponent } from './multiple/multiple-menu.component';
import { MultipleComponent } from './multiple/multiple.component';
import { SubmenuComponent } from './submenu/submenu.component';
import { SubmenuMenuComponent } from './submenu/submenu-menu.component';
import { SubSubmenuMenuComponent } from './submenu/subsubmenu-menu.component';

const routes: Routes = [
  { path: 'simple', component: SimpleComponent },
  { path: 'multiple', component: MultipleComponent },
  { path: 'submenu', component: SubmenuComponent },
  { path: '**', redirectTo: 'simple' },
];

@NgModule({
  declarations: [
    AppComponent,
    SimpleComponent,
    SimpleMenuComponent,
    AnimatedMenuComponent,
    MultipleMenuComponent,
    MultipleComponent,
    SubmenuComponent,
    SubmenuMenuComponent,
    SubSubmenuMenuComponent,
  ],
  imports: [
    BrowserModule,
    ContextMenuModule,
    BrowserAnimationsModule,
    GhButtonModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SimpleMenuComponent,
    AnimatedMenuComponent,
    MultipleMenuComponent,
    SubmenuMenuComponent,
    SubSubmenuMenuComponent,
  ],
})
export class AppModule {}
