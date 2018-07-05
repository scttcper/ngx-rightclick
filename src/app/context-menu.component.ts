import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'context-menu',
  template: `sup`,
  styles: [`
  :host {
    position: fixed;
  }
  `]
})
export class ContextMenuComponent implements OnInit {
  @HostBinding('style.top.px') top: number = 200;
  @HostBinding('style.left.px') left: number = 200;


  ngOnInit() {
  }

}
