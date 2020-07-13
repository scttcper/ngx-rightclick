# ngx-rightclick

[![npm](https://badge.fury.io/js/%40ctrl%2Fngx-rightclick.svg)](https://www.npmjs.org/package/@ctrl/ngx-rightclick)
[![CircleCI](https://circleci.com/gh/scttcper/ngx-rightclick.svg?style=svg)](https://circleci.com/gh/scttcper/ngx-rightclick)

> Context Menu Service for Angular

Demo: https://ngx-rightclick.vercel.app

## Install

if you don't already have `@angular/cdk` that needs to be installed too

```sh
npm install @ctrl/ngx-rightclick
```

## Dependencies

Latest version available for each version of Angular

| ngx-rightclick | Angular |
| -------------- | ------- |
| 3.0.1          | 9.x     |
| current        | >= 10.x |

## Use

Import and Add to NgModule

```ts
import { ContextMenuModule } from '@ctrl/ngx-rightclick';
```

Add context menu directive to element and pass the menu component to be shown. **Important** the menu component must also be added as to entryComponents in your NgModule. [See here](https://github.com/scttcper/ngx-rightclick/blob/2d9d0430e1e762e202d39dbad79da6bdaea1db23/src/app/app.module.ts#L47-L53)

```ts
// show.component.ts
@Component({
  template: `
    <div [contextMenuTrigger]="menu" (menuAction)="handleMenuAction($event)">Right Click</div>
  `,
})
export class ShowComponent {
  // menu component imported and assigned locally
  menu = SimpleMenuComponent;
}
```

```ts
// my-menu.component.ts
import { Component } from '@angular/core';

import { MenuComponent, ContextMenuService, MenuPackage } from '@ctrl/ngx-rightclick';

@Component({
  selector: 'simple-menu',
  // add your menu html
  template: `<a (click)="handleClick()">Download</a>`,
})
export class SimpleMenuComponent extends MenuComponent {
  // this module does not have animations, set lazy false
  lazy = false;

  constructor(public menuPackage: MenuPackage, public contextMenuService: ContextMenuService) {
    super(menuPackage, contextMenuService);
    // grab any required menu context passed via menuContext input
    console.log(menuPackage.context);
  }

  handleClick() {
    // IMPORTANT! tell the menu to close, anything passed in here is given to (menuAction)
    this.contextMenuService.closeAll();
  }
}
```

Last step add css somewhere in your global styles

```css
.cdk-overlay-container {
  position: fixed;
  z-index: 1000;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.ngx-contextmenu.cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
}

// not required but can help with mobile right click
.target {
  user-select: none;
}
```

## [Inputs]

| name                                       | type        | description                                             |
| ------------------------------------------ | ----------- | ------------------------------------------------------- |
| contextMenuTrigger / contextSubmenuTrigger | `component` | the menu or submenu to be shown                         |
| menuContext                                | `any`       | passed to the menu component via MenuPackage            |
| holdToDisplay                              | `number`    | `default: 1000` ms pressing down on mobile to show menu |

## (Ouput)

| name       | type   | description                                         |
| ---------- | ------ | --------------------------------------------------- |
| menuAction | `any`  | whatever is passed to `ContextMenuService.closeAll` |
| menuClose  | `void` | triggered whenever a menu or submenu is closed      |

## Submenu

Use the `contextSubmenuTrigger` directive as you would the contextMenuTrigger inside your menu.

## Other Options

[ngx-contextmenu](https://github.com/isaacplmann/ngx-contextmenu)  
Find the Angular Component of your dreams on [angular.parts](https://angular.parts/)

## License

MIT

---

> GitHub [@scttcper](https://github.com/scttcper) &nbsp;&middot;&nbsp;
> Twitter [@scttcper](https://twitter.com/scttcper)
