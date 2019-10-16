import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      .selected {
        background-color: blue;
      }
    `,
  ],
})
export class AppComponent {
  items = [
    { name: 'swag', selected: false },
    { name: 'bonus', selected: false },
  ];
}
