import { Component } from '@angular/core';

interface SideNavToggle {
  collapsed: boolean;
  screenWidth:number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

    title = 'Angular_project';
    isSideNavCollapsed = false;
    screenWidth = 0;
    onToggleSideNav(data: SideNavToggle):void {
      this.screenWidth = data.screenWidth;
      this.isSideNavCollapsed = data.collapsed;
    }
}
