import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <!-- header --->
<app-header></app-header>

  <!--- routes here --->
  <router-outlet></router-outlet>



  <!---footer--->

  <app-footer><!app-footer>
  
  `,
  styles: []
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calendar-app';
}
