import { Component } from '@angular/core';

interface SideNavToggle {
  collapsed: boolean;
  screenWidth:number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  isSideNavCollapsed = false;
    screenWidth = 0;
    onToggleSideNav(data: SideNavToggle):void {
      this.screenWidth = data.screenWidth;
      this.isSideNavCollapsed = data.collapsed;
    }

}
