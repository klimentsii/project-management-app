import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <head>

    </head>

    <body>
      <app-header></app-header>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </body>
  `,
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent {
  title: string = 'project-management-app';
}
