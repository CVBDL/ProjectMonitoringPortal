import { Component } from '@angular/core';

@Component({
  selector: 'pmp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showInfo() {
    console.log('click');
  }
}
