import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  index = 0;
  tabs = [];
  constructor() { }
  closeTab(tab: string): void {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }

  newTab(tab: string): void {
    this.tabs.push(tab);
    this.index = this.tabs.length - 1;
  }
}
