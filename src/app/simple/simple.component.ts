import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'simple-component',
  template: `
  <div class="d-flex flex-row justify-content-around bd-highlight">
    <div class="p-4 p-md-5 bd-highlight bg-info rounded">
      Right click to see menu
    </div>
  </div>
  `,
})

export class SimpleComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
